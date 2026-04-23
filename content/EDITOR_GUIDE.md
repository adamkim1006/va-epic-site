# VA EPIC Content Editing Guide

Doctor Park now has a browser-based editing option through Decap CMS:

- Open `/admin` on the deployed site
- Sign in with the connected GitHub account
- Edit service-page markdown or the promotional banner
- Save and publish changes without touching React files directly

Important: on Vercel, Decap's GitHub login still needs an OAuth proxy configured before browser-based login will work in production.

Doctor Park can also still update the same two main content areas directly in the repo if needed:

## 1. Main service-page copy

These files control the long-form website copy:

- `content/services/dental-implants-chantilly-va.md`
- `content/services/all-on-4-chantilly-va.md`
- `content/services/periodontal-treatment-chantilly-va.md`

### How they work

- The text at the top between `---` lines is the page metadata and hero content.
- The questions under `faqs:` control the FAQ section.
- The rest of the file is normal Markdown and becomes the main page content.

### Safe things to edit

- Headlines
- Body paragraphs
- Bullet lists
- FAQ questions and answers
- CTA title and description

## 2. Promotional banner

This file controls the optional site-wide promotion banner:

- `content/promotion-banner.json`

### Common fields

- `"enabled": true` turns the banner on
- `"enabled": false` turns it off
- `title` is the banner headline
- `message` is the supporting text
- `startsOn` and `endsOn` are optional date gates in `YYYY-MM-DD`
- `ctaLabel` and `ctaHref` control the button
- `imageSrc` points to an image in `public/images/...`

## What still requires developer help

- Adding new pages
- Rearranging layouts
- Changing navigation structure
- Updating colors, animations, or 3D scenes
- Setting up the Decap GitHub OAuth proxy for production login

## Future upgrade options

If you want a more polished editing experience later, the next tier of options would be:

- Sanity for a hosted editorial studio
- Payload if you want the CMS inside the same Next.js app

For now, Decap is the lightest path because it edits the existing markdown and JSON files directly.
