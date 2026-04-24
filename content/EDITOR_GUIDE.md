# VA EPIC Content Editing Guide

Doctor Park now has a browser-based editing option through Decap CMS:

- Open `/admin` on the deployed site
- Sign in with the connected GitHub account
- Edit service-page markdown or the promotional banner
- Save and publish changes without touching React files directly

Important: production login is now handled by built-in Next.js routes on Vercel, but GitHub OAuth app credentials still need to be added before `/admin` will work on the live site.

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
- Changing the GitHub OAuth app or Decap production auth setup

## Production login setup for Decap on Vercel

The site now serves Decap's GitHub OAuth flow from these built-in routes:

- `/api/decap/auth`
- `/api/decap/callback`
- `/api/decap/config`

To finish production setup:

1. In GitHub, open `Settings -> Developer settings -> OAuth Apps -> New OAuth App`.
2. Set `Homepage URL` to your site origin, for example `https://www.vaepic.com`.
3. Set `Authorization callback URL` to your site origin plus `/api/decap/callback`, for example `https://www.vaepic.com/api/decap/callback`.
4. Save the app and copy the client ID and client secret.
5. In Vercel, add these environment variables to the project:
   - `NEXT_PUBLIC_SITE_URL=https://www.vaepic.com`
   - `GITHUB_OAUTH_CLIENT_ID=...`
   - `GITHUB_OAUTH_CLIENT_SECRET=...`
6. Redeploy the site.
7. Open `/admin` on the production site and sign in with a GitHub user that has write access to the repository.

Notes:

- `NEXT_PUBLIC_SITE_URL`, the GitHub OAuth app homepage URL, and the callback URL should all use the same production domain.
- The default GitHub scope is `repo`, which works for private repos too. If the repo is public and you want a narrower scope later, a developer can adjust `DECAP_GITHUB_SCOPE`.
- Local development can still use `local_backend: true` when running a Decap local backend separately.

## Future upgrade options

If you want a more polished editing experience later, the next tier of options would be:

- Sanity for a hosted editorial studio
- Payload if you want the CMS inside the same Next.js app

For now, Decap is the lightest path because it edits the existing markdown and JSON files directly.
