import { Request, Response } from "express";

// ===================
import personalitiesCalculatorService from "../../../services/16-personalities-calculator.service";
import { PersonalityKey } from "../../../types/16-personalities";
import { PERSONALITIES } from "../../../utils/google-file-ids-env";
import { CalculatorResult } from "../../../types/personalities-calculator";
import { getUniversalModel } from "../../../db/models/tests-data-schema";

const getPersonalitiesCalculatorResults = async (
  req: Request,
  res: Response,
): Promise<any> => {
  try {
    const personsTypes = req.body.personsTypes as [
      PersonalityKey,
      PersonalityKey,
    ];

    const ip = req.headers["x-forwarded-for"]
      ? (req.headers["x-forwarded-for"] as string).split(",")[0].trim()
      : req.socket.remoteAddress || "Unknown";

    const fileResultsId = PERSONALITIES.CALCULATOR.RESULTS;
    // const calculateMatchesId = PERSONALITIES.CALCULATOR.IDS;

    // const results = await cacheService.getCache(fileResultsId, () =>
    //   googleSheetsService.getDataGoogle(fileResultsId)
    // );

    const resultsModel = getUniversalModel("personalities-calculator-results");
    const matchesModel = getUniversalModel("personalities-calculator-matches");

    const [resultsDoc, matchesDoc] = await Promise.all([
      resultsModel.findOne(),
      matchesModel.findOne(),
    ]);

    if (!resultsDoc || !matchesDoc) {
      return res.status(500).json({ message: "Data not found in database" });
    }

    const typesOfPair = `${personsTypes[0]}-${personsTypes[1]}`;
    const scoreResult = matchesDoc[typesOfPair];

    if (scoreResult) {
      const relationshipsType =
        personalitiesCalculatorService.getTypeRelationshipByScore(scoreResult);

      const calculatorResults = resultsDoc[
        relationshipsType.title
      ] as CalculatorResult;

      res.status(200).send({
        message: "Successful calculate!",
        relationshipsType,
        calculatorResults,
        scoreResult,
      });
    } else {
      return res
        .status(400)
        .send({ message: "Error, scoreResult is not a number!" });
    }
  } catch (error) {
    console.log(error);

    return res.status(400);
  }
};

export default getPersonalitiesCalculatorResults;
