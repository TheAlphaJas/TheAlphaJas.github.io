# GitHub Pages Deployment for username.github.io

**This guide is for deploying to `TheAlphaJas.github.io` (root domain).**

When your repository is named `username.github.io`, your site is served from the root domain (`https://TheAlphaJas.github.io/`) instead of a subpath.

## Quick Setup

### 1. Create Repository

**Repository name MUST be**: `TheAlphaJas.github.io` (exactly your username + `.github.io`)

1. Go to https://github.com/new
2. Repository name: `TheAlphaJas.github.io`
3. Make it **Public**
4. **Don't** initialize with README
5. Click "Create repository"

### 2. Push Your Code

```bash
# Initialize git (if not already done)
git init
git add .
git commit -m "Initial commit: Personal website setup"
git branch -M main
git remote add origin https://github.com/TheAlphaJas/TheAlphaJas.github.io.git
git push -u origin main
```

### 3. Enable GitHub Pages

1. Go to: `https://github.com/TheAlphaJas/TheAlphaJas.github.io/settings/pages`
2. Under **"Source"**, select **"GitHub Actions"**
3. Done! Wait 1-2 minutes

### 4. Your Site Will Be Live At

**`https://TheAlphaJas.github.io/`** (root domain, no subpath!)

---

## Configuration

The configuration is already set up for `username.github.io`:

- ✅ `astro.config.mjs`: `site: 'https://TheAlphaJas.github.io'`
- ✅ `astro.config.mjs`: `base: '/'` (root path)
- ✅ `.github/workflows/deploy.yml`: `BASE_PATH: /`
- ✅ `package.json`: `"build": "BASE_PATH=/ astro build"`

**No changes needed!** The configuration is ready for `TheAlphaJas.github.io`.

---

## Important Notes

### Repository Name

- **MUST be exactly**: `TheAlphaJas.github.io`
- Case-sensitive: `TheAlphaJas.github.io` ≠ `thealphajas.github.io`
- This special name makes GitHub serve from root domain

### Base Path

- For `username.github.io` repos, base path is `/` (root)
- All URLs will be: `https://TheAlphaJas.github.io/...`
- No subpath like `/BigWeb/`

### Local Development

- Local dev uses `BASE_PATH=/` by default
- Run: `npm run dev`
- Visit: `http://localhost:4321/`

### Production Build

- Production build uses `BASE_PATH=/`
- Run: `npm run build` (sets `BASE_PATH=/`)
- Or: `BASE_PATH=/ npm run build`

---

## Updating Your Site

```bash
git add .
git commit -m "Update website"
git push origin main
```

Auto-deploys in 1-2 minutes to `https://TheAlphaJas.github.io/`

---

## Troubleshooting

### 404 Error

- Check repository name is exactly `TheAlphaJas.github.io`
- Verify GitHub Actions workflow completed
- Check `BASE_PATH` is `/` in all config files

### Assets Not Loading

- Ensure `base: '/'` in `astro.config.mjs`
- All asset paths should be relative (Astro handles this)

### Build Fails

- Check Actions tab for error messages
- Verify `BASE_PATH=/` in workflow and package.json

---

## Summary

- **Repository**: `TheAlphaJas.github.io`
- **Live URL**: `https://TheAlphaJas.github.io/`
- **Base Path**: `/` (root)
- **Configuration**: Already set up correctly!

Just create the repo, push, and enable GitHub Pages! 🚀

