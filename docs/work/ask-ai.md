---
title: "Using AI to ship better docs"
description: AI on both sides of the docs. Drafting from pull requests and Jira tickets, Claude skills for the company, and an evaluation that tells a docs problem from a retrieval problem.
sidebar_position: 2
sidebar_label: AI in the docs
---

# Using AI to ship better docs

<span className="vp-eyebrow">AI · 2026</span>

AI now sits on both sides of our docs. It helps us write them, and customers ask an AI assistant that answers from them, on the docs site and inside the product. I set up how my team writes with AI, and how we make sure the assistant answers correctly from what we write.

## Writing with AI

**Drafts start from the change itself.** A writer gives Claude the engineer's pull request and its Jira ticket. The pull request shows what changed in the code; the ticket says why and for whom. Claude drafts the page inside the docs repository, so the draft follows our page structure and links to pages that already exist. The writer then verifies the behavior in the product and confirms open points with the engineer before the page goes through review. I made this the way my team starts a page, and pushed engineering to link every pull request to its ticket so the two arrive together.

**Skills that people across the company use.**

- **docs-ui-help** gives Claude a searchable copy of the docs, so anyone can ask a product question in plain words and get an answer with the page it came from. Customer Success builds training material from it, and product and design start their prototypes from it.
- **docs-compass** helps writers draft: a commit-ready page with the site's components, suggested links from the real content tree, and a flag on pages the latest release may have made stale.
- **Release notes to Slack** turns the customer release notes into the company-wide announcement and checks that every item made it in.

**Changes to the product, not just the docs.** With Claude Code, my team raises pull requests in the product's code to add help where users get stuck: in-field help, tooltips, links to the docs and pop-ups. I also use it to build [prototypes](./prototypes.mdx) of my plans before I implement them.

## Docs an AI assistant can answer from

An assistant that answers from the docs is only as good as two things: the pages it reads, and the way it finds the right piece of a page. When an answer was wrong, nobody could tell which of the two had failed. The off-the-shelf chatbot we started with gave us no way to correct a wrong answer at all.

- **Set the requirements.** In November 2025 I wrote the requirements with product and engineering, and argued for our own retrieval pipeline instead of the off-the-shelf chatbot, because only our own pipeline would let us see and fix why an answer went wrong. Engineering built it, and it has been live for every customer since August 2026.
- **Designed the evaluation.** Two rounds: 126 real questions graded by 22 reviewers, each with written instructions and ten questions, scoring correctness, completeness and the cited page as separate judgments.
- **Found out what the assistant actually reads.** Only the title, the breadcrumb, the heading path and the body, cut into pieces by heading and length. Keywords in a page's metadata never reach it, which ruled out the obvious fix of adding keywords.
- **Turned it into seven checks.** Does the page name the thing the reader asked about? Does each section make sense on its own? Is a fact only inside a table? Are prerequisites inside the procedure? Does the page say what the product cannot do? Is each term used one way? Do two pages contradict each other? I built a Claude skill that runs them, and it is now the last check before any page ships.
- **Built a way to watch it.** A review dashboard of usage and answer quality per customer account.

**The rule that came out of it.** If the page behind a wrong answer passes all seven checks, the writer does not touch it. The question goes to engineering as a retrieval problem. Writers fix pages that need fixing, and engineering gets the cases that are really theirs.

## What changed

| | Round one | Round two |
| --- | --- | --- |
| Reviewers | 6, internal | 16, Customer Success and professional services |
| Fully correct | 15 of 39 (about 4 in 10) | 58 of 87 (2 in 3) |
| Incorrect | 13 of 39 (1 in 3) | 11 of 87 (about 1 in 8) |
| Correct page cited | about half | about 4 in 5 |

The questions and reviewers differed between rounds, and retrieval improved at the same time as the docs, so read this as a direction, not a controlled result.

More: the [AI page](/ai) shows the work live, and the full method is in [Writing documentation an AI assistant can answer from](/samples/method/retrieval-ready-docs).
