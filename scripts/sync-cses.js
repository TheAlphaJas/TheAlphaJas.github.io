#!/usr/bin/env node
/**
 * Streamlined CSES Solutions Sync Script
 * 
 * This script syncs new solutions from the cses-sols repository to the website.
 * It only imports new solutions that don't already exist.
 * 
 * Usage:
 *   node scripts/sync-cses.js [--force] [--repo-path=/path/to/cses-sols]
 * 
 * Options:
 *   --force: Re-import all solutions (overwrite existing)
 *   --repo-path: Path to cses-sols repository (default: /tmp/cses-sols)
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Parse command line arguments
const args = process.argv.slice(2);
const force = args.includes('--force');
const repoPathArg = args.find(arg => arg.startsWith('--repo-path='));
const csesRepoPath = repoPathArg ? repoPathArg.split('=')[1] : '/tmp/cses-sols';
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
    // "Farmer_John_s_Favorite" -> "Farmer John's Favorite"
    .replace(/_s(_|$)/g, "'s$1")
    .replace(/_/g, ' ')
    // Capitalise word-initial letters only. \b\w also fires after an accented
    // character, which turned "Gokce" (with diacritics) into "GoKcE".
    .replace(/(^|\s)(\p{L})/gu, (_m, sep, ch) => sep + ch.toUpperCase());
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
  if (!fs.existsSync(dir)) {
    console.error(`Repository path does not exist: ${dir}`);
    console.error('Please clone the repository first or specify --repo-path');
    process.exit(1);
  }
  
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

console.log(`Found ${cppFiles.length} CSES solution files in repository`);

// Get existing slugs
const existingFiles = fs.existsSync(outputDir) ? fs.readdirSync(outputDir) : [];
const existingSlugs = new Set(existingFiles.filter(f => f.endsWith('.md')).map(f => f.replace('.md', '')));

// Process each file
let imported = 0;
let skipped = 0;
let updated = 0;

for (const filePath of cppFiles) {
  try {
    const code = fs.readFileSync(filePath, 'utf-8');
    const filename = path.basename(filePath);
    const slug = filenameToSlug(filename);
    const problemName = extractProblemName(filename);
    const topic = extractTopic(filePath);
    
    const outputPath = path.join(outputDir, `${slug}.md`);
    const exists = existingSlugs.has(slug);
    
    if (exists && !force) {
      skipped++;
      continue;
    }
    
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
topic: "${topic}"
topics:
  - "${topic}"
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
    fs.writeFileSync(outputPath, content, 'utf-8');
    
    if (exists) {
      updated++;
      console.log(`Updated: ${problemName} (${topic})`);
    } else {
      imported++;
      console.log(`Imported: ${problemName} (${topic})`);
    }
  } catch (error) {
    console.error(`Error processing ${filePath}:`, error.message);
  }
}

console.log(`\nSummary:`);
console.log(`  Imported: ${imported} new solutions`);
console.log(`  Updated: ${updated} existing solutions`);
console.log(`  Skipped: ${skipped} existing solutions (use --force to re-import)`);
console.log(`\nTotal: ${imported + updated + skipped} solutions processed`);

