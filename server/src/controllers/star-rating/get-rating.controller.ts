import { Request, Response } from 'express';

import { StarRatingModel } from '../../db/models/star-rating-schema';

const getRating = async (req: Request, res: Response): Promise<any> => {
  try {
    const testName = req.params.testName;

    const ratingDoc = await StarRatingModel.findOne({ testName });

    if (!ratingDoc) {
      return res.status(404).json({ message: 'Rating not found' });
    }
    return res.status(200).json({
      rating: ratingDoc.rating,
      votes: ratingDoc.votes,
    });
  } catch (error) {
    console.error('getRating error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export default getRating;
