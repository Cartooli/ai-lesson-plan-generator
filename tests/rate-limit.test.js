import { describe, it, beforeEach } from 'node:test';
import assert from 'node:assert/strict';
import { rateLimit, cleanupRateLimitStore } from '../api/_utils/rate-limit.js';

describe('rateLimit', () => {
  beforeEach(() => {
    // Clean up all entries so each test starts fresh
    cleanupRateLimitStore();
  });

  it('allows the first request', () => {
    const result = rateLimit('test-user-1', 5, 60000);
    assert.equal(result.allowed, true);
    assert.equal(result.remaining, 4);
  });

  it('decrements remaining count on subsequent requests', () => {
    rateLimit('test-user-2', 5, 60000);
    const result = rateLimit('test-user-2', 5, 60000);
    assert.equal(result.allowed, true);
    assert.equal(result.remaining, 3);
  });

  it('blocks requests after limit is exceeded', () => {
    for (let i = 0; i < 3; i++) {
      rateLimit('test-user-3', 3, 60000);
    }
    const result = rateLimit('test-user-3', 3, 60000);
    assert.equal(result.allowed, false);
    assert.equal(result.remaining, 0);
    assert.ok(result.retryAfter > 0);
  });

  it('tracks different identifiers independently', () => {
    for (let i = 0; i < 3; i++) {
      rateLimit('user-a', 3, 60000);
    }
    const blockedResult = rateLimit('user-a', 3, 60000);
    assert.equal(blockedResult.allowed, false);

    const freshResult = rateLimit('user-b', 3, 60000);
    assert.equal(freshResult.allowed, true);
  });

  it('resets after the time window expires', async () => {
    const windowMs = 50; // very short window for testing
    for (let i = 0; i < 3; i++) {
      rateLimit('test-user-4', 3, windowMs);
    }
    const blocked = rateLimit('test-user-4', 3, windowMs);
    assert.equal(blocked.allowed, false);

    // Wait for window to expire
    await new Promise(resolve => setTimeout(resolve, windowMs + 10));

    const afterReset = rateLimit('test-user-4', 3, windowMs);
    assert.equal(afterReset.allowed, true);
    assert.equal(afterReset.remaining, 2);
  });
});
