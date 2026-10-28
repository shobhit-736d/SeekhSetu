// server/scripts/seedPhase6Data.js
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

import { Certification } from '../models/Certification.js';
import { JobListing } from '../models/JobListing.js';
import { certificationsSeed, jobListingsSeed } from '../data/phase6Seed.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const MONGO_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/seekhsetu_db';

async function seedPhase6() {
  console.log('🌱 Seeding Phase 6 Industry Certifications & Verified Job Listings to MongoDB Atlas...');
  try {
    await mongoose.connect(MONGO_URI, { dbName: 'seekhsetu_db' });
    console.log(`Connected to MongoDB Atlas: ${mongoose.connection.host}`);

    // 1. Seed Certifications
    let certCount = 0;
    for (const cert of certificationsSeed) {
      await Certification.findOneAndUpdate(
        { code: cert.code.toUpperCase() },
        { $set: cert },
        { upsert: true, new: true, setDefaultsOnInsert: true }
      );
      certCount++;
    }
    console.log(`  ✅ Synced ${certCount} Verified Industry Certifications into MongoDB Atlas.`);

    // 2. Seed JobListings
    let jobCount = 0;
    for (const job of jobListingsSeed) {
      await JobListing.findOneAndUpdate(
        { company: job.company, title: job.title },
        { $set: job },
        { upsert: true, new: true, setDefaultsOnInsert: true }
      );
      jobCount++;
    }
    console.log(`  ✅ Synced ${jobCount} Authentic Verified Job Opportunities into MongoDB Atlas.`);

    console.log('\n🎉 Successfully seeded all Phase 6 Certifications and Job Listings into MongoDB Atlas!');
    await mongoose.disconnect();
    process.exit(0);
  } catch (err) {
    console.error('❌ Failed to seed Phase 6 data:', err);
    process.exit(1);
  }
}

seedPhase6();
