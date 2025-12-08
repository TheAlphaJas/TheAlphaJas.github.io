import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const csesRepoPath = '/tmp/cses-sols';
const outputDir = path.join(path.dirname(__dirname), 'content', 'cses');

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
    .replace(/_/g, ' ')
    .replace(/\b\w/g, (l) => l.toUpperCase());
}

// Function to extract topic from path
function extractTopic(filePath) {
  const parts = filePath.split(path.sep);
  const topicIndex = parts.findIndex(p => 
    ['Dynamic Programming', 'Graphs', 'Range Queries', 'Sorting and Searching'].includes(p)
  );
  
  if (topicIndex !== -1) {
    return parts[topicIndex];
  }
  return 'General';
}

// Find all C++ files
const cppFiles = [];
function findCppFiles(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat.isDirectory() && !filePath.includes('.git') && !filePath.includes('.vscode') && !filePath.includes('.cph')) {
      findCppFiles(filePath);
    } else if (file.endsWith('.cpp')) {
      cppFiles.push(filePath);
    }
  }
}

findCppFiles(csesRepoPath);

console.log(`Found ${cppFiles.length} CSES solution files`);

// Process each file
let imported = 0;
for (const filePath of cppFiles) {
  try {
    const code = fs.readFileSync(filePath, 'utf-8');
    const filename = path.basename(filePath);
    const slug = filenameToSlug(filename);
    const problemName = extractProblemName(filename);
    const topic = extractTopic(filePath);
    
    // Determine difficulty based on topic (rough estimate)
    let difficulty = 'Medium';
    if (topic === 'Dynamic Programming' || topic === 'Graphs') {
      difficulty = 'Hard';
    } else if (topic === 'Sorting and Searching') {
      difficulty = 'Easy';
    }
    
    // Create markdown content
    const frontmatter = `---
problemName: "${problemName}"
problemNumber: ""
difficulty: "${difficulty}"
keyIdea: "Solution implementation"
language: "C++"
github: "https://github.com/TheAlphaJas/cses-sols"
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
    console.log(`Imported: ${problemName} (${topic})`);
  } catch (error) {
    console.error(`Error processing ${filePath}:`, error.message);
  }
}

console.log(`\nImported ${imported} CSES solutions to ${outputDir}`);

