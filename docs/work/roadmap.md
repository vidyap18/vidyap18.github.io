---
title: "One roadmap for two audiences"
description: A Jira-fed platform roadmap rebuilt as two views, one for Product and leadership and one for customers, with the process that keeps it current.
sidebar_position: 5
sidebar_label: Roadmap
---

import RoadmapDemo from '@site/src/components/RoadmapDemo';

# One roadmap for two audiences

<span className="vp-eyebrow">Roadmap · in use since September 2026</span>

Product needed to track what each team was building. Customers needed to see what was coming for the decisions they make about demand, supply, inventory and transportation. I rebuilt the platform roadmap from scratch as two views of the same Jira data, and set up the process that keeps it current.

<RoadmapDemo />

*A recreation of both views on one fictional dataset. Switch the view and filter by quarter. [See a screenshot of the internal view](/img/work/roadmap-dashboard.png).*

## The problem

The roadmap lived in Jira, written for engineers. Leadership, Sales and Customer Success needed to know what was coming and when, without reading engineering tickets, and what could be said to customers was not the same as what Product needed internally.

## What I did

- **Built two views from one source.** An internal roadmap organized by team, with a status and a plain-English update on every epic, and a customer-facing version organized by supply chain decision, with internal updates and ticket IDs removed. Both read the Jira-fed data every time they open, so there is no copy to go stale.
- **Set the rules product managers follow.** Only epics go on the roadmap. A product manager puts one there by setting four Jira fields: whether it belongs on the roadmap, the quarter it is planned for, a roadmap status that is separate from the engineering workflow status, and a one-line update in plain English. An optional customer summary in the description is what customers see.
- **Automated the checking.** Every weekday morning a scheduled Claude job compares the data with Jira field by field, lists epics that were added or dropped, and sends me what disagrees.
- **Made updating it a habit.** The roadmap review is one of the sprint checkpoints I run for product managers, and I chase the updates each month and at every quarter close.

## What changed

- About 190 epics now carry a plain-English update.
- Leadership uses the internal view in its weekly update.
- Sales has used the customer view in a roadmap presentation at a customer site.

The process behind it is on the [program management](/program-management) page.
