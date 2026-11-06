---
title: "A docs platform we could evolve"
description: Moving four documentation spaces from GitBook to Docusaurus, with a new information architecture, a pull-request workflow anyone can contribute through, and search analytics.
sidebar_position: 1
sidebar_label: Docs platform
---

# A docs platform we could evolve

<span className="vp-eyebrow">Docs platform · live June 2026</span>

Readers needed to find the right page quickly. Writers needed to review each other's work before it went live. Engineers needed a way to document their own releases. Our old platform allowed none of that, so I moved four documentation spaces to a docs-as-code site the whole company can contribute to.

![Navigation-by-role prototype for the new docs site](/img/prototypes/role-based-ia.png)

*The navigation-by-role prototype I built before the new structure was agreed. [Open it live](pathname:///prototypes/role-navigation/).*

## The problem

The product guide, analytics notes, predictions and release notes lived in GitBook, which could not do two things we needed:

- **Versions per component.** Each analytics note ships on its own version line, and GitBook could only version a whole space.
- **Review before publishing.** There were no pull requests and no preview links, so engineers could not propose a change and writers could not review each other's work before it went live.

## What I did

- **Audited the content.** I classified all 321 pages as current or legacy, by product area and priority, with a plan to convert ten legacy pages a month.
- **Designed the information architecture.** An eight-section outline for the product guide, mapped page by page to existing content. Then an entry point by role (data scientist, supply chain engineer, planner, admin), which I prototyped as a standalone site first. Product leadership adopted the role-based approach.
- **Chose the platform and ran the plan.** I compared docs-as-code tools with engineering, chose Docusaurus, co-owned the 16-week migration plan, ran the stakeholder kickoff and got the decision approved in June 2025. Engineering built the site infrastructure and deployment pipeline.
- **Set up the contribution workflow.** One Jira ticket per change, a branch per ticket, a draft pull request with a preview link, required front matter, and a pull-request template with a checklist for each page type.
- **Kept improving it after launch.** 37 of my own pull requests merged in the first four months, including a 161-file cleanup of legacy pages, a CI workflow that keeps a last-updated date on 2,966 pages, search keywords on 227 pages for the words readers actually type, and search analytics to see where readers come up empty.
- **Proposed versioning per component.** A proposal and an [interactive prototype](pathname:///prototypes/doc-versioning/) so readers can find instructions for the version of an analytics note they actually run. Scheduled for build in December 2026. A generic re-creation of the proposal is in the [design sample](/samples/design/per-note-doc-versioning-proposal).

## What changed

- **The new site went live on 20 June 2026**, and GitBook was retired on 10 July.
- **The docs became a shared responsibility.** 18 people merged documentation changes in the first five months, and 14 of them were outside the writing team. Engineers and data scientists now document their own releases through pull requests, so the docs are ready on the day of each production release.
- **The site can grow.** It now holds about 3,000 pages, mostly because each released version of an analytics note keeps its own pages.
