import { Request, Response } from "express";

// ===========
import beYourSelfService from "../../services/be-yourself.service";
import { PERSONALITIES } from "../../utils/google-file-ids-env";
import { personalitites } from "../../validators/valid-categoryName/tests";
import testDataService from "../../services/test-data.service";

const getTypeByResults = async (req: Request, res: Response): Promise<any> => {
  try {
    const personType = req.params.personType;
    //
    if (!personalitites.includes(personType)) {
      return res.status(400).send({
        message: "Error invalid params",
      });
    }
    const personNameByType = beYourSelfService.getPersonNameByType(personType);

    const fileId = PERSONALITIES.RESULTS;

    const data = await testDataService.getTestGoogleOrMongo(
      "be-yourself-results",
      fileId,
    );

    const results = data[0][personType];

    const personInformation = {
      title: personNameByType,
      ...results,
    };

    res.status(200).send({
      personInformation,
      message: "Success post person type .",
    });
  } catch (error) {
    console.log(error);

    return res.status(400).send({ message: "Internal server Error" });
  }
};

export default getTypeByResults;
