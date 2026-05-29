import mongoose, { Schema } from 'mongoose';

const botSubscribersSchema = new Schema(
  {
    chatId: {
      type: Number,
      required: true,
      unique: true,
    },
  },
  { timestamps: true },
);

export const BotSubscribersSchema = mongoose.model(
  'bot-subscribers',
  botSubscribersSchema,
);
