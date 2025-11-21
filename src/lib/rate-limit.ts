/**
 * Rate Limiting Utilities
 * Uses in-memory rate limiting for development
 * For production, integrate with @upstash/ratelimit and Redis
 */

interface RateLimitStore {
  count: number;
  resetTime: number;
}

// In-memory store (for development - replace with Redis in production)
const store = new Map<string, RateLimitStore>();

interface RateLimitConfig {
  interval: number; // milliseconds
  limit: number; // max requests
}

const configs: Record<string, RateLimitConfig> = {
  auth: { interval: 15 * 60 * 1000, limit: 5 }, // 5 requests per 15 minutes
  login: { interval: 15 * 60 * 1000, limit: 10 }, // 10 attempts per 15 minutes
  register: { interval: 60 * 60 * 1000, limit: 3 }, // 3 registrations per hour
  passwordReset: { interval: 60 * 60 * 1000, limit: 3 }, // 3 resets per hour
  api: { interval: 60 * 1000, limit: 60 }, // 60 requests per minute
};

export async function rateLimit(
  identifier: string,
  type: keyof typeof configs = 'api'
): Promise<{ success: boolean; limit: number; remaining: number; reset: number }> {
  const config = configs[type];
  const now = Date.now();
  const key = `${type}:${identifier}`;

  // Get or create rate limit entry
  let entry = store.get(key);

  if (!entry || now > entry.resetTime) {
    // Create new entry or reset expired one
    entry = {
      count: 0,
      resetTime: now + config.interval,
    };
  }

  entry.count++;
  store.set(key, entry);

  // Clean up old entries periodically
  if (Math.random() < 0.01) {
    for (const [k, v] of store.entries()) {
      if (now > v.resetTime) {
        store.delete(k);
      }
    }
  }

  const remaining = Math.max(0, config.limit - entry.count);
  const success = entry.count <= config.limit;

  return {
    success,
    limit: config.limit,
    remaining,
    reset: entry.resetTime,
  };
}

/**
 * Get client identifier for rate limiting
 * Uses IP address or fallback to a session-based identifier
 */
export function getClientIdentifier(request: Request): string {
  // Try to get real IP from headers (handles proxies)
  const forwarded = request.headers.get('x-forwarded-for');
  const realIp = request.headers.get('x-real-ip');
  
  if (forwarded) {
    const ips = forwarded.split(',');
    return ips[0].trim();
  }
  
  if (realIp) {
    return realIp;
  }
  
  // Fallback to a combination of headers
  const userAgent = request.headers.get('user-agent') || '';
  const accept = request.headers.get('accept') || '';
  const acceptLanguage = request.headers.get('accept-language') || '';
  
  // Create a hash-like identifier from headers
  return `${userAgent.slice(0, 50)}-${accept.slice(0, 20)}-${acceptLanguage.slice(0, 10)}`;
}

/**
 * Rate limit response headers
 */
export function getRateLimitHeaders(result: {
  limit: number;
  remaining: number;
  reset: number;
}): Record<string, string> {
  return {
    'X-RateLimit-Limit': result.limit.toString(),
    'X-RateLimit-Remaining': result.remaining.toString(),
    'X-RateLimit-Reset': new Date(result.reset).toISOString(),
  };
}

/**
 * Middleware helper to apply rate limiting to API routes
 */
export async function withRateLimit(
  request: Request,
  type: keyof typeof configs,
  handler: (request: Request) => Promise<Response>
): Promise<Response> {
  const identifier = getClientIdentifier(request);
  const result = await rateLimit(identifier, type);
  
  if (!result.success) {
    return new Response(
      JSON.stringify({
        error: 'Too many requests',
        message: `Rate limit exceeded. Try again after ${new Date(result.reset).toLocaleTimeString()}`,
      }),
      {
        status: 429,
        headers: {
          'Content-Type': 'application/json',
          ...getRateLimitHeaders(result),
          'Retry-After': Math.ceil((result.reset - Date.now()) / 1000).toString(),
        },
      }
    );
  }
  
  const response = await handler(request);
  
  // Add rate limit headers to successful responses
  Object.entries(getRateLimitHeaders(result)).forEach(([key, value]) => {
    response.headers.set(key, value);
  });
  
  return response;
}

/**
 * Production-ready Upstash Redis rate limiter
 * Uncomment and configure when ready to use Redis
 */
/*
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

export const rateLimiters = {
  auth: new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(5, "15 m"),
    analytics: true,
  }),
  login: new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(10, "15 m"),
    analytics: true,
  }),
  register: new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(3, "1 h"),
    analytics: true,
  }),
  passwordReset: new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(3, "1 h"),
    analytics: true,
  }),
  api: new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(60, "1 m"),
    analytics: true,
  }),
};
*/
