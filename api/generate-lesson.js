import { rateLimit } from './_utils/rate-limit.js';
import { setCorsHeaders } from './_utils/cors.js';
import { generateText, classifyError } from './_utils/anthropic-client.js';
import { buildLessonPlanPrompt, LESSON_PROMPT_VERSION } from './_utils/prompts.js';
import { getRateLimitConfig } from './_utils/config.js';

// Validation constants
const MAX_TOPIC_LENGTH = 200;
const MAX_SUBJECT_LENGTH = 100;
const MAX_OBJECTIVES_LENGTH = 2000;
const MAX_DURATION = 480; // 8 hours max

/**
 * Sanitize input by encoding HTML entities to preserve content safely.
 */
function sanitizeInput(input, maxLength = null) {
  if (!input) return '';
  let sanitized = String(input).trim();
  if (maxLength) {
    sanitized = sanitized.substring(0, maxLength);
  }
  return sanitized
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

export default async function handler(req, res) {
  setCorsHeaders(req, res);

  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed. Use POST.' });
  }

  try {
    // Rate limiting
    const clientId = req.headers['x-forwarded-for']?.split(',')[0] ||
                     req.headers['x-real-ip'] ||
                     'unknown';

    const { maxRequests, windowMs } = getRateLimitConfig();
    const rateLimitResult = rateLimit(clientId, maxRequests, windowMs);

    if (!rateLimitResult.allowed) {
      res.setHeader('Retry-After', rateLimitResult.retryAfter);
      return res.status(429).json({
        error: 'Too many requests. Please try again later.',
        retryAfter: rateLimitResult.retryAfter
      });
    }

    // Parse and validate request body before checking API key,
    // so users get actionable validation errors first.
    const { topic, grade, subject, duration, learningObjectives } = req.body || {};

    const sanitizedTopic = sanitizeInput(topic, MAX_TOPIC_LENGTH);
    if (!sanitizedTopic) {
      return res.status(400).json({ error: 'Topic is required and cannot be empty' });
    }

    const sanitizedGrade = sanitizeInput(grade);
    const sanitizedSubject = sanitizeInput(subject, MAX_SUBJECT_LENGTH);
    const sanitizedObjectives = sanitizeInput(learningObjectives, MAX_OBJECTIVES_LENGTH);

    let sanitizedDuration = null;
    if (duration) {
      const durationNum = parseInt(duration, 10);
      if (isNaN(durationNum) || durationNum < 1 || durationNum > MAX_DURATION) {
        return res.status(400).json({
          error: `Duration must be between 1 and ${MAX_DURATION} minutes`
        });
      }
      sanitizedDuration = durationNum;
    }

    const prompt = buildLessonPlanPrompt({
      topic: sanitizedTopic,
      grade: sanitizedGrade,
      subject: sanitizedSubject,
      duration: sanitizedDuration,
      learningObjectives: sanitizedObjectives,
    });

    const start = Date.now();
    const { text: lessonPlan, model, usage, stopReason } = await generateText(prompt);
    const latencyMs = Date.now() - start;

    if (process.env.NODE_ENV === 'development') {
      console.log(JSON.stringify({
        event: 'lesson_generated',
        model,
        promptVersion: LESSON_PROMPT_VERSION,
        latencyMs,
        topicLength: sanitizedTopic.length,
        outputLength: lessonPlan.length,
        stopReason,
        inputTokens: usage?.input_tokens ?? null,
        outputTokens: usage?.output_tokens ?? null,
      }));
    }

    return res.status(200).json({
      success: true,
      lessonPlan,
      topic: sanitizedTopic,
      grade: sanitizedGrade || 'Not specified',
      subject: sanitizedSubject || 'Not specified',
      duration: sanitizedDuration || 'Not specified',
      generatedAt: new Date().toISOString()
    });

  } catch (error) {
    console.error('Error generating lesson plan:', error.message);
    const { status, message } = classifyError(error);
    return res.status(status).json({
      error: message,
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
}
