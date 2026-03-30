import Anthropic from '@anthropic-ai/sdk';
import { rateLimit } from './_utils/rate-limit.js';
import { setCorsHeaders } from './_utils/cors.js';

// Validation constants
const MAX_TOPIC_LENGTH = 200;
const MAX_SUBJECT_LENGTH = 100;
const MAX_OBJECTIVES_LENGTH = 2000;
const MAX_DURATION = 480; // 8 hours max

const DEFAULT_MODEL = 'claude-sonnet-4-20250514';

/**
 * Sanitize input by encoding HTML entities to preserve content safely.
 * @param {string} input - Input string to sanitize
 * @param {number} maxLength - Maximum allowed length
 * @returns {string} Sanitized input
 */
function sanitizeInput(input, maxLength = null) {
  if (!input) return '';
  let sanitized = String(input).trim();
  if (maxLength) {
    sanitized = sanitized.substring(0, maxLength);
  }
  // Encode HTML entities instead of stripping characters
  sanitized = sanitized
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
  return sanitized;
}

/**
 * AI Lesson Generator API Endpoint
 *
 * Generates comprehensive lesson plans using Anthropic's Claude API
 *
 * @param {Object} req - HTTP request object
 * @param {Object} res - HTTP response object
 */
export default async function handler(req, res) {
  setCorsHeaders(req, res);

  // Handle preflight OPTIONS request
  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }

  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed. Use POST.' });
  }

  try {
    // Rate limiting
    const clientId = req.headers['x-forwarded-for']?.split(',')[0] ||
                     req.headers['x-real-ip'] ||
                     'unknown';

    const rateLimitResult = rateLimit(
      clientId,
      parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || '10', 10),
      parseInt(process.env.RATE_LIMIT_WINDOW_MS || '60000', 10)
    );

    if (!rateLimitResult.allowed) {
      res.setHeader('Retry-After', rateLimitResult.retryAfter);
      return res.status(429).json({
        error: 'Too many requests. Please try again later.',
        retryAfter: rateLimitResult.retryAfter
      });
    }

    // Parse and validate request body before checking API key,
    // so users get actionable validation errors first.
    const { topic, grade, subject, duration, learningObjectives } = req.body;

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

    // Get API key from environment
    const apiKey = process.env.ANTHROPIC_API_KEY;

    if (!apiKey) {
      return res.status(500).json({
        error: 'API key not configured. Please set ANTHROPIC_API_KEY in your environment variables.'
      });
    }

    // Initialize Anthropic client
    const anthropic = new Anthropic({
      apiKey: apiKey,
    });

    // Build the prompt for lesson plan generation using sanitized inputs
    const gradeText = sanitizedGrade ? `for ${sanitizedGrade} grade` : '';
    const subjectText = sanitizedSubject ? `in ${sanitizedSubject}` : '';
    const durationText = sanitizedDuration ? `(${sanitizedDuration} minutes)` : '';
    const objectivesText = sanitizedObjectives ? `\n\nLearning Objectives:\n${sanitizedObjectives}` : '';

    const prompt = `Create a comprehensive lesson plan ${gradeText} ${subjectText} ${durationText} on the topic: "${sanitizedTopic}"${objectivesText}

Please structure the lesson plan with the following sections:
1. Lesson Title
2. Grade Level
3. Subject
4. Duration
5. Learning Objectives (3-5 specific, measurable objectives)
6. Materials Needed
7. Lesson Introduction (hook/engagement activity)
8. Main Content (detailed step-by-step activities)
9. Guided Practice
10. Independent Practice
11. Assessment/Evaluation
12. Closure/Summary
13. Extension Activities (optional)
14. Differentiation Strategies (for diverse learners)
15. Homework/Follow-up (if applicable)

Make the lesson plan practical, engaging, and aligned with educational best practices. Use clear, actionable language.`;

    // Call Anthropic API with configurable model
    const model = process.env.ANTHROPIC_MODEL || DEFAULT_MODEL;
    const message = await anthropic.messages.create({
      model,
      max_tokens: 4096,
      messages: [
        {
          role: 'user',
          content: prompt
        }
      ]
    });

    // Extract the lesson plan from the response
    const lessonPlan = message.content[0].text;

    // Return successful response
    return res.status(200).json({
      success: true,
      lessonPlan: lessonPlan,
      topic: sanitizedTopic,
      grade: sanitizedGrade || 'Not specified',
      subject: sanitizedSubject || 'Not specified',
      duration: sanitizedDuration || 'Not specified',
      generatedAt: new Date().toISOString()
    });

  } catch (error) {
    // Log error for debugging (but don't expose sensitive info)
    console.error('Error generating lesson plan:', error.message);

    let errorMessage = 'Failed to generate lesson plan.';
    let statusCode = 500;

    // Use structured error properties from the Anthropic SDK
    if (error.status === 401) {
      errorMessage = 'Invalid API key. Please check your ANTHROPIC_API_KEY.';
      statusCode = 401;
    } else if (error.status === 429) {
      errorMessage = 'Rate limit exceeded. Please try again in a few moments.';
      statusCode = 429;
    } else if (error.status === 402 || error.status === 403) {
      errorMessage = 'API quota exceeded or access denied. Please check your Anthropic account.';
      statusCode = error.status;
    } else if (error.status >= 400 && error.status < 500) {
      errorMessage = 'Invalid request to AI service. Please try again.';
      statusCode = error.status;
    }

    return res.status(statusCode).json({
      error: errorMessage,
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
}
