import { createRequire } from 'module';
const require = createRequire(import.meta.url);

let pdfParseModule = null;
let mammothModule = null;

try {
  pdfParseModule = require('pdf-parse');
} catch (e) {
  console.warn('pdf-parse require warning:', e.message);
}

try {
  mammothModule = require('mammoth');
} catch (e) {
  console.warn('mammoth require warning:', e.message);
}

/**
 * Robust server-side document text extractor supporting PDF, DOCX, and TXT files
 */
export async function extractTextFromDocument(fileBuffer, originalName = '') {
  if (!fileBuffer || fileBuffer.length === 0) {
    return '';
  }

  const nameLower = originalName.toLowerCase();
  const isPdf = nameLower.endsWith('.pdf') || fileBuffer.slice(0, 5).toString('ascii').startsWith('%PDF');
  const isDocx = nameLower.endsWith('.docx');

  // 1. PDF Parser
  if (isPdf && pdfParseModule) {
    try {
      // Check if it's the class version (new pdf-parse) or default function (legacy)
      if (typeof pdfParseModule.PDFParse === 'function') {
        const parser = new pdfParseModule.PDFParse({ data: fileBuffer });
        const result = await parser.getText();
        await parser.destroy().catch(() => {});
        if (result && result.text && result.text.trim().length > 10) {
          return cleanExtractedText(result.text);
        }
      } else if (typeof pdfParseModule === 'function') {
        const result = await pdfParseModule(fileBuffer);
        if (result && result.text && result.text.trim().length > 10) {
          return cleanExtractedText(result.text);
        }
      }
    } catch (err) {
      console.warn('PDF parser notice, trying text buffer fallback:', err.message);
    }
  }

  // 2. DOCX Parser
  if (isDocx && mammothModule) {
    try {
      const result = await mammothModule.extractRawText({ buffer: fileBuffer });
      if (result && result.value && result.value.trim().length > 10) {
        return cleanExtractedText(result.value);
      }
    } catch (err) {
      console.warn('DOCX parser notice:', err.message);
    }
  }

  // 3. Fallback for plain text, markdown, or readable streams
  const raw = fileBuffer.toString('utf-8');
  return cleanExtractedText(raw);
}

function cleanExtractedText(text) {
  if (!text) return '';
  return text
    .replace(/[^\x20-\x7E\t\r\n]/g, ' ') // strip non-printable binary chars
    .replace(/\r\n/g, '\n')
    .replace(/\n{3,}/g, '\n\n')
    .replace(/[ \t]{2,}/g, ' ')
    .trim();
}
