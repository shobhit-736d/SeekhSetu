import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

function stripTypeScriptTypes(content) {
  return content
    .replace(/^import\s+type\s+.*?;\s*$/gm, '')
    .replace(/^import\s+{([^}]+)}\s+from\s+['"][^'"]+['"];\s*$/gm, (match, imports) => {
      return '';
    })
    .replace(/:\s*AssessmentQuestion\[\]/g, '')
    .replace(/:\s*AssessmentPreset\[\]/g, '')
    .replace(/:\s*Record<string,\s*any>/g, '')
    .replace(/:\s*string\[\]/g, '')
    .replace(/:\s*number\[\]/g, '')
    .replace(/:\s*boolean/g, '')
    .replace(/:\s*string/g, '')
    .replace(/:\s*number/g, '');
}

const assessmentsDataSrc = fs.readFileSync(path.join(rootDir, 'src', 'data', 'assessmentsData.ts'), 'utf-8');
const assessmentsSeedJs = stripTypeScriptTypes(assessmentsDataSrc);

fs.writeFileSync(path.join(rootDir, 'server', 'data', 'assessmentsSeed.js'), assessmentsSeedJs, 'utf-8');

console.log('✅ Generated server/data/assessmentsSeed.js!');
