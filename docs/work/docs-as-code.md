---
title: "Moving four documentation spaces to docs-as-code"
description: Migrating product documentation from GitBook to a Docusaurus site with pull-request review, previews and CI, live June 2026.
sidebar_position: 1
sidebar_label: Docs as code
---

# Moving four documentation spaces to docs-as-code

<span className="vp-eyebrow">Docs platform · shipped June 2026</span>

![Persona-led information architecture prototype](/img/work/persona-led-ia-prototype.png)

**What.** Four documentation spaces (product guide, science notes, predictions, release notes) moved from GitBook to a Docusaurus site. Live on 20 June 2026; GitBook retired on 10 July.

**Why GitBook had to go.** Two requirements it could not meet. Science notes ship on independent version lines, and GitBook could not keep a version of the docs per note. And there was no review step: no pull requests, no preview links, so engineers could not propose changes and writers could not review each other's work before it went live.

**Why it mattered.** Engineers and data scientists now document their own releases through pull requests, and the docs are ready on the day of each production release.

## My part

I owned the audit, the information architecture, the tool choice and the contribution workflow. Engineering built the site infrastructure and the deployment pipeline.

- **Audit.** Classified all 321 pages in GitBook as current or legacy, by product area and priority, with a plan to convert ten legacy pages a month.
- **Information architecture.** An eight-section outline for the product guide, mapped page by page to existing content. Later, an entry point by role (data scientist, supply chain engineer, planner, admin), which I prototyped as a standalone site first. Product leadership adopted the role-based approach.
- **Tool choice and plan.** Compared docs-as-code tools with engineering, chose Docusaurus, co-owned the 16-week migration plan, ran the stakeholder kickoff, and got the decision approved by product management in June 2025.
- **Contribution workflow.** One Jira ticket per change, a branch per ticket, a draft pull request against staging with a preview link, required front matter, and a pull-request template with a checklist by page type.
- **My own pull requests.** 37 merged in the first four months after go-live, including a 161-file cleanup of legacy pages; a CI workflow that keeps a last-updated date on every page, applied to 2,966 pages; search keywords on 227 pages for terms readers searched for but pages did not use; and search analytics.
- **Versioning design.** A proposal to engineering for per-note versioning, with an interactive prototype. Scheduled for build in December 2026. A generic re-creation is in the [design sample](/samples/design/per-note-doc-versioning-proposal).

## Scale

- **Contributors:** 18 people merged documentation changes in the five months after go-live. 14 of them are outside the writing team.
- **Pages:** the 321 audited pages were the current pages in GitBook. The new site holds about 3,000 pages. Most of the difference is science-note pages, now kept once for each released version, plus new product-guide pages written since the migration.

## What this shows

Information architecture, docs-as-code, and getting engineers to contribute, while still shipping a share of the work myself.
