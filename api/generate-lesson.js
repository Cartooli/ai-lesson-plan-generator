import Anthropic from '@anthropic-ai/sdk';

/**
 * AI Lesson Generator API Endpoint
 * 
 * Generates comprehensive lesson plans using Anthropic's Claude API
 * 
 * @param {Object} req - HTTP request object
 * @param {Object} res - HTTP response object
 */
export default async function handler(req, res) {
  // Handle CORS for browser requests
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight OPTIONS request
  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }

  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed. Use POST.' });
  }

  try {
    // Get API key from environment
    const apiKey = process.env.ANTHROPIC_API_KEY;
    
    if (!apiKey) {
      return res.status(500).json({ 
        error: 'API key not configured. Please set ANTHROPIC_API_KEY in your environment variables.' 
      });
    }

    // Parse request body
    const { topic, grade, subject, duration, learningObjectives } = req.body;
    
    // Validate required fields
    if (!topic || !topic.trim()) {
      return res.status(400).json({ error: 'Topic is required' });
    }

    // Initialize Anthropic client
    const anthropic = new Anthropic({
      apiKey: apiKey,
    });

    // Build the prompt for lesson plan generation
    const gradeText = grade ? `for ${grade} grade` : '';
    const subjectText = subject ? `in ${subject}` : '';
    const durationText = duration ? `(${duration} minutes)` : '';
    const objectivesText = learningObjectives ? `\n\nLearning Objectives:\n${learningObjectives}` : '';

    const prompt = `Create a comprehensive lesson plan ${gradeText} ${subjectText} ${durationText} on the topic: "${topic}"${objectivesText}

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

    // Call Anthropic API
    const message = await anthropic.messages.create({
      model: 'claude-3-5-sonnet-20241022',
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

    // Optional: Save to archive if enabled
    if (process.env.ENABLE_ARCHIVE === 'true') {
      // Archive functionality would go here
      // For now, we'll just log (in production, save to file system or database)
      console.log('Archive enabled - lesson would be saved here');
    }

    // Return successful response
    return res.status(200).json({
      success: true,
      lessonPlan: lessonPlan,
      topic: topic,
      grade: grade || 'Not specified',
      subject: subject || 'Not specified',
      duration: duration || 'Not specified',
      generatedAt: new Date().toISOString()
    });

  } catch (error) {
    // Log error for debugging (but don't expose sensitive info)
    console.error('Error generating lesson plan:', error.message);

    // Return user-friendly error message
    let errorMessage = 'Failed to generate lesson plan.';
    let statusCode = 500;

    if (error.message.includes('401') || error.message.includes('authentication')) {
      errorMessage = 'Invalid API key. Please check your ANTHROPIC_API_KEY.';
      statusCode = 401;
    } else if (error.message.includes('429') || error.message.includes('rate limit')) {
      errorMessage = 'Rate limit exceeded. Please try again in a few moments.';
      statusCode = 429;
    } else if (error.message.includes('quota') || error.message.includes('billing')) {
      errorMessage = 'API quota exceeded. Please check your Anthropic account.';
      statusCode = 402;
    }

    return res.status(statusCode).json({ 
      error: errorMessage,
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
}
