import { Request, Response } from 'express';

import googleSheetsService from '../../../services/google-sheets.service';

const getGoogleSheetData = async (
  req: Request,
  res: Response,
): Promise<any> => {
  try {
    const respone = await googleSheetsService.getSheetData();
    res.status(201).send({ message: 'Successful!', respone });
  } catch (error) {
    console.log(error);
    return res.status(400).send({ message: 'Internal server Error' });
  }
};

export default getGoogleSheetData;
