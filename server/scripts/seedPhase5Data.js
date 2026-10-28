// server/scripts/seedPhase5Data.js
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

import { InterviewQuestion } from '../models/InterviewQuestion.js';
import { interviewQuestionsSeed } from '../data/interviewsSeed.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const MONGO_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/seekhsetu_db';

async function seedPhase5() {
  console.log('🌱 Seeding Technical Interview Questions to MongoDB Atlas...');
  try {
    await mongoose.connect(MONGO_URI, { dbName: 'seekhsetu_db' });
    console.log(`Connected to MongoDB Atlas: ${mongoose.connection.host}`);

    let qCount = 0;
    for (const q of interviewQuestionsSeed) {
      await InterviewQuestion.findOneAndUpdate(
        { id: q.id },
        { $set: q },
        { upsert: true, new: true, setDefaultsOnInsert: true }
      );
      qCount++;
    }
    console.log(`  ✅ Synced ${qCount} Technical Interview Questions across all career tracks into MongoDB Atlas.`);

    console.log('\n🎉 Successfully seeded all Phase 5 Interview Questions into MongoDB Atlas!');
    await mongoose.disconnect();
    process.exit(0);
  } catch (err) {
    console.error('❌ Failed to seed Phase 5 data:', err);
    process.exit(1);
  }
}

seedPhase5();
