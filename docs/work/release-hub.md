---
title: "Preparing customers for releases: the Release Hub"
description: A preview of each release sorted by what customers have to do, drafted from Jira and reviewed by a writer, with a pre-release briefing for Customer Success.
sidebar_position: 3
sidebar_label: Release Hub
---

# Preparing customers for releases: the Release Hub

<span className="vp-eyebrow">Release communication · in use since July 2026</span>

A feature list tells Customer Success what's shipping. They also need to know which customers will have to change how they work, what to tell them, and when. I built the Release Hub around those questions, and a briefing where product managers walk Customer Success through it before each release.

![Release Hub board, shown with fictional release data](/img/work/release-hub.png)

*The Release Hub, shown with fictional release data. [Open full size](/img/work/release-hub.png).*

## The problem

Customer Success had no single place to see what was coming in a release, or whether a customer had to act. Without that, they could not prepare a customer for a change in how they work before it shipped.

## What I did

- **Proposed it.** In a product meeting in July 2026 I proposed a preview split into what customers must do and what they may notice. Product adopted it.
- **Sorted every change by what customers have to do.** Four groups, plus one rule for borderline cases: if a change moves a customer's steps, it is flagged, even when nothing breaks.

| Group | Meaning |
| --- | --- |
| Immediate action | The old way stops working. |
| Heads up | The old way still works, but the steps changed. |
| Visible change | Customers will notice it; no action needed. |
| Optional enhancement | Available if they want it; no action needed. |

- **Built the board.** Each change carries what customers need to know, what they should do, what Customer Success should do, release confidence, an owner and a date. Tabs cover the internal briefing, what to share with customers, features that moved between releases, and release history. In August I merged three overlapping dashboards into it.
- **Built the tooling with Claude Code.** A drafter turns a Jira ticket and its dependencies into a proposed entry, and a writer decides what customers need to know or do. A daily job logs changes, drafts customer-ready paragraphs that stay drafts until I review them, and reminds owners when a date is missing.
- **Set up the pre-release briefing.** Product managers walk Customer Success through the Hub before each release, and I follow up on what changes.

### What the drafter does, and what the writer decides

*Illustrative example with a fictional ticket.*

| Ticket | Draft | The writer decides |
| --- | --- | --- |
| PLN-1042: require one approver before a plan goes live. Drafts still save as before. Publishing a plan without an approver is blocked. | Impact: heads up, the old way still works but the steps changed. Customers need to know: plans now need one approver. Customer action: choose an approver for each plan. | Heads up or immediate action? Drafts still save, but publishing without an approver is now blocked, so the old way of going live stops working: immediate action. Add the date the approver must be set by, after checking it with the product manager. |

## What changed

- Customer Success sees what changes for customers about eight days before each release, sorted by whether a customer has to act.
- In its first three months the Hub previewed 47 features across five releases, from six product managers.

> "This is incredible. It addresses one of our top [Customer Success] focus areas." Senior Director, Customer Success

> "The release hub is a life saver!" Customer Success Business Partner

For how one release went from the Hub to customers, see [the development and production rollout](./release-notes.md).
