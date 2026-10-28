import fs from 'fs';

const tsContent = fs.readFileSync('src/data/careerTracksData.ts', 'utf8');

let jsContent = tsContent
  .replace(/import\s*\{[^}]*\}\s*from\s*['"][^'"]*['"];?\s*/g, '')
  .replace(/export const careerTracksList:\s*CareerTrack\[\]\s*=/g, 'export const careerTracksList =')
  .replace(/export const getCareerTracksByCategory[\s\S]*$/, '')
  .replace(/export const getCareerTrackBySlug[\s\S]*$/, '');

// Ensure server/data directory exists
if (!fs.existsSync('server/data')) {
  fs.mkdirSync('server/data', { recursive: true });
}

fs.writeFileSync('server/data/careerTracksSeed.js', jsContent, 'utf8');
console.log('✅ Generated server/data/careerTracksSeed.js successfully!');
