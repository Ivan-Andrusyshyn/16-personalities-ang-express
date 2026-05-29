import mongoose from 'mongoose';

const universalSchema = new mongoose.Schema(
  {
    createdAt: { type: Date, default: Date.now },
  },
  { strict: false },
);

export const TestCardsModel = mongoose.model('test-cards', universalSchema);
