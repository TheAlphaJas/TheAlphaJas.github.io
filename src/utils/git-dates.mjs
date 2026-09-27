import { execSync } from 'child_process';

// Most content files have no date in their frontmatter, so creation and
// last-modified dates come from git history instead. Plain .mjs so that
// astro.config.mjs (sitemap lastmod) can share it with the .astro pages.

/** @type {Map<string, { created: Date, modified: Date }> | null} */
let cache = null;

function load() {
  cache = new Map();
  try {
    // A shallow clone would stamp every file with the latest commit's date,
    // which is worse than no date at all. CI checks out full history.
    if (execSync('git rev-parse --is-shallow-repository', { encoding: 'utf-8' }).trim() === 'true') {
      return;
    }
    const log = execSync('git log --format=@@%cI --name-only --no-renames -- content', {
      encoding: 'utf-8',
      maxBuffer: 64 * 1024 * 1024,
    });
    let commitDate = null;
    // Newest commit first: the first sighting of a file is its last
    // modification, the last sighting is when it was added.
    for (const line of log.split('\n')) {
      if (line.startsWith('@@')) {
        commitDate = new Date(line.slice(2));
      } else if (line.trim() && commitDate) {
        const entry = cache.get(line.trim());
        if (entry) entry.created = commitDate;
        else cache.set(line.trim(), { created: commitDate, modified: commitDate });
      }
    }
  } catch {
    /* not a git checkout: pages simply go without dates */
  }
}

/**
 * @param {string} repoPath path relative to the repo root, e.g. "content/probability/power-grid.md"
 * @returns {{ created: Date, modified: Date } | undefined}
 */
export function gitDates(repoPath) {
  if (!cache) load();
  return cache.get(repoPath);
}
