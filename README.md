# Saharat Diewtrakul — Portfolio & Blog

[![CI](https://github.com/FkySaharat/FkySaharat.github.io/actions/workflows/ci.yml/badge.svg)](https://github.com/FkySaharat/FkySaharat.github.io/actions/workflows/ci.yml)

Personal portfolio and blog of a software engineer working with C# and SQL.

**Live site:** https://fkysaharat.github.io

## Tech stack

- **[Astro 7](https://astro.build)**, static output with zero client-side JavaScript
- **Content collections** with Zod schemas: posts and projects are type-checked Markdown
- **Plain scoped CSS** with design tokens (CSS variables), no CSS framework
- **TypeScript** in strict mode, checked by `astro check`
- **GitHub Actions** verifies every push and pull request, and deploys `main` to GitHub Pages

## Features

- Home page with intro, skill cards, project cards, and latest posts
- Blog with a card-grid index, per-post pages, tags, and draft support
- SEO basics: per-page title/description, canonical URL, Open Graph tags
- Single config file for all personal info (`src/site.config.ts`)

## Getting started

Requires Node.js ≥ 22.12.

```sh
npm install
npm run dev        # http://localhost:4321
```

| Command | Action |
| --- | --- |
| `npm run dev` | Start the local dev server |
| `npm run check` | Type check (`astro check`) |
| `npm run build` | Build the production site to `dist/` |
| `npm run verify` | Type check + build (what CI runs) |
| `npm run preview` | Preview the production build locally |

## Writing content

**Blog post:** add `src/content/blog/my-post.md`. It's published at `/blog/my-post/`.

```md
---
title: 'My post'
description: 'One-line summary shown on the card.'
pubDate: 2026-10-20
tags: ['csharp', 'sql']
draft: false # true = hidden
---

Post content in Markdown…
```

**Project:** copy `src/content/projects/example-project.md`, fill it in, and remove `draft: true`.

**Personal info, social links, skills:** edit `src/site.config.ts`.

Frontmatter is validated against `src/content.config.ts`, so a missing or mistyped field fails the build with a clear error.

## Project structure

```text
├── .github/workflows/ci.yml   # CI: npm run verify on push / PR
├── .claude/settings.json      # AI agent permissions (see below)
├── public/                    # Static files served as-is (favicon)
├── src/
│   ├── components/            # Header, Icon, PostList (blog cards), FormattedDate
│   ├── content/
│   │   ├── blog/              # Blog posts (Markdown)
│   │   └── projects/          # Portfolio projects (Markdown)
│   ├── layouts/Layout.astro   # Page shell, design tokens, shared card styles
│   ├── lib/content.ts         # getPublishedPosts() / getPublishedProjects()
│   ├── pages/
│   │   ├── index.astro        # Home
│   │   └── blog/              # /blog/ index + /blog/<slug>/ post pages
│   ├── content.config.ts      # Frontmatter schemas
│   └── site.config.ts         # Personal info, experience, skills, education
├── AGENTS.md                  # Instructions for AI coding agents
└── astro.config.mjs
```

## Working with AI agents

This repo is set up so coding agents (Claude Code, Codex, Copilot, …) can work in it safely:

- **`AGENTS.md`** covers the project map, conventions, and rules (for example: no hardcoded personal info, no new dependencies without asking). `CLAUDE.md` imports it.
- **`npm run verify`** is the definition of done: agents must pass it before reporting a task as finished.
- **`.claude/settings.json`** pre-approves the safe build/check commands and blocks edits to generated folders (`dist/`, `.astro/`, `node_modules/`).
- **CI** runs the same `verify` command, so nothing an agent (or human) breaks can be merged silently.

## Deployment

Every push to `main` runs `npm run verify` and, if it passes, deploys `dist/` to GitHub Pages
(`.github/workflows/ci.yml`). Pull requests are verified but never deployed.

One-time setup: in the GitHub repo, go to **Settings → Pages → Source** and choose **GitHub Actions**.
