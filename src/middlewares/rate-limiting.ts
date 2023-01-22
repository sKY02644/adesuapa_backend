import { Request, Response, NextFunction } from 'express';
import rateLimit from 'express-rate-limit';

const rateLimiter = rateLimit({
    windowMs: 30 * 1000, // 30 seconds
    max: 10, // limit each IP to 100 requests per windowMs
});

// create separate rate limiters for different routes
const loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 8, // limit each IP to 10 requests per windowMs
    message: 'Too many login attempts from this IP, please try again later',
  });
  
  const signupLimiter = rateLimit({
    windowMs: 60 * 60 * 1000, // 1 hour
    max: 10, // limit each IP to 5 requests per windowMs
    message: 'Too many signups from this IP, please try again later',
  });

const rateLimitingMiddleware = (req: Request, res: Response, next: NextFunction) => {
    rateLimiter(req, res, next);
};

export { 
    rateLimitingMiddleware,
    loginLimiter,
    signupLimiter
};