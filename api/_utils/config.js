/**
 * Central runtime configuration for the lesson generator.
 * All model and tuning knobs live here so they can be changed via env vars
 * without touching business logic.
 */

const DEFAULT_MODEL = 'claude-sonnet-4-20250514';
const DEFAULT_MAX_TOKENS = 4096;

function parsePositiveInt(value, fallback) {
  const n = parseInt(value, 10);
  return Number.isFinite(n) && n > 0 ? n : fallback;
}

export function getModelConfig() {
  return {
    model: process.env.ANTHROPIC_MODEL || DEFAULT_MODEL,
    maxTokens: parsePositiveInt(process.env.ANTHROPIC_MAX_TOKENS, DEFAULT_MAX_TOKENS),
  };
}

export function getRateLimitConfig() {
  return {
    maxRequests: parsePositiveInt(process.env.RATE_LIMIT_MAX_REQUESTS, 10),
    windowMs: parsePositiveInt(process.env.RATE_LIMIT_WINDOW_MS, 60000),
  };
}
