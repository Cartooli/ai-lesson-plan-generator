# Design Review: AI Lesson Plan Generator

**Reviewer:** Claude
**Date:** 2026-03-30
**Scope:** Full codebase review — architecture, security, code quality, UX, and maintainability

---

## Overall Assessment

This is a well-structured, lightweight serverless application with a clean separation between frontend and backend. The codebase is small, easy to understand, and uses minimal dependencies — all good choices for a focused tool. However, there are several areas that warrant attention across security, reliability, code quality, and user experience.

**Rating: Solid foundation with important issues to address.**

---

## Critical Issues

### 1. XSS Vulnerability in Lesson Plan Rendering

**File:** `js/app.js:86`
**Severity:** High

The `displayLessonPlan` function sets `innerHTML` with content derived from the AI response:

```js
lessonPlan.innerHTML = formattedPlan;
```

The `formatLessonPlan` function does basic markdown-to-HTML conversion but does **not** sanitize the AI-generated content. While the AI is unlikely to produce malicious output intentionally, prompt injection or unexpected model output could result in executable HTML/JS being rendered. The server-side `sanitizeInput` only strips `<>` from *inputs*, not from the *AI response*.

**Recommendation:** Use `DOMPurify` or equivalent to sanitize the HTML before inserting it into the DOM, or render using `textContent` with a proper markdown library.

### 2. Hardcoded Model Version

**File:** `api/generate-lesson.js:151`
**Severity:** Medium

The model is hardcoded to `claude-3-5-sonnet-20241022`. This will become outdated and may eventually be deprecated.

**Recommendation:** Move to an environment variable (e.g., `ANTHROPIC_MODEL`) with a sensible default, making upgrades a config change rather than a code change.

### 3. In-Memory Rate Limiting Won't Work in Serverless

**File:** `api/_utils/rate-limit.js`
**Severity:** Medium

The rate limiter uses an in-memory `Map`. In Vercel's serverless environment, each function invocation can run in a different container, so the in-memory store is not shared across instances. This means:

- Rate limits are effectively unenforced under load.
- The `setInterval` cleanup (line 71) may never fire or fires per-container.

The code already has a comment acknowledging this ("For production, consider using Redis/Upstash"), but given that rate limiting is a documented security feature, users may incorrectly rely on it.

**Recommendation:** Either integrate with Vercel KV / Upstash Redis for real rate limiting, or clearly document that rate limiting is best-effort only in serverless deployments.

---

## Moderate Issues

### 4. Fragile Markdown-to-HTML Formatter

**File:** `js/app.js:56-79`

The `formatLessonPlan` function uses regex-based markdown conversion that has several issues:

- **Broken list wrapping:** The regex `(<li>.*<\/li>)` wraps *each individual* `<li>` in its own `<ul>`, rather than grouping consecutive list items. This produces invalid HTML.
- **No support for nested lists or ordered lists** (`<ol>`).
- **Paragraph wrapping is naive:** Wrapping everything in `<p>` tags and then inserting headers/lists inside `<p>` creates invalid nesting.

**Recommendation:** Use an established lightweight markdown library (e.g., `marked` or `snarkdown`) instead of hand-rolled regex conversion.

### 5. Loading State Bug

**File:** `js/app.js:39-51`

In `setLoading(true)`, the code sets `generateBtn.textContent = 'Generating...'` on line 44, which **destroys** the child `<span>` elements that lines 41-42 just modified. Then in `setLoading(false)`, it rebuilds the inner HTML from scratch. This means the `.btn-text` and `.btn-loader` references captured at the top of the file (lines 10-11) become stale after the first generation cycle.

**Recommendation:** Only toggle visibility/text of the existing span elements without replacing the button's inner HTML.

### 6. Inconsistent CORS Configuration

**Files:** `api/generate-lesson.js:38-50` vs `api/get-elevenlabs-referral.js:10` / `api/get-videogen-referral.js:10`

The main endpoint has configurable CORS via `ALLOWED_ORIGINS`, but the referral endpoints hardcode `Access-Control-Allow-Origin: *`. If the application is locked down to specific origins, these endpoints remain wide open.

**Recommendation:** Extract CORS handling into a shared utility (or middleware) so all endpoints use the same origin policy.

### 7. Sanitization Strips Legitimate Characters

**File:** `api/generate-lesson.js:23`

```js
sanitized = sanitized.replace(/[<>]/g, '');
```

This strips `<` and `>` from all inputs. While well-intentioned, a math teacher entering a topic like "Greater than (>) and less than (<) symbols" would lose meaningful content. This is also insufficient as an XSS defense on its own since the AI-generated *output* (not the user input) is what gets rendered as HTML.

**Recommendation:** Use proper output encoding/escaping instead of stripping input characters. If input sanitization is desired, use HTML entity encoding (`&lt;`, `&gt;`) rather than removal.

---

## Minor Issues & Suggestions

### 8. Dead Code in API URL Logic

**File:** `js/app.js:145-147`

```js
const apiUrl = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
  ? '/api/generate-lesson'
  : '/api/generate-lesson';
```

Both branches return the same value. This conditional serves no purpose.

### 9. No Request Timeout on Fetch

**File:** `js/app.js:150-155`

The `fetch` call has no timeout. If the Claude API is slow, the user could be waiting indefinitely with no feedback beyond the loading spinner.

**Recommendation:** Use `AbortController` with a reasonable timeout (e.g., 60 seconds) and show a user-friendly timeout message.

### 10. No `max` Attribute on Duration Input

**File:** `index.html:77`

The `<input type="number">` for duration has `min="1"` but no `max` attribute. The server validates `MAX_DURATION = 480`, but the browser won't prevent entering larger values. This creates a poor UX where the user submits and gets a server error.

**Recommendation:** Add `max="480"` to the HTML input to match server validation.

### 11. Missing `maxlength` on Text Inputs

**File:** `index.html:29, 63`

The topic and subject inputs have no `maxlength` attributes matching the server limits (`MAX_TOPIC_LENGTH = 200`, `MAX_SUBJECT_LENGTH = 100`). Silently truncating input server-side is confusing to users.

### 12. Archive Feature is a No-Op

**File:** `api/generate-lesson.js:165-171`

The archive feature is documented, has environment variables, and is referenced in documentation, but the actual implementation is just a console.log in development mode. This should either be implemented or removed to avoid confusion.

### 13. Error Detection via String Matching

**File:** `api/generate-lesson.js:192-201`

Error categorization relies on checking `error.message` for substrings like `'401'` or `'rate limit'`. The Anthropic SDK throws structured errors with status codes and error types. Using `error.status` or `instanceof` checks would be more reliable.

### 14. No Tests

There are no test files anywhere in the project. For a tool that processes user input, calls an external API, and renders dynamic HTML, at minimum:

- Input validation/sanitization logic should be unit tested.
- The markdown formatter should be tested with edge cases.
- API error handling paths should have integration tests.

---

## Positive Aspects

- **Minimal dependencies** — only `@anthropic-ai/sdk` in production, reducing supply chain risk.
- **Clean separation of concerns** — frontend, API, and utilities are well-organized.
- **Accessibility features** — skip link, ARIA-friendly form labels, focus indicators, print styles.
- **Responsive design** — good mobile breakpoints and clean CSS with custom properties.
- **Comprehensive documentation** — extensive docs covering setup, deployment, architecture, and troubleshooting.
- **Security awareness** — input validation, rate limiting (even if imperfect), CORS configuration, and no client-side API key exposure.

---

## Summary of Recommendations (Priority Order)

| Priority | Issue | Effort |
|----------|-------|--------|
| P0 | Fix XSS risk in lesson plan rendering | Low |
| P1 | Make model version configurable | Low |
| P1 | Fix in-memory rate limiter for serverless | Medium |
| P1 | Replace regex markdown parser with a library | Low |
| P2 | Fix loading state button DOM bug | Low |
| P2 | Unify CORS handling across endpoints | Low |
| P2 | Use entity encoding instead of character stripping | Low |
| P2 | Add fetch timeout with AbortController | Low |
| P2 | Add client-side `max`/`maxlength` to match server limits | Low |
| P3 | Remove dead conditional in API URL | Trivial |
| P3 | Use structured error types from Anthropic SDK | Low |
| P3 | Implement or remove archive feature | Medium |
| P3 | Add tests | Medium |
