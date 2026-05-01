import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import {
  buildLessonPlanPrompt,
  getRequiredSections,
  LESSON_PROMPT_VERSION,
} from '../api/_utils/prompts.js';

describe('buildLessonPlanPrompt', () => {
  it('produces a prompt that mentions the topic verbatim', () => {
    const p = buildLessonPlanPrompt({ topic: 'fractions' });
    assert.match(p, /"fractions"/);
  });

  it('includes every required section name in the instructions', () => {
    const p = buildLessonPlanPrompt({ topic: 'x' });
    for (const section of getRequiredSections()) {
      assert.ok(p.includes(section), `missing section: ${section}`);
    }
  });

  it('omits optional context cleanly when fields are absent', () => {
    const p = buildLessonPlanPrompt({ topic: 'x' });
    assert.ok(!/Learning Objectives:\s*\n/.test(p.split('\n').slice(0, 3).join('\n')),
      'objectives block should not appear without input');
  });

  it('includes optional grade / subject / duration when provided', () => {
    const p = buildLessonPlanPrompt({
      topic: 'x', grade: '5th', subject: 'math', duration: 45,
    });
    assert.match(p, /5th grade/);
    assert.match(p, /in math/);
    assert.match(p, /45 minutes/);
  });
});

describe('LESSON_PROMPT_VERSION', () => {
  it('is set to a non-empty string', () => {
    assert.equal(typeof LESSON_PROMPT_VERSION, 'string');
    assert.ok(LESSON_PROMPT_VERSION.length > 0);
  });
});
