import { Request, Response } from "express";

import googleSheetsService from "../../../services/google-sheets.service";
import cacheService from "../../../services/cache.service";
import { PERSONALITIES } from "../../../utils/google-file-ids-env";
import { CalculatorDisclaimer } from "../../../types/personalities-calculator";

const getPersonalitiesCalculatorDisclaimer = async (
  req: Request,
  res: Response,
): Promise<any> => {
  try {
    const fileId = PERSONALITIES.CALCULATOR.DISCLAIMER;

    const calculatorDisclaimer = (await cacheService.getCache(fileId, () =>
      googleSheetsService.getDataGoogle(fileId),
    )) as { disclaimer: CalculatorDisclaimer };

    res.status(200).send({
      message: "Successful calculate!",
      calculatorDisclaimer: calculatorDisclaimer.disclaimer,
    });
  } catch (error) {
    console.log(error);

    return res.status(400);
  }
};

export default getPersonalitiesCalculatorDisclaimer;
