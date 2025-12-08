# Import and Sync Scripts

This directory contains scripts for importing and syncing competitive programming solutions from GitHub repositories to the website.

## Available Scripts

### 1. `sync-usaco.js` - Sync USACO Solutions

Syncs solutions from the USACO-Sols repository to the website.

**Usage:**
```bash
# Sync new solutions only (skips existing)
node scripts/sync-usaco.js

# Re-import all solutions (overwrite existing)
node scripts/sync-usaco.js --force

# Use custom repository path
node scripts/sync-usaco.js --repo-path=/path/to/usaco-sols
```

**Features:**
- Only imports new solutions by default (skips existing)
- Extracts division (Bronze/Silver/Gold/Platinum) from folder structure
- Extracts topic from folder path
- Generates proper frontmatter for website

**Before running:**
1. Clone the USACO-Sols repository:
   ```bash
   git clone https://github.com/TheAlphaJas/USACO-Sols.git /tmp/usaco-sols
   ```
   Or update the repository if it already exists:
   ```bash
   cd /tmp/usaco-sols && git pull
   ```

### 2. `sync-cses.js` - Sync CSES Solutions

Syncs solutions from the cses-sols repository to the website.

**Usage:**
```bash
# Sync new solutions only (skips existing)
node scripts/sync-cses.js

# Re-import all solutions (overwrite existing)
node scripts/sync-cses.js --force

# Use custom repository path
node scripts/sync-cses.js --repo-path=/path/to/cses-sols
```

**Features:**
- Only imports new solutions by default (skips existing)
- Extracts topic from folder structure (Dynamic Programming, Graphs, Range Queries, Sorting and Searching)
- Automatically determines difficulty based on topic
- Generates proper frontmatter with topic tags

**Before running:**
1. Clone the cses-sols repository:
   ```bash
   git clone https://github.com/TheAlphaJas/cses-sols.git /tmp/cses-sols
   ```
   Or update the repository if it already exists:
   ```bash
   cd /tmp/cses-sols && git pull
   ```

## Workflow for Adding New Solutions

### Step 1: Update Your Repositories

Add new solutions to your GitHub repositories:
- [USACO-Sols](https://github.com/TheAlphaJas/USACO-Sols)
- [cses-sols](https://github.com/TheAlphaJas/cses-sols)

### Step 2: Pull Latest Changes

```bash
# For USACO
cd /tmp/usaco-sols && git pull

# For CSES
cd /tmp/cses-sols && git pull
```

### Step 3: Sync to Website

```bash
# Sync USACO solutions
node scripts/sync-usaco.js

# Sync CSES solutions
node scripts/sync-cses.js
```

The scripts will:
- ✅ Import only new solutions (existing ones are skipped)
- ✅ Generate proper markdown files with frontmatter
- ✅ Extract metadata (division, topic, difficulty)
- ✅ Show summary of imported/updated/skipped solutions

### Step 4: Build and Deploy

```bash
npm run build
git add content/usaco/ content/cses/
git commit -m "Add new USACO/CSES solutions"
git push
```

## One-Time Setup Scripts

These scripts are for initial import only:

- `import-usaco-solutions.js` - Initial import of all USACO solutions
- `import-cses-solutions.js` - Initial import of all CSES solutions

**Note:** Use `sync-*.js` scripts for regular updates instead.

## Troubleshooting

### Repository Not Found

If you get an error about repository path not existing:

1. Clone the repository:
   ```bash
   git clone https://github.com/TheAlphaJas/USACO-Sols.git /tmp/usaco-sols
   ```

2. Or specify a custom path:
   ```bash
   node scripts/sync-usaco.js --repo-path=/path/to/usaco-sols
   ```

### Force Re-import

If you need to re-import all solutions (e.g., after changing the import script):

```bash
node scripts/sync-usaco.js --force
node scripts/sync-cses.js --force
```

### Check What Will Be Imported

The scripts show a summary at the end:
- **Imported:** New solutions added
- **Updated:** Existing solutions overwritten (only with --force)
- **Skipped:** Existing solutions not changed (default behavior)

## File Structure

Solutions are imported to:
- `content/usaco/*.md` - USACO solutions
- `content/cses/*.md` - CSES solutions

Each markdown file contains:
- Frontmatter with metadata (problem name, difficulty, topic, etc.)
- Solution code in a code block

## Notes

- Solutions are organized by topic/division based on folder structure in the source repository
- Topic tags are automatically extracted and added to frontmatter
- The scripts preserve existing solutions unless `--force` is used
- All solutions link back to the original GitHub repositories

