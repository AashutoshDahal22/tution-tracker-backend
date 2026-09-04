import rateLimit from "express-rate-limit";

// Brute-force protection only matters in production. In development/test
// (any NODE_ENV other than "production") throttling is skipped entirely
// so normal dev workflows — retries, wrong passwords, hot reloads —
// never get locked out.
const isProduction = process.env.NODE_ENV === "production";

// Overridable without code changes, e.g. AUTH_RATE_LIMIT=50 npm run dev
const authLimit = Number(process.env.AUTH_RATE_LIMIT ?? 20);
const apiLimit = Number(process.env.API_RATE_LIMIT ?? 300);

export const authRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: authLimit,
  skip: () => !isProduction,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: "Too many authentication attempts. Please try again later.",
  },
});

export const apiRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: apiLimit,
  skip: () => !isProduction,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: "Too many requests. Please try again later.",
  },
});
