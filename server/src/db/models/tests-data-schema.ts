import mongoose, { Model } from "mongoose";

const universalSchema = new mongoose.Schema(
  {
    createdAt: { type: Date, default: Date.now },
  },
  { strict: false },
);

universalSchema.index({ createdAt: 1 }, { expireAfterSeconds: 3600 * 24 * 7 });

export function getUniversalModel(modelName: string): Model<any> {
  return (
    mongoose.models[modelName] || mongoose.model(modelName, universalSchema)
  );
}
