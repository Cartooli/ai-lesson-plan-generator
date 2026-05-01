import Anthropic from '@anthropic-ai/sdk';
import { getModelConfig } from './config.js';

const DEFAULT_TEMPERATURE = 0.7;
const DEFAULT_MAX_RETRIES = 2;

let cachedClient = null;

function getClient() {
  if (!cachedClient) {
    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
      const err = new Error('ANTHROPIC_API_KEY is not configured');
      err.code = 'MISSING_API_KEY';
      throw err;
    }
    cachedClient = new Anthropic({
      apiKey,
      maxRetries: DEFAULT_MAX_RETRIES,
    });
  }
  return cachedClient;
}

/**
 * Defensively extract text from a Claude messages response.
 * Returns the concatenated text of all `text` blocks, or '' if none.
 */
export function extractText(message) {
  if (!message || !Array.isArray(message.content)) return '';
  return message.content
    .filter((block) => block && block.type === 'text' && typeof block.text === 'string')
    .map((block) => block.text)
    .join('\n')
    .trim();
}

/**
 * Single entry point for all model calls. Centralizing here means swapping
 * model, provider, or response shape touches one file instead of every handler.
 */
export async function generateText(prompt, overrides = {}) {
  const { model, maxTokens, temperature = DEFAULT_TEMPERATURE } = { ...getModelConfig(), ...overrides };
  const client = getClient();

  const message = await client.messages.create({
    model,
    max_tokens: maxTokens,
    temperature,
    messages: [{ role: 'user', content: prompt }],
  });

  const text = extractText(message);
  if (!text) {
    const err = new Error('Model returned no text content');
    err.code = 'EMPTY_RESPONSE';
    throw err;
  }

  return {
    text,
    model,
    stopReason: message.stop_reason,
    usage: message.usage || null,
  };
}

/**
 * Map an SDK or runtime error to an HTTP status + safe public message.
 * Uses the SDK's status field rather than fragile string matching.
 */
export function classifyError(error) {
  if (!error) return { status: 500, message: 'Unknown error' };

  if (error.code === 'MISSING_API_KEY') {
    return { status: 500, message: 'API key not configured. Please set ANTHROPIC_API_KEY in your environment variables.' };
  }
  if (error.code === 'EMPTY_RESPONSE') {
    return { status: 502, message: 'Model returned an empty response. Please try again.' };
  }

  const status = typeof error.status === 'number' ? error.status : null;
  if (status === 401) return { status: 401, message: 'Invalid API key. Please check your ANTHROPIC_API_KEY.' };
  if (status === 429) return { status: 429, message: 'Rate limit exceeded. Please try again in a few moments.' };
  if (status === 402) return { status: 402, message: 'API quota exceeded. Please check your Anthropic account.' };
  if (status && status >= 500 && status < 600) return { status: 502, message: 'Upstream model service error. Please try again.' };
  if (status && status >= 400 && status < 500) return { status, message: 'Request rejected by model service.' };

  return { status: 500, message: 'Failed to generate lesson plan.' };
}
