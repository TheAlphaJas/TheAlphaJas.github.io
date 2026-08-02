import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export interface Project {
  slug: string;
  title: string;
  objective: string;
  techStack: string[];
  github?: string;
  paper?: string;
  results?: string;
  keyIdeas: string[];
  tags: string[];
  content: string;
  date?: string;
}

export interface Experience {
  slug: string;
  organization: string;
  role: string;
  location?: string;
  duration: string;
  domain: string;
  achievements: string[];
  techStack: string[];
  content: string;
  order: number;
}

export interface Publication {
  slug: string;
  title: string;
  titlePending: boolean;
  authors: string[];
  venue: string;
  year: number;
  date?: string;
  doi?: string;
  url?: string;
  code?: string;
  status: string;
  note?: string;
}

export interface ProbabilityProblem {
  slug: string;
  title: string;
  topics: string[];
  problem: string;
  solution: string;
  content: string;
}

export interface USACOEntry {
  slug: string;
  problemName: string;
  contest: string;
  difficulty: string;
  keyIdea: string;
  codeSnippet?: string;
  language: string;
  content: string;
}

export interface CSESEntry {
  slug: string;
  problemName: string;
  problemNumber?: string;
  difficulty: string;
  topic?: string;
  topics?: string[];
  keyIdea: string;
  codeSnippet?: string;
  language: string;
  content: string;
}

export function getProjects(): Project[] {
  const projectsDir = path.join(process.cwd(), 'content', 'projects');
  if (!fs.existsSync(projectsDir)) return [];
  
  const files = fs.readdirSync(projectsDir);
  return files
    .filter((file) => file.endsWith('.md'))
    .map((file) => {
      const filePath = path.join(projectsDir, file);
      const fileContents = fs.readFileSync(filePath, 'utf-8');
      const { data, content } = matter(fileContents);
      
      return {
        slug: file.replace('.md', ''),
        title: data.title || '',
        objective: data.objective || '',
        techStack: Array.isArray(data.techStack) ? data.techStack : [],
        github: data.github,
        paper: data.paper,
        results: data.results,
        keyIdeas: Array.isArray(data.keyIdeas) ? data.keyIdeas : [],
        tags: Array.isArray(data.tags) ? data.tags : [],
        content,
        date: data.date,
      };
    })
    .sort((a, b) => {
      if (a.date && b.date) {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      }
      return 0;
    });
}

export function getProject(slug: string): Project | null {
  const projects = getProjects();
  return projects.find((p) => p.slug === slug) || null;
}

export function getExperiences(): Experience[] {
  const expDir = path.join(process.cwd(), 'content', 'experience');
  if (!fs.existsSync(expDir)) return [];
  
  const files = fs.readdirSync(expDir);
  return files
    .filter((file) => file.endsWith('.md'))
    .map((file) => {
      const filePath = path.join(expDir, file);
      const fileContents = fs.readFileSync(filePath, 'utf-8');
      const { data, content } = matter(fileContents);
      
      return {
        slug: file.replace('.md', ''),
        organization: data.organization || '',
        role: data.role || '',
        location: data.location,
        duration: data.duration || '',
        domain: data.domain || '',
        achievements: Array.isArray(data.achievements) ? data.achievements : [],
        techStack: Array.isArray(data.techStack) ? data.techStack : [],
        content,
        order: typeof data.order === 'number' ? data.order : 999,
      };
    })
    // `order` is explicit in frontmatter: overlapping and open-ended roles
    // ("May 2024 – Present") can't be ordered reliably from the dates alone.
    .sort((a, b) => a.order - b.order || a.slug.localeCompare(b.slug));
}

export function getPublications(): Publication[] {
  const pubDir = path.join(process.cwd(), 'content', 'publications');
  if (!fs.existsSync(pubDir)) return [];

  const files = fs.readdirSync(pubDir);
  return files
    .filter((file) => file.endsWith('.md'))
    .map((file) => {
      const filePath = path.join(pubDir, file);
      const { data } = matter(fs.readFileSync(filePath, 'utf-8'));

      return {
        slug: file.replace('.md', ''),
        title: data.title || '',
        titlePending: data.titlePending === true,
        authors: Array.isArray(data.authors) ? data.authors : [],
        venue: data.venue || '',
        year: Number(data.year) || 0,
        date: data.date,
        doi: data.doi,
        url: data.url,
        code: data.code,
        status: data.status || 'published',
        note: data.note,
      };
    })
    .sort((a, b) => b.year - a.year || (b.date || '').localeCompare(a.date || ''));
}

export function getProbabilityProblems(): ProbabilityProblem[] {
  const probDir = path.join(process.cwd(), 'content', 'probability');
  if (!fs.existsSync(probDir)) return [];
  
  const files = fs.readdirSync(probDir);
  return files
    .filter((file) => file.endsWith('.md'))
    .map((file) => {
      const filePath = path.join(probDir, file);
      const fileContents = fs.readFileSync(filePath, 'utf-8');
      const { data, content } = matter(fileContents);
      
      // Split content into problem and solution
      // Try multiple separator patterns
      let problemSection = content;
      let solutionSection = '';
      
      // First, try the custom separator from import script
      if (content.includes('<!-- SOLUTION_SEPARATOR -->')) {
        const parts = content.split('<!-- SOLUTION_SEPARATOR -->');
        problemSection = parts[0] || content;
        solutionSection = parts.slice(1).join('<!-- SOLUTION_SEPARATOR -->').trim();
      }
      // Then try "---" separator (but be careful with frontmatter)
      else if (content.includes('\n---\n') && !content.startsWith('---')) {
        const parts = content.split('\n---\n');
        // If there are multiple "---", use the first one as separator
        // But skip if it's right after the problem (likely the original link separator)
        if (parts.length >= 2) {
          // Check if the first part ends with original link - if so, include it in problem
          const firstPart = parts[0];
          const secondPart = parts[1];
          if (firstPart.includes('Original Problem Link') || firstPart.trim().endsWith('---')) {
            // The "---" after original link is just a separator, solution starts after next "---"
            if (parts.length >= 3) {
              problemSection = parts.slice(0, 2).join('\n---\n');
              solutionSection = parts.slice(2).join('\n---\n').trim();
            } else {
              problemSection = firstPart;
              solutionSection = secondPart;
            }
          } else {
            problemSection = firstPart;
            solutionSection = parts.slice(1).join('\n---\n').trim();
          }
        }
      }
      // Fallback: try splitting by "## Solution"
      else if (content.includes('## Solution')) {
        problemSection = content.split(/##\s*Solution/i)[0] || content;
        solutionSection = content.split(/##\s*Solution/i)[1] || '';
      }
      
      // Remove heading markers from problem section
      problemSection = problemSection
        .replace(/^##\s*Problem\s*/i, '')
        .replace(/^##\s*Problem Statement\s*/i, '')
        .trim();
      
      // Remove heading markers from solution section
      solutionSection = solutionSection
        .replace(/^##\s*Solution\s*/i, '')
        .trim();
      
      return {
        slug: file.replace('.md', ''),
        title: data.title || '',
        topics: Array.isArray(data.topics) ? data.topics : [],
        problem: problemSection.trim(),
        solution: solutionSection.trim(),
        content,
      };
    })
    .sort((a, b) => {
      // Sort by problem number if available
      const aNum = parseInt(a.slug.match(/\d+/)?.[0] || '0');
      const bNum = parseInt(b.slug.match(/\d+/)?.[0] || '0');
      return aNum - bNum;
    });
}

export function getProbabilityProblem(slug: string): ProbabilityProblem | null {
  const problems = getProbabilityProblems();
  return problems.find((p) => p.slug === slug) || null;
}

export function getUSACOEntries(): USACOEntry[] {
  const usacoDir = path.join(process.cwd(), 'content', 'usaco');
  if (!fs.existsSync(usacoDir)) return [];
  
  const files = fs.readdirSync(usacoDir);
  return files
    .filter((file) => file.endsWith('.md'))
    .map((file) => {
      const filePath = path.join(usacoDir, file);
      const fileContents = fs.readFileSync(filePath, 'utf-8');
      const { data, content } = matter(fileContents);
      
      return {
        slug: file.replace('.md', ''),
        problemName: data.problemName || '',
        contest: data.contest || '',
        difficulty: data.difficulty || '',
        keyIdea: data.keyIdea || '',
        codeSnippet: data.codeSnippet,
        language: data.language || 'C++',
        content,
      };
    })
    .sort((a, b) => {
      // Sort by difficulty level
      const levels = ['Bronze', 'Silver', 'Gold', 'Platinum'];
      const aLevel = levels.indexOf(a.difficulty) || 0;
      const bLevel = levels.indexOf(b.difficulty) || 0;
      if (aLevel !== bLevel) return bLevel - aLevel;
      return a.problemName.localeCompare(b.problemName);
    });
}

export function getUSACOEntry(slug: string): USACOEntry | null {
  const entries = getUSACOEntries();
  return entries.find((e) => e.slug === slug) || null;
}

export function getCSESEntries(): CSESEntry[] {
  const csesDir = path.join(process.cwd(), 'content', 'cses');
  if (!fs.existsSync(csesDir)) return [];
  
  const files = fs.readdirSync(csesDir);
  return files
    .filter((file) => file.endsWith('.md'))
    .map((file) => {
      const filePath = path.join(csesDir, file);
      const fileContents = fs.readFileSync(filePath, 'utf-8');
      const { data, content } = matter(fileContents);
      
      return {
        slug: file.replace('.md', ''),
        problemName: data.problemName || '',
        problemNumber: data.problemNumber,
        difficulty: data.difficulty || '',
        topic: data.topic || '',
        topics: Array.isArray(data.topics) ? data.topics : (data.topic ? [data.topic] : []),
        keyIdea: data.keyIdea || '',
        codeSnippet: data.codeSnippet,
        language: data.language || 'C++',
        content,
      };
    })
    .sort((a, b) => {
      // Sort by problem number if available
      if (a.problemNumber && b.problemNumber) {
        return a.problemNumber.localeCompare(b.problemNumber);
      }
      return a.problemName.localeCompare(b.problemName);
    });
}

export function getCSESEntry(slug: string): CSESEntry | null {
  const entries = getCSESEntries();
  return entries.find((e) => e.slug === slug) || null;
}

