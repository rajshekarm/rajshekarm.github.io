# GitHub Pages-style AI Systems Portfolio

Minimal, GitHub-inspired academic engineering portfolio built with React, TypeScript, and Vite.

## Run locally

```bash
npm install
npm run dev
```

## Customize

1. Edit `src/App.tsx`: replace `person` with your real identity, links, education, and contact details.
2. Replace the three **example** projects with real work and add repository URLs. Do not publish example claims as completed projects.
3. Update research interests to reflect your actual work.
4. Optionally put `resume.pdf` in `public/` and set `person.resume = '/resume.pdf'`.

## Deploy to GitHub Pages

For a personal site, create a repository named `YOURUSERNAME.github.io` and upload this project. Change `base` in `vite.config.ts` only if using a project repository (e.g. `'/repository-name/'`).

Use GitHub Actions to deploy: in your repository go to **Settings → Pages → Build and deployment → Source → GitHub Actions**, then add `.github/workflows/deploy.yml` (included). Push to `main`. Your site will appear at `https://YOURUSERNAME.github.io/`.

## Modern engineering blog

The **Blog** tab is a Markdown-powered technical journal with article search, topic filters, reading time, responsive layouts, tables, and code blocks.

Create a new file at `src/posts/my-article.md`:

```md
---
title: Measuring GPU Kernel Latency
date: 2026-11-21
summary: What I learned from profiling a simple kernel.
tags: GPU, Performance, CUDA
---

## My experiment

Explain your setup, methodology, measurements, and results.
```

Save and push: Vite automatically discovers Markdown posts during the build. Articles are available at `#blog/my-article`. The three included posts are **demonstrations**, not personal achievements. Replace them with original, verifiable work. The blog uses hash routing to work on GitHub Pages without server-side route rewrites.

## Add an optional YouTube video to a blog post

In any `src/posts/*.md` file, add a `youtube:` field to the front matter:

```md
---
title: Understanding GPU Memory Hierarchy
date: 2026-10-18
summary: A practical guide to GPU memory.
tags: GPU, Architecture
youtube: https://www.youtube.com/watch?v=YOUR_VIDEO_ID
---

Your article content starts here.
```

Replace `YOUR_VIDEO_ID` with a real 11-character YouTube video ID when your video is published. The video panel automatically appears **at the top of the article**, beside an introduction on wide screens and above it on phones. Visitors click the thumbnail to load the privacy-enhanced YouTube embed. The article listing also shows a Video label. Leave out `youtube:` (or leave it blank) for articles without a video. Standard `youtube.com/watch`, `youtu.be`, `youtube.com/shorts`, and `youtube.com/embed` links are supported. No video is embedded until you add a valid link.
