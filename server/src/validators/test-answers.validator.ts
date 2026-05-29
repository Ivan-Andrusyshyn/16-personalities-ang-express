import { Request, Response, NextFunction } from 'express';

// ============
import { commonValidator } from './common-validator';
import { testsValidationCommonObject } from './helpers';

export const testAnswersValidator = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  const validationRule = {
    answers: 'required',
    'answers.*': ['required', 'string', 'regex:/^[0-9]+(\\.[0-9]+)?-[a-z-]+$/'],
  };
  return await commonValidator(req, res, next, validationRule);
};
