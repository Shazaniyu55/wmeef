# Warrake Muslims Education & Empowerment Foundation — Website

A mobile-responsive website for WMEEF, built with **Next.js (App Router)**,
**TypeScript**, and **Tailwind CSS**, with a markdown-powered blog for
activities.

## Getting started

You need [Node.js](https://nodejs.org) 18.18+ installed.

```bash
npm install      # install dependencies
npm run dev      # start the dev server at http://localhost:3000
npm run build    # production build
npm run start    # run the production build
```

## Project structure

```
app/
  layout.tsx          Root layout (fonts, navbar, footer, metadata)
  page.tsx            Home page
  about/page.tsx      About page
  programs/page.tsx   Programs page
  blog/page.tsx       Activities index
  blog/[slug]/page.tsx Single activity post
  contact/page.tsx    Contact page (with form)
  donate/page.tsx     Donate page
  not-found.tsx       404 page
  globals.css         Global styles + Tailwind layers
components/           Navbar, Footer, PageHeader, PostCard, ContactForm, StarMotif
content/posts/        Blog posts as markdown files
lib/
  site.ts             Site config: nav, contact info, programs, pillars
  posts.ts            Reads + renders markdown blog posts
public/logo.png       The foundation's logo
```

## Editing content you'll want to change first

All in `lib/site.ts`:
- **Contact details** — email, phone, location, social links
- **Mission statement**
- **Programs and pillars**

Other spots marked with `TODO`:
- Bank details on the donate page (`app/donate/page.tsx`)
- The contact form submit handler (`components/ContactForm.tsx`) — it currently
  simulates a send. Wire it to an email service (Resend, Formspree) or a Next.js
  Route Handler at `app/api/contact/route.ts`.

## Adding a new activity / blog post

Create a new `.md` file in `content/posts/`. The filename becomes the URL
(`my-update.md` → `/blog/my-update`). Start each file with frontmatter:

```markdown
---
title: "Your post title"
date: "2025-10-01"
category: "Education"
location: "Where it happened"
excerpt: "One or two sentences shown in listings."
cover: "/activities/my-update-cover.jpg"
gallery:
  - src: "/activities/my-update-1.jpg"
    caption: "What's happening in this photo"
  - src: "/activities/my-update-2.jpg"
    caption: "Another moment"
---

Your content here. Use **bold**, lists, ## headings, and > quotes.
```

Posts are sorted newest-first automatically. `cover` and `gallery` are
optional — a post with neither simply shows no photos.

## Adding photos

1. Put your photo files in `public/activities/` (JPG, PNG, or WebP).
2. Reference them from a post's frontmatter: `cover:` for the headline image
   shown on cards and at the top of the post, and `gallery:` for the photo grid
   at the bottom of the post (each opens in a click-to-enlarge lightbox).
3. Paths always start with `/activities/...` (the `public` folder is the web
   root).

The site currently ships with **branded placeholder images** in
`public/activities/` (they say "Replace with your photo"). Swap them for your
real photos — keep the same filenames and nothing else needs to change, or use
new filenames and update the frontmatter paths to match. A 3:2 ratio (e.g.
1200×800) looks best. Compress large photos before uploading so pages stay fast.

## Brand

- Primary green `#125F36` (from the logo)
- Accent brass `#B8893B`
- Parchment background `#F7F3EA`
- Display type: Fraunces · Body type: Mulish (loaded via `next/font`)
- Signature motif: an eight-point *khatam* star, used as dividers and watermarks

## Deploying

The easiest path is [Vercel](https://vercel.com): push this folder to a Git
repository and import it. No configuration is needed. It also runs on Netlify or
any Node host that supports Next.js.
