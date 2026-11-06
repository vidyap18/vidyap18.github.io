---
title: "The Release Hub: what changes for customers, a week ahead"
description: A pre-release preview sorted by what customers must do, published about eight days before each release, with the taxonomy, tools and automation behind it.
sidebar_position: 5
sidebar_label: Release Hub
---

# The Release Hub: what changes for customers, a week ahead

<span className="vp-eyebrow">Release communication · in use since July 2026</span>

![Release Hub board, shown with fictional release data](/img/work/release-hub.png)

**What.** A preview of the next release for customer success, published every Friday about eight days before release. Each change goes into one of four groups:

| Group | Meaning |
| --- | --- |
| Immediate action | The old way stops working. |
| Heads up | The old way still works, but the steps changed. |
| Visible change | Customers will notice it; no action needed. |
| Optional enhancement | Available if they want it; no action needed. |

Each change also carries what customers need to know, what they should do, what customer success should do, release confidence, owner and date. One rule decides the borderline cases: if a change moves a customer's steps, it is flagged, even when nothing breaks.

**Why it mattered.** Customer success had no single place to see what was coming or whether a customer had to act. Now a pre-release session with product managers runs before each release, using the Hub.

> "This is incredible. It addresses one of our top focus areas." Senior Director, Customer Success

> "The Release Hub is a life saver." Customer Success Business Partner

## My part

- **Proposed it** in a product meeting in July 2026 as a "must do / may see" split. Product adopted it.
- **Designed the four groups** and the borderline rule.
- **Built the board**: an HTML page that reads a release tracker, with tabs for the internal briefing, what to share with customers, features that moved between releases, and release history. In August I proposed merging three overlapping dashboards into it, and we did.
- **Built the tooling** with Claude Code. A drafter turns a Jira ticket and its dependencies into a proposed row. A daily job logs changes, drafts customer-ready paragraphs for rows that need action, and reminds owners when a date is missing. A release-note converter checks that the internal announcement covers every item.

## What the drafter does, and what it leaves to a writer

*Illustrative example with a fictional ticket.*

| Ticket | Draft | The writer decides |
| --- | --- | --- |
| PLN-1042: require one approver before a plan goes live. Drafts still save as before. | Impact: heads up, the old way still works but the steps changed. Customers need to know: plans now need one approver. Customer action: choose an approver for each plan. | Heads up or immediate action? Drafts still save, so heads up. Add the date the approver must be set by, after checking it with the product manager. |

## Scale

47 features previewed across five releases in the first three months, from six product managers.

## What this shows

Product thinking applied to communication: a classification people can act on, lead time, owners, and a session where it gets used.
