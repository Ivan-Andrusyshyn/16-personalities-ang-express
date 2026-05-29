import rateLimit from 'express-rate-limit';

export const limiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 60,
  standardHeaders: true,
  legacyHeaders: false,
  message: 'Забагато запитів з цього IP, спробуйте пізніше.',
});
