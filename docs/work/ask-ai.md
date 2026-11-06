---
title: "Ask AI: making the docs answerable by an assistant"
description: How I set up, evaluated and improved a documentation assistant, and the rule that decides whether a wrong answer is a docs problem or a system problem.
sidebar_position: 4
sidebar_label: Ask AI
---

# Ask AI: making the docs answerable by an assistant

<span className="vp-eyebrow">AI assistant · live for every customer since August 2026</span>

Customers can ask our documentation assistant a product question and get an answer from the docs, on the docs site and inside the product. I shaped what it needed to be, designed how we test it, and wrote the check that tells us, for any wrong answer, whether to fix the page or fix the system.

## The problem

An assistant that answers from the docs is only as good as two things: the pages it reads, and the way it finds the right piece of a page. When an answer was wrong, nobody could tell which of the two had failed, so writers could end up rewriting pages that were fine while engineers tuned retrieval for questions the docs never answered. The off-the-shelf chatbot we started with gave us no way to correct a wrong answer at all.

## What I did

**Set the requirements.** In November 2025 I wrote the requirements with product and engineering, and argued for building our own retrieval pipeline instead of keeping the off-the-shelf chatbot, because only our own pipeline would let us see and fix why an answer went wrong. Engineering built it.

**Tested it with real questions.** I designed two rounds of evaluation: 126 real questions, graded by 22 reviewers. Each reviewer had written instructions and ten questions, and graded three things separately: was the answer correct, was it complete, and did it cite the right page.

**Found out what the assistant actually reads.** I traced what reaches the assistant from a page: only the title, the breadcrumb, the heading path and the body, cut into pieces by heading and length. Keywords in the page's metadata never reach it. That ruled out the obvious fix, adding keywords to pages, which would have changed nothing.

**Turned it into a check anyone can run.** From that, I wrote seven checks a writer runs on any page, before it ships or after a wrong answer:

1. Does the page name the thing the reader asked about, including abbreviations?
2. Does each section make sense on its own, without the rest of the page?
3. Is a fact the reader would ask about only inside a table?
4. Are prerequisites inside the procedure, not on another page?
5. Does the page say what the product cannot do?
6. Is each term used in one way?
7. Do two pages contradict each other?

I built a Claude skill that runs the checks and reports each finding with where it is, why it matters and what to change. It is now the last check before any page ships.

**Built a way to watch it.** A review dashboard of usage and answer quality per customer account, so we see where the assistant struggles instead of waiting for complaints.

## The rule that came out of it

If the page behind a wrong answer passes all seven checks, the writer does not touch it. The question goes to engineering as a retrieval problem. Writers fix pages that need fixing, and engineering gets the cases that are really theirs, grouped into retrieval, chunking and consistency problems.

## Results

| | Round one | Round two |
| --- | --- | --- |
| Reviewers | 6, internal | 16, customer success and professional services |
| Fully correct | 15 of 39 (about 4 in 10) | 58 of 87 (2 in 3) |
| Incorrect | 13 of 39 (1 in 3) | 11 of 87 (about 1 in 8) |
| Correct page cited | about half | about 4 in 5 |

The questions and reviewers differed between rounds, and retrieval improved at the same time as the docs, so read this as a direction, not a controlled result.

The full method is in [Writing documentation an AI assistant can answer from](/samples/method/retrieval-ready-docs).
