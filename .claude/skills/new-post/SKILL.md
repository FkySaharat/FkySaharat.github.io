---
name: new-post
description: Write a new blog post for this site. Use when asked to write, draft, or add a blog post or article (e.g. "write a post about X", "เขียน blog เรื่อง X"). Covers file naming, frontmatter, the site's writing style, fact rules, and verification.
---

# Writing a new blog post

Blog posts are Markdown files in `src/content/blog/`. Their frontmatter is validated by the
`blog` schema in `src/content.config.ts`, so read that file first if you're unsure about a field.

## 1. Create the file

- Path: `src/content/blog/<slug>.md`. The slug becomes the URL: `/blog/<slug>/`.
- Slug: short, lowercase, English, kebab-case (`context-engineering`, not `Context_Engineering` or Thai).
- Check that no file with that slug already exists. Never overwrite or edit other posts unless asked.

## 2. Frontmatter

```md
---
title: 'Main topic: what the reader gets'
description: 'One or two sentences. Shown on the post card and used as the meta description.'
pubDate: YYYY-MM-DD   # today's date
tags: ['lowercase', 'kebab-case']
lang: 'th'            # 'th' for Thai posts, 'en' (default) for English
draft: true           # only if the user wants it hidden for now
---
```

- Use the current date for `pubDate`. Don't backdate or future-date.
- Reuse existing tags where they fit. Run `grep -h "^tags:" src/content/blog/*.md` to see them.
- `lang` must match the language of the body. It sets `<html lang>` for the post page.

## 3. Writing style

Match the existing posts (`hello-world.md`, `harness-engineering.md`):

- **Thai posts:** write in Thai, but keep technical terms in English: framework, component, build, deploy,
  context, agent, schema, CI, and so on. Don't translate them.
- **Pronoun:** the author refers to himself as **ผม** (never ฉัน).
- **Structure:** start with 1–2 intro paragraphs, no heading. Use `##` for sections and `###` only when
  needed. Never use `#`; the title is already the page's `<h1>`.
- **Tone:** friendly and practical. Explain *why*, not just *what*. Short paragraphs.
- **Code:** fenced blocks with a language (`ts`, `astro`, `md`, `json`, `yaml`, `sh`, `text`).
- **Tables:** fine for comparisons. The post page already styles them.- **Ending:** close with a short takeaway or next step for the reader.

## 4. Facts: don't make things up

The posts are part of the author's professional portfolio, so accuracy matters more than polish.

- Code snippets about this site must be **copied from the real files in this repo**. Open the file and check.
- Don't invent numbers, benchmarks, quotes, error messages, or stories. Any "true story" must actually
  have happened in this repo. If you're unsure, ask the user or leave it out.
- If something isn't done yet, say so (for example, "สิ่งที่จะทำต่อ"). Don't describe planned work as finished.
- Link to official docs for external claims instead of stating them from memory.

## 5. Verify

1. Run `npm run verify`. It must pass with 0 errors. A frontmatter mistake fails the build.
2. Confirm the page was built: `dist/blog/<slug>/index.html` exists.
3. Check that the headings rendered:
   `grep -o '<h2[^>]*>[^<]*' dist/blog/<slug>/index.html`
4. Tell the user what the post covers, and ask them to read it in their own voice before publishing.
