import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const usacoRepoPath = '/tmp/usaco-sols';
const outputDir = path.join(path.dirname(__dirname), 'content', 'usaco');

// Ensure output directory exists
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Function to convert filename to slug
function filenameToSlug(filename) {
  return filename
    .replace(/\.cpp$/, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

// Function to extract problem name from filename
function extractProblemName(filename) {
  return filename
    .replace(/\.cpp$/, '')
    // "Farmer_John_s_Favorite" -> "Farmer John's Favorite"
    .replace(/_s(_|$)/g, "'s$1")
    .replace(/_/g, ' ')
    // Capitalise word-initial letters only. \b\w also fires after an accented
    // character, which turned "Gokce" (with diacritics) into "GoKcE".
    .replace(/(^|\s)(\p{L})/gu, (_m, sep, ch) => sep + ch.toUpperCase());
}

// Function to extract division and topic from path
function extractMetadata(filePath) {
  const parts = filePath.split(path.sep);
  const bronzeIndex = parts.findIndex(p => p.toLowerCase() === 'bronze');
  const silverIndex = parts.findIndex(p => p.toLowerCase() === 'silver');
  const goldIndex = parts.findIndex(p => p.toLowerCase() === 'gold');
  const platinumIndex = parts.findIndex(p => p.toLowerCase() === 'platinum');
  
  let division = 'Bronze';
  if (platinumIndex !== -1) division = 'Platinum';
  else if (goldIndex !== -1) division = 'Gold';
  else if (silverIndex !== -1) division = 'Silver';
  
  // Extract topic (folder name before the problem file)
  const topicIndex = Math.max(bronzeIndex, silverIndex, goldIndex, platinumIndex);
  let topic = 'General';
  if (topicIndex !== -1 && topicIndex + 1 < parts.length - 1) {
    topic = parts[topicIndex + 1];
  }
  
  return { division, topic };
}

// Find all C++ files
const cppFiles = [];
function findCppFiles(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat.isDirectory()) {
      findCppFiles(filePath);
    } else if (file.endsWith('.cpp')) {
      cppFiles.push(filePath);
    }
  }
}

findCppFiles(usacoRepoPath);

console.log(`Found ${cppFiles.length} USACO solution files`);

// Process each file
let imported = 0;
for (const filePath of cppFiles) {
  try {
    const code = fs.readFileSync(filePath, 'utf-8');
    const filename = path.basename(filePath);
    const slug = filenameToSlug(filename);
    const problemName = extractProblemName(filename);
    const { division, topic } = extractMetadata(filePath);
    
    // Create markdown content
    const frontmatter = `---
problemName: "${problemName}"
contest: "USACO ${division}"
difficulty: "${division}"
keyIdea: "Solution implementation"
language: "C++"
github: "https://github.com/TheAlphaJas/USACO-Sols"
---
`;

    const content = `${frontmatter}
## Solution

\`\`\`cpp
${code}
\`\`\`
`;

    // Write to output file
    const outputPath = path.join(outputDir, `${slug}.md`);
    fs.writeFileSync(outputPath, content, 'utf-8');
    imported++;
    console.log(`Imported: ${problemName} (${division})`);
  } catch (error) {
    console.error(`Error processing ${filePath}:`, error.message);
  }
}

console.log(`\nImported ${imported} USACO solutions to ${outputDir}`);

