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
