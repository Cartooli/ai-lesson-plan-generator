import { describe, it, afterEach } from 'node:test';
import assert from 'node:assert/strict';
import { setCorsHeaders } from '../api/_utils/cors.js';

function mockReq(origin) {
  return { headers: { origin } };
}

function mockRes() {
  const headers = {};
  return {
    _headers: headers,
    setHeader(key, value) { headers[key] = value; }
  };
}

describe('setCorsHeaders', () => {
  const originalEnv = process.env.ALLOWED_ORIGINS;

  afterEach(() => {
    if (originalEnv !== undefined) {
      process.env.ALLOWED_ORIGINS = originalEnv;
    } else {
      delete process.env.ALLOWED_ORIGINS;
    }
  });

  it('defaults to wildcard when ALLOWED_ORIGINS is not set', () => {
    delete process.env.ALLOWED_ORIGINS;
    const res = mockRes();
    setCorsHeaders(mockReq('http://example.com'), res);
    assert.equal(res._headers['Access-Control-Allow-Origin'], 'http://example.com');
  });

  it('allows a matching origin', () => {
    process.env.ALLOWED_ORIGINS = 'http://example.com,http://other.com';
    const res = mockRes();
    setCorsHeaders(mockReq('http://other.com'), res);
    assert.equal(res._headers['Access-Control-Allow-Origin'], 'http://other.com');
  });

  it('rejects a non-matching origin by returning the first allowed origin', () => {
    process.env.ALLOWED_ORIGINS = 'http://example.com';
    const res = mockRes();
    setCorsHeaders(mockReq('http://evil.com'), res);
    assert.equal(res._headers['Access-Control-Allow-Origin'], 'http://example.com');
  });

  it('sets required CORS headers', () => {
    delete process.env.ALLOWED_ORIGINS;
    const res = mockRes();
    setCorsHeaders(mockReq('http://example.com'), res);
    assert.ok(res._headers['Access-Control-Allow-Methods']);
    assert.ok(res._headers['Access-Control-Allow-Headers']);
    assert.ok(res._headers['Access-Control-Allow-Credentials']);
  });
});
