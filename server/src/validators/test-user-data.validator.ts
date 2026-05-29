import { Request, Response, NextFunction } from 'express';

import { commonValidator } from './common-validator';
import { testsValidationCommonObject } from './helpers';

export const testUserDataValidator = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  const validationRule = {
    userInformation: 'required',
    ...testsValidationCommonObject,
  };
  return await commonValidator(req, res, next, validationRule);
};
