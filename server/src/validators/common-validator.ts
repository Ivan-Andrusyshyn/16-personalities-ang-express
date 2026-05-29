import { Request, Response, NextFunction } from 'express';

import Validator from 'validatorjs';

const commonValidator = async (
  req: Request,
  res: Response,
  next: NextFunction,
  validationRule: any
) => {
  const validation = new Validator(req.body, validationRule);

  if (validation.fails()) {
    res.status(412).send({
      success: false,
      message: 'Validation failed',
      data: validation.errors.all(),
    });
  } else {
    next();
  }
};

export { commonValidator };
