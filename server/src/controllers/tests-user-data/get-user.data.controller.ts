import { Request, Response } from 'express';
//

import { TestsUserDataModel } from '../../db/models/test-user-data';

export const getAllTestsUserData = async (
  req: Request,
  res: Response,
): Promise<any> => {
  try {
    const data = await TestsUserDataModel.find();

    return res.status(201).send(data);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};
