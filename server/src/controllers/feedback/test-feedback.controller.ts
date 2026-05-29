import { Request, Response } from 'express';
//

import { FeedbackModel } from '../../db/models/feedback-schema';

export const createTestFeedback = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { testName, message } = req.body;

    if (!testName || !message) {
      return res
        .status(400)
        .send({ message: 'testName and message requaired' });
    }
    console.log(testName, message);

    const newFeedback = new FeedbackModel({ testName, message });
    await newFeedback.save();

    return res
      .status(201)
      .send({ message: 'Success created', feedback: newFeedback });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: 'Server error' });
  }
};

export const getAllTestsFeedbacks = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const feedbacks = await FeedbackModel.find().sort({ createdAt: -1 });

    return res.status(200).send({ feedbacks });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: 'Server error' });
  }
};

export const getFeedbacksByTest = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { testName } = req.params;

    const feedbacks = await FeedbackModel.find({ testName }).sort({
      createdAt: -1,
    });

    return res.status(200).send({ feedbacks });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: 'Server error' });
  }
};
