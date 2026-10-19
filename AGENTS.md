# AGENTS.md

Instructions for AI coding agents (Claude Code, Codex, Copilot, etc.) working in this repo.
`CLAUDE.md` imports this file — edit this one, not that one.

## Project

Personal portfolio + blog for Saharat Diewtrakul. **Pure Astro 7**, static output, deployed to GitHub Pages at
https://fkysaharat.github.io. No UI framework (no React/Vue/Svelte), no CSS framework. The only client-side JS is the tiny theme/language toggle (Header.astro + an inline script in Layout.astro).

## Commands

| Command | Use |
| --- | --- |
| `npm run verify` | **Run before saying any task is done.** Type check + production build. Must pass with 0 errors. |
| `npm run check` | Type check only (`astro check`) |
| `npm run build` | Production build to `dist/` |
| Deploy | Automatic: pushing to `main` runs `.github/workflows/ci.yml` (verify, then deploy to GitHub Pages). Never deploy by hand. |
| `astro dev --background` | Start the dev server in the background (`astro dev stop`, `astro dev status`, `astro dev logs`) |

## Where things live

| Change | Edit |
| --- | --- |
| Name, bio, social links, experience, skills, education, languages | `src/site.config.ts` — the single source of truth. Never hardcode personal info elsewhere. |
| Blog posts | `src/content/blog/*.md` — file name = URL slug. To write one, follow the `new-post` skill (`.claude/skills/new-post/SKILL.md`) |
| Portfolio projects | `src/content/projects/*.md` — hidden while `draft: true` |
| Frontmatter fields | `src/content.config.ts` (Zod schema; build fails on invalid frontmatter) |
| Colors, card + tag styles, dark theme | `:root` variables (light) and the `:root[data-theme='dark']` block (dark) in `src/layouts/Layout.astro` — add every new color to both. The inline script in `<head>` sets `data-theme` (saved choice, else system setting) |
| UI labels (headings, buttons, nav) | `UI` in `src/i18n.ts` |
| Icons | `src/components/Icon.astro` — add an entry to `icons`, then use `<Icon name="..." />` |
| Querying posts / projects | `getPublishedPosts()` / `getPublishedProjects()` in `src/lib/content.ts` — don't re-implement the draft filter/sort |

## Conventions

- Match existing style: tabs, single quotes, scoped `<style>` per component, `:global()` only for rendered Markdown.
- Use CSS variables from `Layout.astro` (`var(--text)`, `var(--accent)`, …) — no new hardcoded hex colors.
- Reuse the global `.card` and `.tag-list` classes for any boxed or tag-like UI.
- External links: `target="_blank" rel="noopener noreferrer"`. Decorative SVGs: `aria-hidden="true"` (the `Icon` component does this).
- **Every user-facing string needs English and Thai.** Use the `Text` type (`{ en, th }`) and render it with `<T t={...} />`. Brand names and tech names (C#, GitHub, Docker) stay plain strings — `<T>` accepts a plain string too (type `Label`). Page `<title>` and meta description stay English. Blog post bodies are single-language: set `lang` in frontmatter. It goes on the `<article>` and is the page's default `<html lang>`; once a visitor picks a UI language, `<html lang>` follows that. Theme/language logic lives only in the inline script in `Layout.astro` (buttons call `window.__setPref`).
- Keep it static. Only add a framework integration or `client:*` island when a feature truly needs browser interactivity, and ask first.
- Don't add dependencies without asking. Astro already renders Markdown — no Markdown libraries needed.
- Never publish placeholder or invented content (projects, posts, skills) as if it were real. Use `draft: true`.

## Don't touch

- `dist/`, `.astro/`, `node_modules/` — generated.
- `package-lock.json` — only change it through `npm install` / `npm uninstall`.

## Astro docs

Full documentation: https://docs.astro.build — consult before related work:

- [Routing, dynamic routes, middleware](https://docs.astro.build/en/guides/routing/)
- [Astro components](https://docs.astro.build/en/basics/astro-components/)
- [Framework components (React, Vue, …)](https://docs.astro.build/en/guides/framework-components/)
- [Content collections](https://docs.astro.build/en/guides/content-collections/)
- [Styling](https://docs.astro.build/en/guides/styling/)
- [Internationalization](https://docs.astro.build/en/guides/internationalization/)
