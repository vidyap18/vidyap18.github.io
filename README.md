# Vidya Patil: portfolio

Source for my portfolio site: six case studies, writing samples with working try-it demos, videos and my CV.

## How this site is built

- **Docusaurus 3**, with the case studies in `docs/work`, the writing samples in `docs/samples`, and the home, CV and videos pages in `src/pages`.
- **Content first.** Case studies and samples are Markdown and MDX. The home page reads its cards, quotes and video list from one data file, `src/data/work.ts`.
- **My own components** for expandable sections, tabs, step lists and auto-sizing demo embeds, in `src/components/mdx.tsx`. The try-it demos in `static/demos` are plain HTML, CSS and JavaScript.
- **Docs as code.** Every pull request runs a full build, and the build fails on any broken link. Every push to `main` publishes the site to GitHub Pages. See `.github/workflows/deploy.yml`.

## Run it locally

```bash
pnpm install
pnpm start
```

## About the samples

My employer's documentation is behind a login. One sample set is real pages I own, with the product name, people and other identifying details masked. The other sets are original re-creations for a fictional company, Meridian. Each sample page says which it is.
