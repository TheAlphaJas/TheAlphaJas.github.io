# GitHub Pages Deployment Guide

Complete step-by-step instructions for deploying this website to GitHub Pages.

## Prerequisites

- A GitHub account
- Git installed on your local machine
- Node.js and npm installed (for local development)

## Step 1: Create GitHub Repository

1. Go to [GitHub](https://github.com) and sign in
2. Click the **"+"** icon in the top right corner
3. Select **"New repository"**
4. Repository settings:
   - **Repository name**: `BigWeb` (or your preferred name)
   - **Description**: "Personal website - Research engineer and competitive programmer"
   - **Visibility**: Public (required for free GitHub Pages)
   - **DO NOT** initialize with README, .gitignore, or license (we already have these)
5. Click **"Create repository"**

## Step 2: Initialize Git and Push to GitHub

Open terminal in the project directory and run:

```bash
# Initialize git repository (if not already initialized)
git init

# Add all files
git add .

# Create initial commit
git commit -m "Initial commit: Personal website setup"

# Add GitHub remote (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/BigWeb.git

# Rename branch to main (if needed)
git branch -M main

# Push to GitHub
git push -u origin main
```

**Important**: Replace `YOUR_USERNAME` with your actual GitHub username (e.g., `TheAlphaJas`).

## Step 3: Update Configuration Files

### Update `astro.config.mjs`

The site URL should match your repository. If your repository is `BigWeb` under username `TheAlphaJas`:

```javascript
site: 'https://TheAlphaJas.github.io',
base: basePath, // This will be '/BigWeb' in production
```

If your repository name is different, update both:
- The `site` URL: `https://YOUR_USERNAME.github.io`
- The `BASE_PATH` in `.github/workflows/deploy.yml` and `package.json` build script

### Update `.github/workflows/deploy.yml` (if needed)

The workflow is already configured, but verify:
- `BASE_PATH: /BigWeb` matches your repository name
- If your repo is named differently, change `/BigWeb` to `/{YOUR_REPO_NAME}`

### Update `package.json` build script (if needed)

```json
"build": "BASE_PATH=/BigWeb astro build",
```

Change `/BigWeb` to match your repository name.

## Step 4: Enable GitHub Pages

1. Go to your repository on GitHub
2. Click **"Settings"** tab
3. Scroll down to **"Pages"** in the left sidebar
4. Under **"Source"**, select:
   - **Source**: `GitHub Actions`
5. The page will automatically deploy when you push to the `main` branch

## Step 5: Verify Deployment

1. After pushing to GitHub, go to **"Actions"** tab in your repository
2. You should see a workflow run called **"Deploy to GitHub Pages"**
3. Wait for it to complete (usually 1-2 minutes)
4. Once complete, go to **"Settings" → "Pages"**
5. Your site will be available at: `https://YOUR_USERNAME.github.io/BigWeb/`

## Step 6: Custom Domain (Optional)

If you want to use a custom domain:

1. Go to **"Settings" → "Pages"**
2. Under **"Custom domain"**, enter your domain (e.g., `jasmer.dev`)
3. Add a `CNAME` file in the `public/` directory with your domain name
4. Update DNS records with your domain provider:
   - Type: `CNAME`
   - Name: `@` or `www`
   - Value: `YOUR_USERNAME.github.io`
5. Update `astro.config.mjs`:
   ```javascript
   site: 'https://yourdomain.com',
   base: '/', // Change base to '/' for custom domain
   ```
6. Update `.github/workflows/deploy.yml`:
   ```yaml
   BASE_PATH: /
   ```

## Step 7: Future Updates

To update your website:

```bash
# Make your changes
# ... edit files ...

# Stage changes
git add .

# Commit changes
git commit -m "Description of changes"

# Push to GitHub
git push origin main
```

GitHub Actions will automatically rebuild and deploy your site within 1-2 minutes.

## Troubleshooting

### Site shows 404 or blank page

1. Check that GitHub Actions workflow completed successfully
2. Verify the `BASE_PATH` matches your repository name exactly
3. Check that `site` URL in `astro.config.mjs` is correct
4. Ensure all paths use relative URLs (they should with Astro)

### Assets not loading (CSS, images, etc.)

1. Verify `base` path in `astro.config.mjs` is set correctly
2. Check that assets are in the `public/` directory
3. Ensure GitHub Actions build completed successfully

### Build fails in GitHub Actions

1. Check the **"Actions"** tab for error messages
2. Common issues:
   - Missing dependencies (run `npm ci` locally to test)
   - Syntax errors in code
   - Missing environment variables (if any)

### Local build works but GitHub Pages doesn't

1. Ensure `BASE_PATH` environment variable is set in the workflow
2. Check that `package.json` build script uses the correct `BASE_PATH`
3. Verify `astro.config.mjs` uses `process.env.BASE_PATH`

## Repository Structure for GitHub Pages

Your repository should have:
```
BigWeb/
├── .github/
│   └── workflows/
│       └── deploy.yml          # GitHub Actions workflow
├── public/                      # Static assets (images, PDFs, etc.)
│   ├── resume.pdf
│   ├── photo.jpg (optional)
│   └── gallery/ (optional)
├── content/                     # Markdown content
│   ├── projects/
│   ├── experience/
│   ├── usaco/
│   ├── cses/
│   └── probability/
├── src/                         # Source code
├── astro.config.mjs            # Astro configuration
├── package.json                 # Dependencies
└── README.md                    # This file
```

## Quick Reference

**Repository URL**: `https://github.com/YOUR_USERNAME/BigWeb`  
**Live Site URL**: `https://YOUR_USERNAME.github.io/BigWeb/`  
**Actions Tab**: `https://github.com/YOUR_USERNAME/BigWeb/actions`  
**Pages Settings**: `https://github.com/YOUR_USERNAME/BigWeb/settings/pages`

## Notes

- The site builds automatically on every push to `main` branch
- Builds typically take 1-2 minutes
- The site is served from the `dist/` directory (generated during build)
- Never commit the `dist/` directory - it's generated automatically
- Add `dist/` to `.gitignore` if it's not already there

## Support

If you encounter issues:
1. Check GitHub Actions logs in the "Actions" tab
2. Verify all configuration files match your repository name
3. Test local build with: `npm run build` (should match production)
4. Check Astro documentation: https://docs.astro.build/en/guides/deploy/github/

