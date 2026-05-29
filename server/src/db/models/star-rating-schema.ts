import mongoose from 'mongoose';

const starRatingSchema = new mongoose.Schema({
  testName: {
    type: String,
    enum: [
      'you-coffee',
      'be-yourself',
      'attractiveness',
      'traumatic-experience',
      'role-in-relationships',
      'toxical-relationships',
    ],
    required: true,
  },
  rating: {
    type: Number,
    default: 0,
  },
  votes: {
    type: Number,
    default: 0,
  },
});

export const StarRatingModel = mongoose.model('starRating', starRatingSchema);
