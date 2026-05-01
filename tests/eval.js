/**
 * Live eval harness for the lesson generator.
 *
 * Runs a fixture set of inputs through the real Anthropic API and asserts
 * structural quality of each output: required sections present, output length
 * sane, latency within budget. This catches regressions when we swap models
 * or change the prompt.
 *
 * Skipped by default — only runs when ANTHROPIC_API_KEY is set AND the env
 * var RUN_EVALS is truthy. CI can opt in by setting both.
 *
 * Run with: RUN_EVALS=1 node tests/eval.js
 */

import { generateText } from '../api/_utils/anthropic-client.js';
import {
  buildLessonPlanPrompt,
  getRequiredSections,
  LESSON_PROMPT_VERSION,
} from '../api/_utils/prompts.js';
import { getModelConfig } from '../api/_utils/config.js';

if (!process.env.RUN_EVALS || !process.env.ANTHROPIC_API_KEY) {
  console.log('[eval] skipped — set RUN_EVALS=1 and ANTHROPIC_API_KEY to run');
  process.exit(0);
}

const FIXTURES = [
  { topic: 'Photosynthesis', grade: '7th', subject: 'science', duration: 50 },
  { topic: 'The Pythagorean theorem', grade: '8th', subject: 'math', duration: 45 },
  { topic: 'Persuasive writing', grade: '10th', subject: 'english', duration: 60 },
];

const REQUIRED = getRequiredSections();
const MIN_OUTPUT_CHARS = 500;
const MAX_LATENCY_MS = 60_000;

let failures = 0;

function check(name, cond, detail) {
  if (cond) {
    console.log(`  ✓ ${name}`);
  } else {
    console.log(`  ✗ ${name}${detail ? ` — ${detail}` : ''}`);
    failures += 1;
  }
}

console.log(`[eval] model=${getModelConfig().model} prompt=${LESSON_PROMPT_VERSION}`);

for (const fx of FIXTURES) {
  console.log(`\n[fixture] ${fx.topic}`);
  const start = Date.now();
  let result;
  try {
    result = await generateText(buildLessonPlanPrompt(fx));
  } catch (err) {
    failures += 1;
    console.log(`  ✗ generateText threw — ${err.message}`);
    continue;
  }
  const latencyMs = Date.now() - start;

  check('latency under budget', latencyMs <= MAX_LATENCY_MS, `${latencyMs}ms`);
  check('output non-trivial length', result.text.length >= MIN_OUTPUT_CHARS, `${result.text.length} chars`);

  // Loosely check that >= 80% of required sections appear in the text.
  // Models may rephrase headers, so we accept a partial-match threshold.
  const found = REQUIRED.filter((s) => result.text.toLowerCase().includes(s.toLowerCase().split('/')[0]));
  const ratio = found.length / REQUIRED.length;
  check(`>=80% of required sections present (${found.length}/${REQUIRED.length})`, ratio >= 0.8);

  check('stop reason is end_turn', result.stopReason === 'end_turn', `got ${result.stopReason}`);

  if (result.usage) {
    console.log(`  ℹ tokens: in=${result.usage.input_tokens} out=${result.usage.output_tokens} latency=${latencyMs}ms`);
  }
}

console.log(`\n[eval] ${failures === 0 ? 'PASSED' : `FAILED with ${failures} issue(s)`}`);
process.exit(failures === 0 ? 0 : 1);
