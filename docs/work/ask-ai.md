---
title: "Ask AI: making the docs answerable by an assistant"
description: How I evaluated a documentation assistant, decided whether a wrong answer was a docs or a system problem, and how my team now uses AI to ship documentation and product changes.
sidebar_position: 4
sidebar_label: Ask AI
---

# Ask AI: making the docs answerable by an assistant

<span className="vp-eyebrow">AI assistant · live since August 2026</span>

Our documentation assistant answers product questions from the docs, on the docs site and inside the product, in every customer environment since 17 August 2026. I designed how we judge it, and the check that decides whether a wrong answer is the docs' fault or the system's.

## The evaluation

126 real questions, graded by 22 reviewers in two rounds. Reviewers graded correctness, completeness and the cited source separately, with written instructions and ten questions each.

| | Round one | Round two |
| --- | --- | --- |
| Reviewers | 6, internal | 16, customer success and professional services |
| Fully correct | 15 of 39 (about 4 in 10) | 58 of 87 (2 in 3) |
| Incorrect | 13 of 39 (1 in 3) | 11 of 87 (about 1 in 8) |
| Correct source cited | about half | about 4 in 5 |

The questions and reviewers differed between rounds, and retrieval changes landed alongside the docs fixes, so this is a direction, not a controlled result.

## Docs problem or system problem?

I traced what the assistant actually receives from a page: only the title, the breadcrumb, the heading path and the body, split into chunks by heading and length. Front-matter keywords are ignored. From that, I wrote seven checks a writer runs on any page, draft or failed answer:

1. Does the page name the thing the reader asked about, including abbreviations?
2. Does each section make sense on its own, without the rest of the page?
3. Is a fact the reader would ask about only inside a table?
4. Are prerequisites inside the procedure, not on another page?
5. Does the page say what the product cannot do?
6. Is each term used in one way?
7. Do two pages contradict each other?

If the page passes all seven, the writer does not edit it. The question goes to engineering as a retrieval problem. That rule stopped the obvious fix that changes nothing: stuffing keywords into a page the assistant never reads them from. It is the last check before any page ships. The full method is in [Writing documentation an AI assistant can answer from](/samples/method/retrieval-ready-docs).

## My part

- **Wrote** the requirements with product and engineering in November 2025, and argued for building our own retrieval pipeline over an off-the-shelf chatbot, because the chatbot gave us no way to correct a wrong answer. Engineering built the pipeline.
- **Designed and ran** both evaluation rounds.
- **Wrote** the seven checks and **built** the tool that applies them, with Claude Code.
- **Built** a review dashboard of usage and answer quality per account.
- **Prototyped** a docs-grounded agent for the company's agent platform. Not merged.

## How the team writes with AI now

- **Drafts from pull requests.** Drafts are generated from engineers' pull requests. A writer edits the draft, checks it with the engineer, and the product manager signs it off. A drafting assistant I built adds front matter, suggests links from the real content tree, and flags pages that the latest release notes may have made stale.
- **Writers change the product.** I led my writers into shipping in-product help directly in the product's frontend code: info tips, a close control for the chat widget, and removing coach marks that had outlived their use. Six changes merged since September 2026, three more in review, including native info pop-ups that replace a third-party in-app help tool.
- **Search and the assistant, split.** I built a working branch of the docs site that separates keyword search from the assistant, so a typed question goes to the assistant instead of returning no results. Engineering shipped the approach in their merged change.
- **Docs-site code.** I built search analytics, a CI workflow that keeps a last-updated date on about 3,000 pages, and a fullscreen control for embedded video.

I do not automate decisions about what a customer needs to know, writes to shared records without a person reviewing them, or anything that reaches a customer unreviewed.
