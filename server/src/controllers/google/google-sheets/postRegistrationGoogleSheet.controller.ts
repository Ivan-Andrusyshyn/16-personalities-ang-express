import { Request, Response } from 'express';

import googleSheetsService from '../../../services/google-sheets.service';

const postRegistrationGoogleSheet = async (
  req: Request,
  res: Response,
): Promise<any> => {
  try {
    const data = req.body;
    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;

    await googleSheetsService.postRegistrationInfoOnSheet({ ip, ...data });
    res.status(200).send({ message: 'Successfull add new row' });
  } catch (error) {
    console.log(error);

    return res.status(400).send({ message: 'Internal server Error' });
  }
};

export default postRegistrationGoogleSheet;
