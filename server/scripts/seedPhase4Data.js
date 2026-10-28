import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

import { AssessmentQuestion } from '../models/AssessmentQuestion.js';
import { assessmentQuestionsBank } from '../data/assessmentsSeed.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const MONGO_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/seekhsetu_db';

async function seedPhase4() {
  console.log('🌱 Seeding Assessment Questions to MongoDB Atlas...');
  try {
    await mongoose.connect(MONGO_URI, { dbName: 'seekhsetu_db' });
    console.log(`Connected to MongoDB Atlas: ${mongoose.connection.host}`);

    let qCount = 0;
    for (const q of assessmentQuestionsBank) {
      await AssessmentQuestion.findOneAndUpdate(
        { id: q.id },
        { $set: q },
        { upsert: true, new: true, setDefaultsOnInsert: true }
      );
      qCount++;
    }
    console.log(`  ✅ Synced ${qCount} Assessment Questions across all career tracks into MongoDB Atlas.`);

    console.log('\n🎉 Successfully seeded all Phase 4 Questions into MongoDB Atlas!');
    await mongoose.disconnect();
    process.exit(0);
  } catch (err) {
    console.error('❌ Failed to seed Phase 4 data:', err);
    process.exit(1);
  }
}

seedPhase4();
