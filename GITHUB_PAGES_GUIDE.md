# Complete GitHub Pages Deployment Guide

This is a comprehensive guide to deploy your personal website to GitHub Pages.

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Step 1: Create GitHub Repository](#step-1-create-github-repository)
3. [Step 2: Configure Your Project](#step-2-configure-your-project)
4. [Step 3: Initialize Git and Push](#step-3-initialize-git-and-push)
5. [Step 4: Enable GitHub Pages](#step-4-enable-github-pages)
6. [Step 5: Verify Deployment](#step-5-verify-deployment)
7. [Updating Your Site](#updating-your-site)
8. [Troubleshooting](#troubleshooting)
9. [Custom Domain Setup](#custom-domain-setup)

---

## Prerequisites

- ✅ GitHub account (free)
- ✅ Git installed on your computer
- ✅ Node.js and npm installed (for local development/testing)

---

## Step 1: Create GitHub Repository

1. **Go to GitHub**: https://github.com
2. **Sign in** to your account
3. **Click the "+" icon** in the top right corner
4. **Select "New repository"**

5. **Repository Settings**:
   - **Repository name**: `BigWeb` (or any name you prefer)
   - **Description**: "Personal website - Research engineer and competitive programmer"
   - **Visibility**: **Public** (required for free GitHub Pages)
   - ⚠️ **DO NOT** check:
     - ❌ Add a README file
     - ❌ Add .gitignore
     - ❌ Choose a license
   - (We already have these files)

6. **Click "Create repository"**

---

## Step 2: Configure Your Project

Before pushing, you need to update configuration files with your GitHub username and repository name.

### Option A: Use the Setup Script (Easiest)

```bash
./setup-github.sh
```

The script will ask for your GitHub username and repository name, then automatically update all configuration files.

### Option B: Manual Configuration

#### 2.1 Update `astro.config.mjs`

Find line 12 and update:

```javascript
// Change this:
site: 'https://yourusername.github.io',

// To this (replace YOUR_USERNAME):
site: 'https://TheAlphaJas.github.io',
```

#### 2.2 Update `.github/workflows/deploy.yml`

Find line 34 and update:

```yaml
# Change this:
BASE_PATH: /BigWeb

# To your repository name (if different):
BASE_PATH: /YourRepoName
```

#### 2.3 Update `package.json`

Find line 8 and update:

```json
// Change this:
"build": "BASE_PATH=/BigWeb astro build",

// To your repository name (if different):
"build": "BASE_PATH=/YourRepoName astro build",
```

**Important**: If your repository is named `BigWeb`, you don't need to change `BASE_PATH` - it's already correct!

---

## Step 3: Initialize Git and Push

Open terminal in your project directory and run:

```bash
# 1. Initialize git (if not already done)
git init

# 2. Add all files
git add .

# 3. Create initial commit
git commit -m "Initial commit: Personal website setup"

# 4. Rename branch to main (if needed)
git branch -M main

# 5. Add GitHub remote (replace YOUR_USERNAME and REPO_NAME)
git remote add origin https://github.com/YOUR_USERNAME/REPO_NAME.git

# Example:
# git remote add origin https://github.com/TheAlphaJas/BigWeb.git

# 6. Push to GitHub
git push -u origin main
```

**Replace**:
- `YOUR_USERNAME` with your GitHub username (e.g., `TheAlphaJas`)
- `REPO_NAME` with your repository name (e.g., `BigWeb`)

---

## Step 4: Enable GitHub Pages

1. **Go to your repository** on GitHub:
   ```
   https://github.com/YOUR_USERNAME/REPO_NAME
   ```

2. **Click "Settings"** tab (top navigation)

3. **Click "Pages"** in the left sidebar

4. **Under "Source"**:
   - Select **"GitHub Actions"** from the dropdown
   - (Don't select "Deploy from a branch")

5. **Save** - GitHub Pages is now enabled!

---

## Step 5: Verify Deployment

### 5.1 Check GitHub Actions

1. **Go to "Actions" tab** in your repository
2. You should see a workflow called **"Deploy to GitHub Pages"**
3. **Click on it** to see the build progress
4. Wait for it to complete (usually 1-2 minutes)
5. When you see a green checkmark ✅, the deployment succeeded!

### 5.2 Access Your Site

Your website will be live at:

```
https://YOUR_USERNAME.github.io/REPO_NAME/
```

**Example**: If your username is `TheAlphaJas` and repo is `BigWeb`:
```
https://TheAlphaJas.github.io/BigWeb/
```

### 5.3 First Time Access

- ⏱️ First deployment may take 2-3 minutes
- 🔄 Refresh the page if you see a 404
- ✅ Once deployed, changes appear within 1-2 minutes

---

## Updating Your Site

To update your website:

```bash
# 1. Make your changes to files
# ... edit files ...

# 2. Stage changes
git add .

# 3. Commit changes
git commit -m "Update: Description of changes"

# 4. Push to GitHub
git push origin main
```

**That's it!** GitHub Actions will automatically:
- Build your site
- Deploy to GitHub Pages
- Update your live website

**Deployment time**: Usually 1-2 minutes after push.

---

## Troubleshooting

### ❌ Site shows 404 or blank page

**Check these**:

1. **GitHub Actions Status**:
   - Go to **Actions** tab
   - Check if workflow completed successfully
   - Look for any error messages

2. **BASE_PATH Configuration**:
   - Verify `BASE_PATH` in `.github/workflows/deploy.yml` matches your repo name exactly
   - Verify `BASE_PATH` in `package.json` build script matches
   - Case-sensitive! `/BigWeb` ≠ `/bigweb`

3. **Site URL**:
   - Check `site` in `astro.config.mjs` matches: `https://YOUR_USERNAME.github.io`
   - No trailing slash!

4. **Repository Name**:
   - Ensure repository name matches `BASE_PATH` (without the leading `/`)

### ❌ Build fails in GitHub Actions

**Common causes**:

1. **Missing dependencies**:
   - Run `npm ci` locally to test
   - Check `package.json` is valid

2. **Syntax errors**:
   - Check Actions tab for specific error messages
   - Fix any TypeScript/JavaScript errors

3. **Missing files**:
   - Ensure all required files are committed
   - Check `.gitignore` isn't excluding needed files

### ❌ Assets not loading (CSS, images broken)

**Solutions**:

1. **Check BASE_PATH**:
   - All paths should be relative (Astro handles this)
   - Verify `base` in `astro.config.mjs` is correct

2. **Public directory**:
   - Assets must be in `public/` directory
   - Paths should start with `/` (e.g., `/photo.jpg`)

3. **Rebuild**:
   - Sometimes a rebuild fixes asset issues
   - Push an empty commit: `git commit --allow-empty -m "Rebuild" && git push`

### ❌ Local build works but GitHub Pages doesn't

**Check**:

1. **Environment variables**:
   - `BASE_PATH` must be set in GitHub Actions workflow
   - Check `.github/workflows/deploy.yml` line 34

2. **Build command**:
   - Verify `package.json` build script uses `BASE_PATH`
   - Test locally: `BASE_PATH=/BigWeb npm run build`

3. **Node version**:
   - GitHub Actions uses Node 20 (configured in workflow)
   - Should match your local version

---

## Custom Domain Setup

If you want to use a custom domain (e.g., `jasmer.dev`):

### 1. Update Configuration

**`astro.config.mjs`**:
```javascript
site: 'https://yourdomain.com',  // Your custom domain
base: '/',  // Change from '/BigWeb' to '/'
```

**`.github/workflows/deploy.yml`**:
```yaml
BASE_PATH: /  # Change from /BigWeb to /
```

**`package.json`**:
```json
"build": "BASE_PATH=/ astro build",
```

### 2. Add CNAME File

Create `public/CNAME` with your domain:
```
yourdomain.com
```

### 3. Configure DNS

With your domain provider, add:

**Type**: `CNAME`  
**Name**: `@` (or `www`)  
**Value**: `YOUR_USERNAME.github.io`

### 4. Update GitHub Pages Settings

1. Go to repository **Settings** → **Pages**
2. Under **Custom domain**, enter: `yourdomain.com`
3. Check **"Enforce HTTPS"**

### 5. Wait for DNS Propagation

- DNS changes can take 24-48 hours
- Check with: `nslookup yourdomain.com`
- Once DNS propagates, GitHub will verify and enable HTTPS

---

## Quick Reference

| Item | Value |
|------|-------|
| **Repository URL** | `https://github.com/YOUR_USERNAME/BigWeb` |
| **Live Site URL** | `https://YOUR_USERNAME.github.io/BigWeb/` |
| **Actions Tab** | `https://github.com/YOUR_USERNAME/BigWeb/actions` |
| **Pages Settings** | `https://github.com/YOUR_USERNAME/BigWeb/settings/pages` |
| **Build Command** | `npm run build` (uses `BASE_PATH=/BigWeb`) |
| **Local Dev** | `npm run dev` (uses `BASE_PATH=/`) |

---

## Important Notes

- ✅ **Automatic deployment**: Every push to `main` triggers a rebuild
- ✅ **No manual steps**: After initial setup, just push code
- ✅ **Free hosting**: GitHub Pages is free for public repositories
- ✅ **HTTPS included**: All sites get free SSL certificates
- ❌ **Don't commit `dist/`**: It's auto-generated, already in `.gitignore`
- ❌ **Don't use `gh-pages` branch**: We use GitHub Actions instead

---

## Need Help?

1. **Check GitHub Actions logs**: Go to Actions tab → Click on failed workflow → Check error messages
2. **Test locally**: Run `BASE_PATH=/BigWeb npm run build` to match production
3. **Verify configuration**: Double-check all `BASE_PATH` values match your repo name
4. **Astro Docs**: https://docs.astro.build/en/guides/deploy/github/

---

## Summary Checklist

Before pushing, ensure:

- [ ] GitHub repository created (Public)
- [ ] `astro.config.mjs` - `site` updated with your username
- [ ] `.github/workflows/deploy.yml` - `BASE_PATH` matches repo name
- [ ] `package.json` - build script `BASE_PATH` matches repo name
- [ ] Git initialized and remote added
- [ ] All files committed
- [ ] GitHub Pages enabled (Settings → Pages → GitHub Actions)
- [ ] First deployment completed (check Actions tab)

**Once all checked, your site is live! 🎉**

