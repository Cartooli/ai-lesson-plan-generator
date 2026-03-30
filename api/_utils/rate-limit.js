/**
 * Simple in-memory rate limiter
 *
 * NOTE: In serverless environments (Vercel, AWS Lambda, etc.), each function
 * invocation may run in a separate container with its own memory. This means
 * the in-memory store is NOT shared across instances and rate limiting is
 * best-effort only. For strict enforcement, use a shared store like
 * Redis / Upstash / Vercel KV.
 */

const rateLimitStore = new Map();

/**
 * Simple rate limiter
 * @param {string} identifier - Unique identifier (IP, user ID, etc.)
 * @param {number} maxRequests - Maximum requests allowed
 * @param {number} windowMs - Time window in milliseconds
 * @returns {Object} { allowed: boolean, remaining: number, resetTime: number }
 */
export function rateLimit(identifier, maxRequests = 10, windowMs = 60000) {
  const now = Date.now();
  const key = identifier;

  if (!rateLimitStore.has(key)) {
    rateLimitStore.set(key, {
      count: 1,
      resetTime: now + windowMs
    });
    return { allowed: true, remaining: maxRequests - 1, resetTime: now + windowMs };
  }

  const record = rateLimitStore.get(key);

  // Reset if window expired
  if (now > record.resetTime) {
    record.count = 1;
    record.resetTime = now + windowMs;
    rateLimitStore.set(key, record);
    return { allowed: true, remaining: maxRequests - 1, resetTime: record.resetTime };
  }

  // Check if limit exceeded
  if (record.count >= maxRequests) {
    return {
      allowed: false,
      remaining: 0,
      resetTime: record.resetTime,
      retryAfter: Math.ceil((record.resetTime - now) / 1000)
    };
  }

  // Increment count
  record.count++;
  rateLimitStore.set(key, record);

  return {
    allowed: true,
    remaining: maxRequests - record.count,
    resetTime: record.resetTime
  };
}

/**
 * Clean up expired entries (run periodically)
 */
export function cleanupRateLimitStore() {
  const now = Date.now();
  for (const [key, record] of rateLimitStore.entries()) {
    if (now > record.resetTime) {
      rateLimitStore.delete(key);
    }
  }
}

// Cleanup every 5 minutes (only runs within a long-lived container).
// unref() allows the process to exit naturally if this is the only timer.
if (typeof setInterval !== 'undefined') {
  const cleanupTimer = setInterval(cleanupRateLimitStore, 5 * 60 * 1000);
  if (cleanupTimer.unref) cleanupTimer.unref();
}
