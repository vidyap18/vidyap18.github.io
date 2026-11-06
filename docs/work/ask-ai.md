---
title: "Ask AI: making the docs answerable by an assistant"
description: Requirements, build versus buy, a two-round evaluation and a readiness check for a documentation assistant live in every customer environment since August 2026.
sidebar_position: 4
sidebar_label: Ask AI
---

# Ask AI: making the docs answerable by an assistant

<span className="vp-eyebrow">AI assistant · live since August 2026</span>

![Ask AI usage dashboard, numbers blurred](/img/work/ask-ai-dashboard.png)

**What.** An assistant that answers product questions from the documentation, in the docs site and inside the product. Live in every customer environment since 17 August 2026. In its first month, people in more than 30 customer accounts used it.

**Why it mattered.** Customers get an answer from the docs without searching or filing a ticket, and the docs team learns which questions the docs do not answer.

## My part

- **Requirements and build versus buy.** In November 2025 I set the requirements with product and engineering. We turned down an off-the-shelf chatbot because it gave us no way to correct a wrong answer and locked us in, and built our own retrieval pipeline instead, behind a feature flag for a soft launch. Engineering built the pipeline.
- **Evaluation.** I designed and ran it. Round one, July 2026: 39 answers graded by six internal reviewers. Round two, July to August 2026: 87 answers graded by 16 reviewers from customer success and professional services, each with ten questions, written instructions, and separate grades for correctness, completeness and source.

  | | Round one | Round two |
  | --- | --- | --- |
  | Fully correct | 15 of 39 (about 4 in 10) | 58 of 87 (2 in 3) |
  | Incorrect | 13 of 39 (1 in 3) | 11 of 87 (about 1 in 8) |
  | Correct source cited | about half | about 4 in 5 |

  The questions and reviewers differed between rounds, and retrieval changes landed alongside the docs fixes, so this is a direction, not a controlled result.
- **What the assistant sees.** I traced the ingestion pipeline. Only the title, breadcrumb, heading path and body of a page are embedded; pages are split by heading and length; front-matter keywords are ignored. Several obvious "fix the docs" moves would have changed nothing.
- **A readiness check.** Seven checks a writer runs on a page, a draft or a failed answer: page identity and abbreviations, context inside each chunk, facts that exist only in tables, prerequisites split from procedures, capability limits, terminology, contradictions. When the page already answers the question, it says so, and the writer investigates retrieval instead of editing the page. It is the last check before a page ships. The method is written up as a [sample](/samples/method/retrieval-ready-docs).
- **Agent prototype.** Prototyped a docs-grounded agent for the company's agent platform that searches the docs the same way. Not merged.

## How the team writes with AI now

I built the tools with Claude Code. Drafts are generated from engineers' pull requests. A writer edits the draft, checks it with the engineer, and the product manager signs it off. A drafting assistant adds front matter, suggests links from the real content tree, and flags pages that the latest release notes may have made stale.

I do not automate decisions about what a customer needs to know, writes to shared records without a person reviewing them, or anything that reaches a customer unreviewed.

## What this shows

Evaluating an AI system with evidence, reading the pipeline before changing the content, and turning the method into a check other writers use.
