# Research Engineer Personal Website

A production-ready, minimal, multi-page personal website for a research engineer and competitive programmer. Built with Astro, Tailwind CSS, and optimized for GitHub Pages hosting.

## Features

- ✅ **Multi-page routing** (not single-page)
- ✅ **Markdown-based content** for projects, experience, probability problems, and USACO entries
- ✅ **Dark mode toggle**
- ✅ **Math rendering** (KaTeX)
- ✅ **Syntax highlighting** (Shiki/Prism)
- ✅ **Interactive map** for aviation corner (Leaflet.js)
- ✅ **SEO optimized** with sitemap and OpenGraph metadata
- ✅ **Mobile-first design**
- ✅ **Fast and minimal** - no animations, no fluff

## Site Structure

- `/` - Home page
- `/about` - About page
- `/projects` - Projects listing with tag filtering
- `/projects/[slug]` - Individual project pages
- `/experience` - Experience timeline
- `/fun` - Fun stuff index
- `/fun/probability` - Probability problems with solutions
- `/fun/probability/[slug]` - Individual problem pages
- `/fun/usaco` - USACO/competitive programming entries
- `/fun/usaco/[slug]` - Individual USACO problem pages
- `/fun/aviation` - Airlines, airports, and interactive map
- `/contact` - Contact information

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or pnpm

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Visit `http://localhost:4321` to see your site.

### Build

```bash
npm run build
```

The built site will be in the `dist/` directory.

## Adding Content

### Adding Projects

1. Create a new Markdown file in `content/projects/` (e.g., `project-003.md`)
2. Use the following frontmatter structure:

```yaml
---
title: "Project Name"
objective: "One-line objective"
techStack:
  - Python
  - PyTorch
  - Docker
github: "https://github.com/username/repo"
paper: "https://arxiv.org/abs/xxxx.xxxxx"  # Optional
results: "Achieved X% improvement..."
keyIdeas:
  - "Key idea 1"
  - "Key idea 2"
tags:
  - ML
  - RL
  - Systems
date: "2024-01-15"
---

Your project content here in Markdown...
```

3. The project will automatically appear on the `/projects` page

### Adding Probability Problems

1. Create a new Markdown file in `content/probability/` (e.g., `problem-002.md`)
2. Use the following structure:

```yaml
---
title: "Problem Title"
difficulty: "Medium"  # Easy, Medium, or Hard
topics:
  - Markov Chains
  - Information Theory
---

## Problem

Your problem statement here. LaTeX math is supported:
$$P(X = k) = \binom{n}{k} p^k (1-p)^{n-k}$$

## Solution

Your solution here with detailed explanations...
```

**Important**: Both the problem and solution should be in the same file, separated by a `## Solution` heading.

### Adding USACO Entries

1. Create a new Markdown file in `content/usaco/` (e.g., `usaco-002.md`)
2. Use the following structure:

```yaml
---
problemName: "Problem Name"
contest: "USACO 2024 January Contest, Gold"
difficulty: "Gold"  # Bronze, Silver, Gold, or Platinum
keyIdea: "Brief description of the key algorithmic insight"
language: "C++"  # or Python
codeSnippet: |
  #include <bits/stdc++.h>
  // Your code here
---

Additional notes and explanation...
```

### Adding Airlines and Airports

#### Airlines

Edit `content/aviation/airlines.json`:

```json
[
  {
    "name": "Airline Name",
    "logo": "/airlines/logo.png",
    "country": "Country",
    "flights": 10
  }
]
```

Then add the logo image to `public/airlines/logo.png`.

#### Airports

Edit `content/aviation/airports.json`:

```json
[
  {
    "code": "JFK",
    "name": "John F. Kennedy International Airport",
    "city": "New York",
    "country": "United States",
    "lat": 40.6413,
    "lon": -73.7781
  }
]
```

The `lat` and `lon` fields are required for the airport to appear on the map.

### Adding Experience

1. Create a new Markdown file in `content/experience/` (e.g., `exp-002.md`)
2. Use the following structure:

```yaml
---
organization: "Company Name"
role: "Position Title"
duration: "June 2023 – August 2023"
domain: "Machine Learning / Systems"
achievements:
  - "Achievement 1"
  - "Achievement 2"
techStack:
  - Python
  - PyTorch
  - Kubernetes
---

Additional description...
```

## Deployment to GitHub Pages

**📖 For complete deployment instructions, see [DEPLOYMENT.md](./DEPLOYMENT.md)**  
**⚡ For quick setup, see [QUICK_DEPLOY.md](./QUICK_DEPLOY.md)**

### Quick Start

1. **Create GitHub Repository**
   - Go to https://github.com/new
   - Name: `BigWeb` (or your choice)
   - Make it **Public**
   - **Don't** initialize with README

2. **Update Configuration**
   - Update `astro.config.mjs` line 12: Change `site` to `https://YOUR_USERNAME.github.io`
   - If repo name is not `BigWeb`, update `BASE_PATH` in `.github/workflows/deploy.yml` and `package.json`

3. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/BigWeb.git
   git push -u origin main
   ```

4. **Enable GitHub Pages**
   - Go to repository **Settings** → **Pages**
   - Under **Source**, select **"GitHub Actions"**
   - Wait 1-2 minutes for deployment

5. **Your site will be live at**: `https://YOUR_USERNAME.github.io/BigWeb/`

### Automatic Deployment

The repository includes a GitHub Actions workflow that automatically deploys on every push to `main`. No manual steps needed after initial setup!

## Configuration

### Site Information

Update the following files with your information:

- `src/pages/index.astro` - Home page content
- `src/pages/about.astro` - About page content
- `src/pages/contact.astro` - Contact links
- `src/components/Footer.astro` - GitHub repository link
- `src/components/Navbar.astro` - Site title

### SEO

SEO metadata is automatically generated from page titles and descriptions. The sitemap is generated automatically by Astro's sitemap integration.

## Performance

This site is optimized for:
- **Lighthouse Performance ≥ 95**
- **Accessibility ≥ 95**
- **SEO ≥ 95**

All pages are statically generated at build time for maximum performance.

## Tech Stack

- **Framework**: Astro 4.x
- **Styling**: Tailwind CSS 3.x
- **Math Rendering**: KaTeX
- **Syntax Highlighting**: Shiki (via Astro MDX)
- **Maps**: Leaflet.js
- **Content**: Markdown files
- **Deployment**: GitHub Pages

## License

MIT

