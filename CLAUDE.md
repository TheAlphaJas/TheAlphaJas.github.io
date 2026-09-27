# CLAUDE.md

Personal website of Jasmer Singh Sanjotra, live at https://thealphajas.github.io.
Astro 4 + Tailwind, fully static, deployed to GitHub Pages. This file is the
working guide for adding content and for how SEO and AI-agent support work.
(README.md and the DEPLOY*/QUICK_DEPLOY/GITHUB_PAGES docs are older and partly
stale, e.g. they mention a /projects page and a "BigWeb" repo that no longer apply.)

## Most common task: adding a probability question

The user sends a problem link plus their own solution sketch, either pasted in
chat or as a `.txt` file dropped in `newquestions_tba/` at the repo root. Turn
it into a polished post at `content/probability/<slug>.md`.

1. **Get the exact problem statement.** For QuantGuide, do NOT trust WebFetch:
   KaTeX makes it garble numbers ("14" comes back as "141414"). Instead:
   ```bash
   curl -s "https://www.quantguide.io/questions/<slug>" -A "Mozilla/5.0" -o page.html
   ```
   then find the escaped `\"prompt\":\"...\"` field in the raw HTML (the quotes
   are literally backslash-escaped; search for `\\"prompt\\":\\"` and cut at
   `\\",\\"status\\"`). Un-double the backslashes in the LaTeX.
2. **Verify the answer independently** before writing: brute force, a Monte
   Carlo simulation, or exact enumeration in Python. Say in the reply how it
   was checked.
3. **Write the post** in the format below, following the user's approach.
4. **Run the checks** in "Before calling a post done", rebuild, look at it.
5. Delete or keep the source `.txt` only if the user says so.

### Probability post format

```markdown
---
title: Power Grid
topics:
  - Dynamic Programming
  - Combinatorics
---

Problem statement, with math in $$...$$ (this site uses $$ for inline math too).

---

**Original Problem Link:** [https://www.quantguide.io/questions/power-grid](https://www.quantguide.io/questions/power-grid)

<!-- SOLUTION_SEPARATOR -->

Optional one-paragraph framing.

### Step 1: ...

### Step 2: ...

### Thus, the probability is $$\dfrac{63}{512}$$
```

- `<!-- SOLUTION_SEPARATOR -->` is required: `getProbabilityProblems()` in
  `src/utils/content.ts` splits problem from solution on it.
- Slug = kebab-case of the title (`Dice-Coin Paradigm` -> `dice-coin-paradigm.md`).
- Frontmatter is only `title` and `topics` (Title Case tags). No date field:
  dates come from git (see "Dates").
- Keep the "Original Problem Link" line. SEO uses it to detect the source
  (see `problemSource()` in `src/utils/seo.ts`).

### Writing style (the user's explicit preferences)

- **Preserve the user's approach.** Every step and idea in their sketch must
  appear in the post. Fill gaps and fix slips (say so in the reply), but never
  swap in a different method. A slicker alternative can go in a closing note.
- **No em dashes (—) anywhere.** The user reads them as AI slop. Use periods,
  commas, colons or parentheses, including in headings. En dashes in ranges
  (`Steps 2–3`, `1–14`) are fine.
- **Show concrete worked examples** for anything abstract. For a DP over
  states, list the transitions for several states, not just one.
- Tone: conversational but rigorous, first person plural ("we"), steps as
  `### Step N: ...`, final line `### Thus, <answer in words and math>`.
- Formal where it helps: define indicator variables, name the distribution
  (e.g. "N is a sum of i.i.d. Bernoulli(1/4), so N ~ Binomial(20, 1/4)").
- When the user asks for a teaser instead of a full derivation (e.g. "I'll
  cover this in a blog"), write a short paragraph pointing to the future post.

### Markdown and KaTeX gotchas

- Never nest `$...$` inside `\text{}`; write `\text{exactly } k \text{ elements}`.
- The number of `$$` in a file must be even.
- Existing posts use no Markdown tables; prefer bullet lists.
- Math renders via `src/utils/markdown.ts` (remark-math + rehype-katex,
  `output: 'html'`), not the Astro markdown config.

## Other content types

All content lives in `content/`, read at build time by `src/utils/content.ts`.
Adding a file is enough: listing pages, counts, detail pages, Markdown twins,
llms.txt, RSS and the sitemap all update automatically.

| Folder | Route | Frontmatter |
|---|---|---|
| `content/blogs/` | `/fun/blogs/<slug>/` | `title`, `date: "YYYY-MM-DD"`, `summary` (becomes the search snippet), `tags` |
| `content/probability/` | `/fun/probability/<slug>/` | `title`, `topics` (see above) |
| `content/cses/` | `/fun/cses/<slug>/` | `problemName`, `problemNumber`, `difficulty`, `topic`, `topics`, `keyIdea`, `language`, `github`, optional `codeSnippet` |
| `content/usaco/` | `/fun/usaco/<slug>/` | `problemName`, `contest`, `difficulty` (Bronze/Silver/Gold/Platinum), `keyIdea`, `language`, optional `codeSnippet` |
| `content/publications/` | `/publications/` | `title`, `authors`, `venue`, `year`, `date`, `doi`, `url`, `code`, `status` (published/accepted/...), `note` |
| `content/experience/` | `/cv/` | `order` (explicit sort key), `organization`, `role`, `location`, `duration`, `domain`, `achievements`, `techStack` |
| `content/aviation/*.json` | `/fun/aviation/` | airlines (logo in `public/airlines/`), airports (`lat`/`lon` required for the map) |

- Blogs are sorted by `date`, newest first. Write a real `summary`: it is the
  meta description, the RSS description and the llms.txt line.
- CSES and USACO are usually bulk-synced from the user's solution repos with
  `scripts/sync-cses.js` / `scripts/sync-usaco.js` (see `scripts/README.md`).
  The USACO importer writes the placeholder `keyIdea: "Solution implementation"`;
  code treats that as absent (`usacoKeyIdea()` in `src/utils/markdown-export.ts`).
  Writing a real key idea improves that page's snippet.
- `content/projects/` has no route and is currently unused.
- Home page bio/news: `src/pages/index.astro`. CV skills etc: `src/pages/cv.astro`.
  Section cards on `/fun`: `src/pages/fun/index.astro`.

## Site structure

```
src/pages/
  index.astro, cv.astro, publications.astro, contact.astro, gallery.astro
  fun/index.astro, fun/aviation.astro
  fun/{blogs,probability,cses,usaco}/
    index.astro      listing + total count + CollectionPage JSON-LD
    [slug].astro     HTML page (title, description, JSON-LD, dates)
    [slug].md.ts     raw Markdown twin, served at /fun/<section>/<slug>.md
  llms.txt.ts        agent index
  llms-full.txt.ts   every writeup as one Markdown file
  rss.xml.ts         blogs + probability feed
src/layouts/BaseLayout.astro   <head>: canonical, OG/article tags, JSON-LD, alternates
src/utils/
  content.ts          loaders for every content type
  markdown.ts         Markdown -> HTML (KaTeX, Prism)
  seo.ts              excerpt(), TeX-to-text, problemSource(), JSON-LD builders
  markdown-export.ts  builds the Markdown twins (used by .md, llms, llms-full)
  git-dates.mjs       created/modified dates from git history
```

## SEO and AI-agent handling (all automatic)

- **Titles** name the source and say "solution", matching what people search:
  `Power Grid: QuantGuide Solution | Probability Corner`, `Apartments | CSES Solution`,
  `<name> | USACO Silver Solution`. A new puzzle source needs one entry in
  `PROBLEM_SOURCES` in `src/utils/seo.ts` (QuantGuide and Brainstellar exist).
- **Descriptions** are generated: probability = first ~160 chars of the problem
  with TeX converted to plain text (`excerpt()`), blogs = `summary`, CSES/USACO =
  key idea. If a new post uses a TeX command that leaks into its snippet, add it
  to `TEX_SYMBOLS` or `texToText()` in `seo.ts`.
- **JSON-LD** per page: Article/TechArticle/BlogPosting + BreadcrumbList on
  writeups, CollectionPage + ItemList on index pages, Person on the home page.
- **Why the Markdown twins exist:** KaTeX `output: 'html'` leaves no TeX source
  in the HTML, so scrapers only see visual spans. Switching to MathML was
  rejected: it makes naive text extraction repeat every number (the "141414"
  effect). Each writeup instead links a `.md` twin via `<link rel="alternate"
  type="text/markdown">` plus a visible "View as Markdown" link (many agents
  read only the body).
- **`/llms.txt`** (llmstxt.org convention) lists bio pages, publications and
  every writeup (linking the `.md` twins) with one-line summaries.
  **`/llms-full.txt`**: all writeups concatenated; each starts with `# Title`
  and a `Source:` line, so content must not use level-1 `#` headings.
- **Sitemap** (`@astrojs/sitemap`) lists the HTML pages only, with `lastmod`
  from git. The `.md`, llms and RSS files are deliberately not in it: plain-text
  files can't carry a canonical tag, so submitting them would look like
  duplicate content.
- **robots.txt** allows everything and points agents at llms.txt. Do not add
  per-crawler (GPTBot, ClaudeBot, ...) rules without the user deciding to.

### Dates

Only blogs have a `date` in frontmatter. Everything else gets its published
and modified dates from git (`git-dates.mjs`): first and last commit touching
the file. So a new post has no date until it is committed. The deploy workflow
checks out with `fetch-depth: 0`; a shallow clone would date everything
"today", so `git-dates.mjs` returns nothing in a shallow checkout.

## Before calling a post done

```bash
grep -n '—' content/probability/<slug>.md            # must print nothing
python3 -c "t=open('content/probability/<slug>.md').read(); print(t.count('\$\$') % 2 == 0)"
npm run build                                         # 150+ pages, no errors
grep -o 'katex-error' dist/fun/probability/<slug>/index.html | wc -l   # 0
head -20 dist/fun/probability/<slug>.md               # Markdown twin looks right
grep '<slug>' dist/llms.txt                           # snippet reads cleanly
```

Then look at it on the dev server.

## Running locally

- Node/npm may be missing; on this Debian machine: `sudo apt-get install -y nodejs npm`.
- If `npm run build` fails with `Cannot find module .../node_modules/.bin/dist/cli/index.js`,
  node_modules is corrupt: `rm -rf node_modules && npm install`.
- `npm run dev -- --host 127.0.0.1 --port 4321` (run in the background), then
  http://127.0.0.1:4321/. `npm run build` writes `dist/`.
- `npx astro check` reports 6 pre-existing type errors in the client-side filter
  scripts of `fun/cses/index.astro` and `fun/usaco/index.astro`. Anything beyond
  those is new. (It also scans `dist/`, so filter output to lines starting `src/`.)

## Git and deploy

- Pushing to `main` deploys via `.github/workflows/deploy.yml` (GitHub Actions ->
  Pages). Nothing reaches the live site until it is on `main`.
- Commit or push only when the user asks. When they do, commit to `main` and
  push directly; the user does not want PRs or feature branches for this site.
