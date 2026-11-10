# Tailored CVs

LinkedIn is the generic CV. On the site, every application gets its own tailored version at its own link, and all versions are live at the same time, so parallel applications never clash.

| What | Where |
| --- | --- |
| A tailored version | `cv/roles/<name>.md` |
| Its page | `https://vidyap18.github.io/cv/<name>` |
| Its PDF | `https://vidyap18.github.io/cv/<name>.pdf` |
| The CV in the site menu | `/cv` and `/Vidya_Patil_CV.pdf`, using the version named in `cv/DEFAULT` |

Tailored versions are hidden: they are not in the menu or the sitemap, and they tell search engines not to index them. They are unlisted, not password-protected, so anyone with the exact link can open them. Name a version after the company (`acme-docs-lead`) if you want the link to be hard to guess.

## Add a version for a new application

1. Copy the closest version, for example `cv/roles/general.md`, to `cv/roles/acme-docs-lead.md`.
2. Edit it. It is Markdown: `##` for sections, `### Job title | Dates` for each job (the dates are aligned right), then a line with the company in bold, then `-` for bullets. The header and the skills list use a little HTML; copy it as it is. Reorder or cut bullets, rewrite the summary, adjust skills. Do not add a download link: one is added automatically.
3. Build: `pnpm build`. This creates the page and its PDF.
4. Check `http://localhost:3456/cv/acme-docs-lead`.
5. Commit and push. Send the recruiter `https://vidyap18.github.io/cv/acme-docs-lead`.

## Other tasks

- **List every version and its link:** `pnpm cv`
- **Change the CV in the menu:** put the version's name in `cv/DEFAULT`, then build and push.
- **Retire a version** when the application closes: delete its file, then build and push. Its link stops working.

Edit only the files in `cv/roles/`. The pages in `src/pages/cv*` are generated on every build and are not saved in Git.
