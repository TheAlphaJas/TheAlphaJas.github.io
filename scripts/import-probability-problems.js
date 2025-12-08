import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Paths
const oldSiteDir = '/tmp/old-site/_posts';
const newContentDir = path.join(__dirname, '..', 'content', 'probability');

// Ensure output directory exists
if (!fs.existsSync(newContentDir)) {
  fs.mkdirSync(newContentDir, { recursive: true });
}

// Difficulty mapping based on tags and complexity
const inferDifficulty = (tags, title) => {
  const tagStr = tags.join(' ').toLowerCase();
  const titleStr = title.toLowerCase();
  
  // Hard problems typically have: Markov, Chain, Expectation, Conditional, etc.
  if (tagStr.includes('markov') || tagStr.includes('chain') || 
      tagStr.includes('expectation') || tagStr.includes('conditional') ||
      titleStr.includes('ii') || titleStr.includes('2')) {
    return 'Hard';
  }
  
  // Medium problems
  if (tagStr.includes('integration') || tagStr.includes('distribution') ||
      tagStr.includes('uniform')) {
    return 'Medium';
  }
  
  // Default to Medium for most
  return 'Medium';
};

// Extract original problem link from content
const extractOriginalLink = (content) => {
  // Try multiple patterns to catch different formats
  const patterns = [
    /Original Problem Link:\s*\*\*?\s*\[Click here\]\((https?:\/\/[^\s\)]+)\)/i,
    /Original Problem Link:\s*\[Click here\]\((https?:\/\/[^\s\)]+)\)/i,
    /\*\*Original Problem Link:\*\*\s*\[Click here\]\((https?:\/\/[^\s\)]+)\)/i,
    /Original Problem Link:\s*\*\*\[([^\]]+)\]\((https?:\/\/[^\s\)]+)\)\*\*/i,
  ];
  
  for (const pattern of patterns) {
    const match = content.match(pattern);
    if (match) {
      // Return the URL (could be in match[1] or match[2] depending on pattern)
      return match[2] || match[1];
    }
  }
  
  return null;
};

// Convert old format to new format
const convertProblem = (oldFilePath) => {
  const fileContent = fs.readFileSync(oldFilePath, 'utf-8');
  const { data, content } = matter(fileContent);
  
  // Extract original link
  const originalLink = extractOriginalLink(content);
  
  // Split content into problem and solution
  // Find the solution section start
  const solutionStart = content.search(/##\s*Solution/i);
  
  let problemText = '';
  let solutionText = '';
  
  if (solutionStart !== -1) {
    // Extract problem section (everything before "## Solution")
    const problemSection = content.substring(0, solutionStart);
    // Remove "## Problem Statement" or "## Problem" heading
    problemText = problemSection
      .replace(/^[\s\S]*?##\s*Problem Statement\s*/i, '')
      .replace(/^[\s\S]*?##\s*Problem\s*/i, '')
      .trim();
    
    // Extract solution section (everything after "## Solution")
    const solutionSection = content.substring(solutionStart);
    // Remove "## Solution" heading and everything after the final answer or emoji
    solutionText = solutionSection
      .replace(/^##\s*Solution\s*/i, '')
      // Remove the footer with emoji if it exists
      .replace(/\n---\s*\n\s*💡[\s\S]*$/i, '')
      .replace(/\n💡[\s\S]*$/i, '')
      .trim();
  } else {
    // Fallback: try to find problem statement
    const problemMatch = content.match(/##\s*Problem Statement\s*([\s\S]*?)(?=\n##|$)/i) ||
                         content.match(/##\s*Problem\s*([\s\S]*?)(?=\n##|$)/i);
    if (problemMatch) {
      problemText = problemMatch[1].trim();
    } else {
      problemText = content.trim();
    }
  }
  
  // Remove the original link line from problem text (handle various formats)
  problemText = problemText
    .replace(/\*\*?Original Problem Link:\*\*?\s*\[.*?\]\(.*?\)/gi, '')
    .replace(/Original Problem Link:\s*\[.*?\]\(.*?\)/gi, '')
    .trim();
  
  // Add original link to problem text if it exists
  if (originalLink) {
    problemText = `${problemText}\n\n**Original Problem Link:** [${originalLink}](${originalLink})`;
  }
  
  // Get topics from tags (remove "Probability" if it's the only tag, or use all unique tags)
  const tags = Array.isArray(data.tags) ? data.tags : [];
  const topics = tags.filter(tag => tag.toLowerCase() !== 'probability').length > 0
    ? tags.filter(tag => tag.toLowerCase() !== 'probability')
    : tags.length > 0 ? tags : ['Probability'];
  
  // Infer difficulty
  const difficulty = inferDifficulty(tags, data.title || '');
  
  // Create slug from title
  const slug = (data.title || 'untitled')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
  
  // Create new frontmatter
  const newFrontmatter = {
    title: data.title || 'Untitled Problem',
    difficulty: difficulty,
    topics: topics,
  };
  
  // Combine problem and solution for full content
  // Note: We don't include "## Problem" and "## Solution" headings here
  // because the template adds them. We just include the content.
  // Use a unique separator that won't conflict with markdown
  const fullContent = `${problemText}\n\n<!-- SOLUTION_SEPARATOR -->\n\n${solutionText}`;
  
  // Create new markdown content
  const newContent = `---\n${Object.entries(newFrontmatter)
    .map(([key, value]) => {
      if (Array.isArray(value)) {
        return `${key}:\n${value.map(v => `  - ${v}`).join('\n')}`;
      }
      return `${key}: ${value}`;
    })
    .join('\n')}\n---\n\n${fullContent}`;
  
  return {
    slug,
    content: newContent,
    originalLink,
  };
};

// Process all markdown files
const files = fs.readdirSync(oldSiteDir)
  .filter(file => file.endsWith('.markdown') || file.endsWith('.md'));

console.log(`Found ${files.length} files to convert...`);

let imported = 0;
let skipped = 0;

files.forEach((file) => {
  try {
    const oldFilePath = path.join(oldSiteDir, file);
    const { slug, content, originalLink } = convertProblem(oldFilePath);
    
    const newFilePath = path.join(newContentDir, `${slug}.md`);
    
    // Skip if file already exists
    if (fs.existsSync(newFilePath)) {
      console.log(`Skipping ${file} -> ${slug}.md (already exists)`);
      skipped++;
      return;
    }
    
    fs.writeFileSync(newFilePath, content, 'utf-8');
    console.log(`✓ Converted: ${file} -> ${slug}.md${originalLink ? ` (link: ${originalLink})` : ''}`);
    imported++;
  } catch (error) {
    console.error(`✗ Error converting ${file}:`, error.message);
  }
});

console.log(`\nImport complete!`);
console.log(`  - Imported: ${imported}`);
console.log(`  - Skipped: ${skipped}`);
console.log(`  - Total: ${files.length}`);

