#!/bin/bash

# GitHub Pages Setup Script for username.github.io
# This script helps you set up your repository for GitHub Pages deployment

echo "🚀 GitHub Pages Setup Script for username.github.io"
echo "==================================================="
echo ""

# Check if git is initialized
if [ ! -d ".git" ]; then
    echo "📦 Initializing git repository..."
    git init
    echo "✅ Git repository initialized"
else
    echo "✅ Git repository already exists"
fi

# Get GitHub username
read -p "Enter your GitHub username: " GITHUB_USERNAME

# For username.github.io, repo name is fixed
REPO_NAME="${GITHUB_USERNAME}.github.io"

echo ""
echo "📝 Updating configuration files for ${REPO_NAME}..."

# Update astro.config.mjs
if [ -f "astro.config.mjs" ]; then
    sed -i "s|site: 'https://.*github.io'|site: 'https://${GITHUB_USERNAME}.github.io'|" astro.config.mjs
    echo "✅ Updated astro.config.mjs (site: https://${GITHUB_USERNAME}.github.io)"
fi

# Update .github/workflows/deploy.yml - set BASE_PATH to /
if [ -f ".github/workflows/deploy.yml" ]; then
    sed -i "s|BASE_PATH: /.*|BASE_PATH: /|" .github/workflows/deploy.yml
    echo "✅ Updated .github/workflows/deploy.yml (BASE_PATH: /)"
fi

# Update package.json - set BASE_PATH to /
if [ -f "package.json" ]; then
    sed -i "s|\"build\": \"BASE_PATH=/.* astro build\"|\"build\": \"BASE_PATH=/ astro build\"|" package.json
    echo "✅ Updated package.json (BASE_PATH: /)"
fi

echo ""
echo "📋 Next Steps:"
echo "=============="
echo ""
echo "1. Create a new repository on GitHub:"
echo "   https://github.com/new"
echo "   Name: ${REPO_NAME} (MUST be exactly this!)"
echo "   Make it Public"
echo "   Don't initialize with README"
echo ""
echo "2. Run these commands:"
echo "   git add ."
echo "   git commit -m 'Initial commit: Personal website setup'"
echo "   git branch -M main"
echo "   git remote add origin https://github.com/${GITHUB_USERNAME}/${REPO_NAME}.git"
echo "   git push -u origin main"
echo ""
echo "3. Enable GitHub Pages:"
echo "   - Go to: https://github.com/${GITHUB_USERNAME}/${REPO_NAME}/settings/pages"
echo "   - Under 'Source', select 'GitHub Actions'"
echo "   - Wait 1-2 minutes for deployment"
echo ""
echo "4. Your site will be live at:"
echo "   https://${GITHUB_USERNAME}.github.io/ (root domain!)"
echo ""
echo "✅ Configuration updated! Follow the steps above to deploy."

