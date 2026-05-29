import { Request, Response } from "express";

// ===============
import { personalitiesPhraseService } from "../../services/be-yourself-phrases.service";

const getDayPhrases = async (req: Request, res: Response): Promise<any> => {
  try {
    const dayPhrases = personalitiesPhraseService.getAllDayPhrases();

    return res.send({
      message: "Success get phrases.",
      ...dayPhrases,
    });
  } catch (error) {
    console.log(error);

    return res.status(400).send("Internal server error");
  }
};
export default getDayPhrases;
