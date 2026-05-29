import mongoose from 'mongoose';
import { config } from 'dotenv';
config();

const MONGO_URI = process.env.MONGO_DB ?? '';

export async function connectToDB() {
  try {
    await mongoose.connect(MONGO_URI, {
      dbName: 'click-tracker',
    });
    console.log('✅ Connected to MongoDB');
  } catch (err) {
    console.error('❌ MongoDB connection error:', err);
  }
}
