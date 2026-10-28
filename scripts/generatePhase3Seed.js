import fs from 'fs';

// 1. Resources
const resTs = fs.readFileSync('src/data/learningResourcesData.ts', 'utf8');
const resJs = resTs
  .replace(/import\s*\{[^}]*\}\s*from\s*['"][^'"]*['"];?\s*/g, '')
  .replace(/export const learningResourcesList:\s*LearningResource\[\]\s*=/g, 'export const learningResourcesList =')
  .replace(/export const getResourcesByTrack[\s\S]*$/, '')
  .replace(/export const getResourceCategories[\s\S]*$/, '');

fs.writeFileSync('server/data/learningResourcesSeed.js', resJs, 'utf8');

// 2. Projects
const projTs = fs.readFileSync('src/data/guidedProjectsData.ts', 'utf8');
const projJs = projTs
  .replace(/import\s*\{[^}]*\}\s*from\s*['"][^'"]*['"];?\s*/g, '')
  .replace(/export const guidedProjectsList:\s*GuidedProject\[\]\s*=/g, 'export const guidedProjectsList =')
  .replace(/export const getGuidedProjectsByTrack[\s\S]*$/, '')
  .replace(/export const getProjectTypes[\s\S]*$/, '');

fs.writeFileSync('server/data/guidedProjectsSeed.js', projJs, 'utf8');

console.log('✅ Generated server seed files for Resources and Projects!');
