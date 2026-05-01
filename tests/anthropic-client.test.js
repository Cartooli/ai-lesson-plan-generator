import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { extractText, classifyError } from '../api/_utils/anthropic-client.js';

describe('extractText', () => {
  it('returns concatenated text from multiple text blocks', () => {
    const msg = { content: [
      { type: 'text', text: 'first' },
      { type: 'text', text: 'second' },
    ] };
    assert.equal(extractText(msg), 'first\nsecond');
  });

  it('skips non-text blocks (e.g. tool_use)', () => {
    const msg = { content: [
      { type: 'tool_use', id: 'x', name: 'foo', input: {} },
      { type: 'text', text: 'only text' },
    ] };
    assert.equal(extractText(msg), 'only text');
  });

  it('returns empty string when no text blocks present', () => {
    assert.equal(extractText({ content: [{ type: 'image' }] }), '');
  });

  it('returns empty string for malformed responses', () => {
    assert.equal(extractText(null), '');
    assert.equal(extractText({}), '');
    assert.equal(extractText({ content: 'not-an-array' }), '');
  });

  it('trims surrounding whitespace', () => {
    assert.equal(extractText({ content: [{ type: 'text', text: '  hi  ' }] }), 'hi');
  });
});

describe('classifyError', () => {
  it('maps SDK 401 to invalid-key message', () => {
    const r = classifyError({ status: 401 });
    assert.equal(r.status, 401);
    assert.match(r.message, /API key/i);
  });

  it('maps SDK 429 to rate-limit message', () => {
    assert.equal(classifyError({ status: 429 }).status, 429);
  });

  it('collapses 5xx to 502 upstream-error', () => {
    assert.equal(classifyError({ status: 503 }).status, 502);
    assert.equal(classifyError({ status: 500 }).status, 502);
  });

  it('passes through other 4xx statuses', () => {
    assert.equal(classifyError({ status: 422 }).status, 422);
  });

  it('handles MISSING_API_KEY code', () => {
    const r = classifyError({ code: 'MISSING_API_KEY' });
    assert.equal(r.status, 500);
    assert.match(r.message, /ANTHROPIC_API_KEY/);
  });

  it('handles EMPTY_RESPONSE code', () => {
    assert.equal(classifyError({ code: 'EMPTY_RESPONSE' }).status, 502);
  });

  it('handles unknown / null errors', () => {
    assert.equal(classifyError(null).status, 500);
    assert.equal(classifyError({}).status, 500);
  });
});
