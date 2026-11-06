---
title: "Preparing customers for releases: one rollout, end to end"
description: How the move to separate development and production environments reached customers in two cohorts, and the release communication I run every two weeks.
sidebar_position: 4
sidebar_label: Release rollout
---

# Preparing customers for releases: one rollout, end to end

<span className="vp-eyebrow">Release communication · September 2026</span>

In September 2026 we introduced separate Development and Production versions for Next-Gen Applications, a change to how customers build and publish their work. Customers needed to know what would change on their rollout day and what to do about it, before it happened. I coordinated the communication for both rollout cohorts, from the internal briefing to the walkthrough video.

## What went out, and when

| When | What went out | My part |
| --- | --- | --- |
| About a week before | An entry in the [Release Hub](./release-hub.md), sorted by what customers must do | Built the Hub and wrote the entry |
| Before rollout | A briefing for Customer Success, and the customer email | Wrote both |
| Rollout, in two cohorts | A customer briefing: the change in one minute, what changes on rollout day, a five-step migration, what stays editable in production, and an FAQ | Wrote it |
| Release day | The release note, a company announcement, and a 3:38 walkthrough video | Wrote the release note and the announcement; produced the video: proposed it, set up the recording, wrote the edit notes and published it |

Our internal environments and four customer environments moved on 19 September, and every other customer environment on 26 September. Customer Success was briefed before the first cohort, and customers had the email and the briefing before their rollout day.

### Read the re-created pieces

The real documents are internal, so these are re-creations for a fictional product, Meridian Studio, that keep the structure and the decisions:

- [Customer briefing](/samples/release-comms/customer-briefing-build-and-live): the change in one minute, what changes on rollout day, the migration steps and an FAQ.
- [Customer Success briefing](/samples/release-comms/internal-briefing-cs-build-and-live): what customer success managers needed to know and say before their customers' rollout day.
- [Published release notes](/writing/release-notes), in their original layout, and the [walkthrough video](/videos).

<div className="wk-excerpt">
<span className="wk-meta">Excerpt · re-created pre-release email</span>

**Action required before 17 March**

If anyone on your team has unsaved changes in the Quick edit bar, please save them before 17 March. Unsaved changes may not carry over when the new experience becomes available.

**What happens on 17 March**

Each existing model automatically becomes its Build workspace. Its link, scenarios, data and user access stay unchanged, so no other immediate action is needed.

[Read the full email](/samples/release-comms/customer-email-build-and-live)
</div>

## Who it applied to

- **Which applications:** only Applications in Next-Gen mode got Development and Production versions. Each Application has a Classic or Next-Gen mode, and Applications in Classic mode were not affected.
- **What happened on deploy:** nothing moved to Production automatically. When a customer chose to deploy an Application, it got a separate Production version with its own link, and the Application was locked to Next-Gen mode from then on.

## Every release

I run release communication on a two-week cadence. Between February 2025 and October 2026 that was more than 40 releases. For each one I wrote the company-wide announcement and wrote or edited the release notes on the docs site.

Along the way I introduced three formats:

- **Video release notes**, from April 2026: walkthroughs from a brief I wrote with a four-beat structure, a presenter questionnaire, tone rules and edit notes. 16 releases now have walkthrough videos.
- **A two-host release podcast** for major releases, from March 2025, scripted with AI and voiced synthetically.
- **A redesigned release notes page**, September 2026: a highlights panel, filters by category, and a top-five section for each release, so readers scan first and open only what they need.
