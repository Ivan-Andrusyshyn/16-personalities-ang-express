import { Request, Response } from 'express';
import { config } from 'dotenv';

//==========
import { TestsUserDataModel } from '../../db/models/test-user-data';
import { notifyNewSale } from '../../bot';

config();

const isProd = process.env['NODE_ENV'] === 'production';

export const saveTestUserData = async (
  req: Request,
  res: Response,
): Promise<any> => {
  try {
    const userInformation = req.body.userInformation;

    const ip = req.headers['x-forwarded-for']
      ? (req.headers['x-forwarded-for'] as string).split(',')[0].trim()
      : req.socket.remoteAddress || 'Unknown';

    if (isProd) {
      await TestsUserDataModel.create({
        ...userInformation,
        ip,
        results: userInformation.categoryName,
      });
      const lastSale = await TestsUserDataModel.findOne({
        testName: userInformation.testName,
      }).sort({
        createdAt: -1,
      });

      if (lastSale) {
        await notifyNewSale(lastSale);
      }
    }

    return res.status(201).send({ userInformation });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};
