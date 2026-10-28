import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

import { LearningResource } from '../models/LearningResource.js';
import { GuidedProject } from '../models/GuidedProject.js';
import { learningResourcesList } from '../data/learningResourcesSeed.js';
import { guidedProjectsList } from '../data/guidedProjectsSeed.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const MONGO_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/seekhsetu_db';

async function seedPhase3() {
  console.log('🌱 Seeding Resources and Guided Projects to MongoDB Atlas...');
  try {
    await mongoose.connect(MONGO_URI, { dbName: 'seekhsetu_db' });
    console.log(`Connected to MongoDB Atlas: ${mongoose.connection.host}`);

    // Seed Resources
    let resCount = 0;
    for (const res of learningResourcesList) {
      await LearningResource.findOneAndUpdate(
        { title: res.title, trackSlug: res.trackSlug },
        { $set: res },
        { upsert: true, new: true, setDefaultsOnInsert: true }
      );
      resCount++;
    }
    console.log(`  ✅ Synced ${resCount} Learning Resources into MongoDB Atlas.`);

    // Seed Projects
    let projCount = 0;
    for (const proj of guidedProjectsList) {
      await GuidedProject.findOneAndUpdate(
        { slug: proj.slug },
        { $set: proj },
        { upsert: true, new: true, setDefaultsOnInsert: true }
      );
      projCount++;
    }
    console.log(`  ✅ Synced ${projCount} Guided Projects into MongoDB Atlas.`);

    console.log('\n🎉 Successfully seeded all Phase 3 Resources & Projects into MongoDB Atlas!');
    await mongoose.disconnect();
    process.exit(0);
  } catch (err) {
    console.error('❌ Failed to seed Phase 3 data:', err);
    process.exit(1);
  }
}

seedPhase3();
