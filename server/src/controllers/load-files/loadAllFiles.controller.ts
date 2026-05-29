import { Request, Response } from 'express';

import googleSheetsService from '../../services/google-sheets.service';
import cacheService from '../../services/cache.service';
import { ARRAY_OF_FILE_IDS } from '../../utils/google-file-ids-env';
import { CalculatorInformation } from '../../types/personalities-calculator';

const loadAllFiles = async (req: Request, res: Response): Promise<any> => {
  try {
    const fileIds = ARRAY_OF_FILE_IDS;

    for (let i = 0; i < fileIds.length; i += 1) {
      (await cacheService.getCache(fileIds[i], () =>
        googleSheetsService.getDataGoogle(fileIds[i]),
      )) as CalculatorInformation;
    }

    res.status(200).send({
      message: 'Succesfull loaded files!',
    });
  } catch (error) {
    console.log(error);

    return res.status(400).send('Internal server error');
  }
};

export default loadAllFiles;
