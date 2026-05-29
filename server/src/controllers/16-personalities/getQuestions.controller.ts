import { Request, Response } from "express";

// ===============
import { PERSONALITIES } from "../../utils/google-file-ids-env";
import testDataService from "../../services/test-data.service";

const getQuestions = async (req: Request, res: Response): Promise<any> => {
  try {
    // const questionsWithAnswers: Question[] = addAnswersInTestQuestions();
    const fileId = PERSONALITIES.QUESTIONS;

    const data = await testDataService.getTestGoogleOrMongo(
      "be-yourself-questions",
      fileId,
    );

    //
    const normalizeId = data.map((i, index) => ({ id: index + 1, ...i._doc }));

    res.status(200).send({
      questions: normalizeId,
      message: "Succesfull get all questions!",
    });
  } catch (error) {
    console.log(error);

    return res.status(400).send({ message: "Internal server Error" });
  }
};

export default getQuestions;
