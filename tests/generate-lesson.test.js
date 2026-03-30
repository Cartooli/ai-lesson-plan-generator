import { describe, it } from 'node:test';
import assert from 'node:assert/strict';

// Import the module to test sanitizeInput — since it's not exported,
// we test it indirectly through the handler by mocking the request/response.

/**
 * Helper to create a mock request object
 */
function mockReq(overrides = {}) {
  return {
    method: 'POST',
    headers: {
      origin: 'http://localhost',
      'x-forwarded-for': '127.0.0.1',
      ...overrides.headers
    },
    body: {
      topic: 'Photosynthesis',
      ...overrides.body
    },
    ...overrides
  };
}

/**
 * Helper to create a mock response object that captures the response
 */
function mockRes() {
  const res = {
    _status: null,
    _json: null,
    _headers: {},
    _ended: false,
    setHeader(key, value) { res._headers[key] = value; return res; },
    status(code) { res._status = code; return res; },
    json(data) { res._json = data; return res; },
    end() { res._ended = true; return res; },
  };
  return res;
}

describe('generate-lesson handler', () => {
  it('rejects non-POST requests', async () => {
    const { default: handler } = await import('../api/generate-lesson.js');
    const res = mockRes();
    await handler(mockReq({ method: 'GET' }), res);
    assert.equal(res._status, 405);
    assert.ok(res._json.error.includes('Method not allowed'));
  });

  it('rejects requests with empty topic', async () => {
    const { default: handler } = await import('../api/generate-lesson.js');
    const res = mockRes();
    await handler(mockReq({ body: { topic: '' } }), res);
    assert.equal(res._status, 400);
    assert.ok(res._json.error.includes('Topic is required'));
  });

  it('rejects requests with missing topic', async () => {
    const { default: handler } = await import('../api/generate-lesson.js');
    const res = mockRes();
    await handler(mockReq({ body: {} }), res);
    assert.equal(res._status, 400);
  });

  it('rejects invalid duration (too large)', async () => {
    const { default: handler } = await import('../api/generate-lesson.js');
    const res = mockRes();
    await handler(mockReq({ body: { topic: 'Math', duration: '9999' } }), res);
    assert.equal(res._status, 400);
    assert.ok(res._json.error.includes('Duration'));
  });

  it('rejects invalid duration (zero)', async () => {
    const { default: handler } = await import('../api/generate-lesson.js');
    const res = mockRes();
    await handler(mockReq({ body: { topic: 'Math', duration: '0' } }), res);
    assert.equal(res._status, 400);
  });

  it('rejects invalid duration (negative)', async () => {
    const { default: handler } = await import('../api/generate-lesson.js');
    const res = mockRes();
    await handler(mockReq({ body: { topic: 'Math', duration: '-5' } }), res);
    assert.equal(res._status, 400);
  });

  it('returns 204 for OPTIONS preflight', async () => {
    const { default: handler } = await import('../api/generate-lesson.js');
    const res = mockRes();
    await handler(mockReq({ method: 'OPTIONS' }), res);
    assert.equal(res._status, 204);
    assert.equal(res._ended, true);
  });

  it('sets CORS headers', async () => {
    const { default: handler } = await import('../api/generate-lesson.js');
    const res = mockRes();
    await handler(mockReq({ method: 'OPTIONS' }), res);
    assert.ok(res._headers['Access-Control-Allow-Origin']);
    assert.ok(res._headers['Access-Control-Allow-Methods']);
  });

  it('returns 500 when API key is missing', async () => {
    // Temporarily clear the API key
    const original = process.env.ANTHROPIC_API_KEY;
    delete process.env.ANTHROPIC_API_KEY;

    try {
      const { default: handler } = await import('../api/generate-lesson.js');
      const res = mockRes();
      await handler(mockReq(), res);
      assert.equal(res._status, 500);
      assert.ok(res._json.error.includes('API key not configured'));
    } finally {
      if (original !== undefined) {
        process.env.ANTHROPIC_API_KEY = original;
      }
    }
  });
});
