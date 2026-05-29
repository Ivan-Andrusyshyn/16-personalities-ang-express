import { Request, Response } from "express";

import googleSheetsService from "../../../services/google-sheets.service";
import cacheService from "../../../services/cache.service";
import { PERSONALITIES } from "../../../utils/google-file-ids-env";
import { CalculatorInformation } from "../../../types/personalities-calculator";

const getPersonalitiesCalculatorInformation = async (
  req: Request,
  res: Response,
): Promise<any> => {
  try {
    const fileId = PERSONALITIES.CALCULATOR.INFORMATION;
    const calculatorInformation = (await cacheService.getCache(fileId, () =>
      googleSheetsService.getDataGoogle(fileId),
    )) as CalculatorInformation;

    res.status(200).send({
      message: "Successful calculate!",
      calculatorInformation,
    });
  } catch (error) {
    console.log(error);

    return res.status(400);
  }
};

export default getPersonalitiesCalculatorInformation;
