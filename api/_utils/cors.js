/**
 * Shared CORS handler for all API endpoints
 *
 * Uses ALLOWED_ORIGINS env var when set, otherwise defaults to '*'.
 */
export function setCorsHeaders(req, res) {
  const allowedOrigins = process.env.ALLOWED_ORIGINS
    ? process.env.ALLOWED_ORIGINS.split(',')
    : ['*'];

  const origin = req.headers.origin;
  const corsOrigin = allowedOrigins.includes('*') || (origin && allowedOrigins.includes(origin))
    ? origin || '*'
    : allowedOrigins[0];

  res.setHeader('Access-Control-Allow-Origin', corsOrigin);
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
}
