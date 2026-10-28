import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { CareerTrack } from '../models/CareerTrack.js';
import { careerTracksList } from '../data/careerTracksSeed.js';

import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const MONGO_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/seekhsetu_db';

async function seedTracks() {
  console.log('🌱 Seeding 18 Career Tracks to MongoDB Atlas...');
  try {
    await mongoose.connect(MONGO_URI, { dbName: 'seekhsetu_db' });
    console.log(`Connected to MongoDB Atlas: ${mongoose.connection.host}`);

    let upsertedCount = 0;
    for (const track of careerTracksList) {
      await CareerTrack.findOneAndUpdate(
        { slug: track.slug },
        { $set: track },
        { upsert: true, new: true, setDefaultsOnInsert: true }
      );
      upsertedCount++;
      console.log(`  [${upsertedCount}/18] Upserted track: ${track.title} (${track.slug})`);
    }

    console.log(`\n🎉 Successfully synced all ${upsertedCount} career tracks into MongoDB Atlas!`);
    await mongoose.disconnect();
    process.exit(0);
  } catch (err) {
    console.error('❌ Failed to seed career tracks:', err);
    process.exit(1);
  }
}

seedTracks();
