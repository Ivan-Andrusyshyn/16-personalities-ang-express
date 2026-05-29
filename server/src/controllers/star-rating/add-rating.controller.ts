import { Request, Response } from 'express';

import { StarRatingModel } from '../../db/models/star-rating-schema';

const addRating = async (req: Request, res: Response): Promise<any> => {
  try {
    const { testName, score } = req.body;

    if (!testName || typeof score !== 'number' || score < 1 || score > 5) {
      return res.status(400).json({ message: 'Invalid input' });
    }

    const existing = await StarRatingModel.findOne({ testName });

    if (existing) {
      const totalScore = existing.rating * existing.votes + score;
      const newVotes = existing.votes + 1;
      existing.rating = totalScore / newVotes;
      existing.votes = newVotes;
      await existing.save();
      return res.status(200).json({ rating: existing.rating, votes: newVotes });
    } else {
      const newDoc = await StarRatingModel.create({
        testName,
        rating: score,
        votes: 1,
      });
      return res
        .status(201)
        .json({ rating: newDoc.rating, votes: newDoc.votes });
    }
  } catch (error) {
    console.error('addRating error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export default addRating;
