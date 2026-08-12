#!/usr/bin/env node
/**
 * Streamlined USACO Solutions Sync Script
 * 
 * This script syncs new solutions from the USACO-Sols repository to the website.
 * It only imports new solutions that don't already exist.
 * 
 * Usage:
 *   node scripts/sync-usaco.js [--force] [--repo-path=/path/to/usaco-sols]
 * 
 * Options:
 *   --force: Re-import all solutions (overwrite existing)
 *   --repo-path: Path to USACO-Sols repository (default: /tmp/usaco-sols)
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
const usacoRepoPath = repoPathArg ? repoPathArg.split('=')[1] : '/tmp/usaco-sols';
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
  
  // Extract topic (folder name after the division)
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
  if (!fs.existsSync(dir)) {
    console.error(`Repository path does not exist: ${dir}`);
    console.error('Please clone the repository first or specify --repo-path');
    process.exit(1);
  }
  
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat.isDirectory() && !filePath.includes('.git') && !filePath.includes('.vscode')) {
      findCppFiles(filePath);
    } else if (file.endsWith('.cpp')) {
      cppFiles.push(filePath);
    }
  }
}

findCppFiles(usacoRepoPath);

console.log(`Found ${cppFiles.length} USACO solution files in repository`);

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
    const { division, topic } = extractMetadata(filePath);
    
    const outputPath = path.join(outputDir, `${slug}.md`);
    const exists = existingSlugs.has(slug);
    
    if (exists && !force) {
      skipped++;
      continue;
    }
    
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
    fs.writeFileSync(outputPath, content, 'utf-8');
    
    if (exists) {
      updated++;
      console.log(`Updated: ${problemName} (${division})`);
    } else {
      imported++;
      console.log(`Imported: ${problemName} (${division})`);
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

