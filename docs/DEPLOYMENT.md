# Deployment: GitHub Pages

The site is fully static. GitHub Actions builds it, tests it, and publishes `dist/` to GitHub Pages.

> ⚠️ GitHub Pages sites are **public, even if the repository is private.** Only `dist/` is published, and it contains only the built pages. Never place private documents in `public/` or `src/`.

## One-time setup
1. Create the GitHub repository (e.g. `austin-professional-network`) and push `main`.
2. In the repository, go to **Settings → Pages → Build and deployment → Source** and choose **GitHub Actions**.
3. (Optional) In **Settings → Environments → github-pages**, restrict deployments to `main`.
4. Push to `main`, or run the workflow manually. The site is published at `https://<owner>.github.io/<repo>/`.

## Workflow: `.github/workflows/deploy.yml`

| Trigger | What happens |
|---|---|
| Pull request | `npm ci` → `npm run check` (validate data, build, test). No deploy. |
| Push to `main` | Check, then upload the artifact, then deploy to Pages |
| Weekly (Mon 11:00 UTC) | Same as push. Rebuilding updates which events count as past or upcoming |
| Manual (`workflow_dispatch`) | Same as push |

The base path is computed automatically as `/<repo-name>`, with `SITE_URL=https://<owner>.github.io`.

## Custom domain
1. Add the domain under **Settings → Pages → Custom domain**, and configure DNS as GitHub describes.
2. Add a `public/CNAME` file containing the domain.
3. Under **Settings → Secrets and variables → Actions → Variables**, set:
   - `SITE_URL` = `https://your-domain.example`
   - `BASE_PATH` = *(empty)*
4. Re-run the workflow.

## Local production build
```bash
npm run check                                          # default base /austin-professional-network
BASE_PATH=/my-fork SITE_URL=https://me.github.io npm run check
npm run preview                                        # serves dist/ with the base path
```

## Troubleshooting

| Symptom | Likely cause / fix |
|---|---|
| CSS missing, links 404 | Wrong base path. The repo name must match `BASE_PATH`, so check the "Configure site URL" step log |
| Deploy job: "Pages not enabled" / 404 on `deploy-pages` | Set Pages source to **GitHub Actions** (step 2 above) |
| Deploy job fails with "Branch is not allowed to deploy to github-pages" | Settings → Environments → github-pages → add `main` to the deployment branches |
| Deploy job: permission denied | The workflow needs `pages: write` and `id-token: write` (already set). Also check org policies |
| `npm ci` fails | `package-lock.json` is out of sync. Run `npm install` locally and commit the lock file |
| Node engine error | Astro 7 requires Node ≥ 22.22. CI reads `.nvmrc` |
| Test "unexpected external link" | You added a new external URL. Add it to `ALLOWED_EXTERNAL` in `tests/site.test.mjs` if it's intended |
| Event still shows "Upcoming" after it happened | It refreshes on the next weekly build, or you can run the workflow manually |
| Custom 404 not shown | GitHub Pages serves `dist/404.html` automatically at the site root. For project sites it is used for any unknown path |
