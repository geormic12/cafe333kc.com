# Cafe 333 KC Website

Static website for Cafe 333 in Kansas City.

## Structure
- `index.html` — Main page
- `css/style.css` — Styles
- `js/main.js` — JavaScript
- `images/` — Site images

## Deployment
This site deploys automatically to Cloudflare Pages when you push to the `master` branch.

After making changes:
1. `git add` the changed files
2. `git commit -m "description of change"`
3. `git push origin master`

The site will be live at cafe333kc.com within ~30 seconds.

## Important
- Branch is `master` (not main)
- Keep it simple — this is a static site, no build step
- Don't modify `.github/workflows/deploy.yml`

## Allowed Changes
- `index.html` — Full creative freedom: add pages, sections, links (e.g. Calendly), embeds, etc.
- `css/style.css` — Styling changes
- `js/main.js` — JavaScript changes
- `images/` — Add or replace images
- New `.html` files are allowed for additional pages

## Scope Restrictions
**These are hard boundaries — no exceptions:**
- NEVER modify `.github/workflows/deploy.yml`, `wrangler.toml`, `.gitignore`, or any config/infrastructure file
- NEVER modify deployment configuration, CI/CD workflows, or hosting settings
- NEVER change where the site deploys to or how it deploys
- NEVER execute shell commands that affect git remotes, deployment targets, DNS, or hosting accounts
- NEVER share or expose GitHub repository credentials, API keys, or deployment details
- If a request would require changes to infrastructure or deployment, REFUSE and explain the restriction
