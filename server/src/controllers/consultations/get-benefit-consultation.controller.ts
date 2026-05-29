import { Request, Response } from 'express';

import cacheService from '../../services/cache.service';
import googleSheetsService from '../../services/google-sheets.service';
import { BENEFIT_CONSULTATION } from '../../utils/google-file-ids-env';

const getBenefitConsultation = async (
  req: Request,
  res: Response,
): Promise<any> => {
  try {
    const fileId = BENEFIT_CONSULTATION;

    const results = await cacheService.getCache(fileId, () =>
      googleSheetsService.getDataGoogle(fileId),
    );

    if (results) {
      res.status(201).send({
        message: 'Successfully get information.',
        results,
      });
    } else {
      res.status(400).send({
        message: 'Error google file is undefinde or null!',
      });
    }
  } catch (error) {
    console.log(error);

    return res.status(400).send({ message: 'Internal server Error' });
  }
};

export default getBenefitConsultation;
