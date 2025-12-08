# Quick GitHub Pages Deployment

**For `TheAlphaJas.github.io` (root domain deployment)**

## TL;DR - Fast Setup

### 1. Create GitHub Repository
- Go to https://github.com/new
- **Name MUST be**: `TheAlphaJas.github.io` (exactly your username + `.github.io`)
- Make it **Public**
- **Don't** initialize with README
- Click "Create repository"

### 2. Push Your Code

```bash
# In your project directory
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/TheAlphaJas/TheAlphaJas.github.io.git
git push -u origin main
```

### 3. Enable GitHub Pages

1. Go to your repo: `https://github.com/TheAlphaJas/TheAlphaJas.github.io`
2. Click **Settings** → **Pages**
3. Under **Source**, select **"GitHub Actions"**
4. Done! Wait 1-2 minutes for first deployment

### 4. Your Site Will Be Live At

**`https://TheAlphaJas.github.io/`** (root domain!)

---

## Configuration Status

✅ **Already configured!** The project is set up for `TheAlphaJas.github.io`:

- ✅ `astro.config.mjs`: `site: 'https://TheAlphaJas.github.io'`
- ✅ `astro.config.mjs`: `base: '/'` (root path)
- ✅ `.github/workflows/deploy.yml`: `BASE_PATH: /`
- ✅ `package.json`: `"build": "BASE_PATH=/ astro build"`

**No changes needed!** Just create the repo and push.

---

## After First Push

1. Go to **Actions** tab in your GitHub repo
2. Watch the workflow run (takes 1-2 minutes)
3. When it says "Deploy to GitHub Pages" is complete, your site is live!
4. Visit: `https://YOUR_USERNAME.github.io/BigWeb/`

---

## Future Updates

Just push to main branch:
```bash
git add .
git commit -m "Update website"
git push
```

Auto-deploys in 1-2 minutes!

---

## Troubleshooting

**404 Error?**
- Check Actions tab - did build succeed?
- Verify `BASE_PATH` matches your repo name exactly
- Check `site` URL in `astro.config.mjs`

**Build Fails?**
- Check Actions tab for error messages
- Run `npm ci` locally to test dependencies
- Check for syntax errors

**Need Help?**
- See `DEPLOYMENT.md` for detailed instructions
- Check GitHub Actions logs in the Actions tab

