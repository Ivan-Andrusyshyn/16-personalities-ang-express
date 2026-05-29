import { Request, Response, NextFunction } from 'express';

import { commonValidator } from './common-validator';

export const postRegistrationGoogleSheetValidator = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const validationRule = {
    socialMedia: 'required|string',
  };
  return await commonValidator(req, res, next, validationRule);
};
