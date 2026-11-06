---
title: "Docs readers can try"
description: Interactive documentation with 21 try-it demos on 17 pages, so readers check their own case instead of reading a matrix.
sidebar_position: 7
sidebar_label: Try-it docs
---

# Docs readers can try

<span className="vp-eyebrow">Interactive docs · shipped 2026</span>

![Scenario access calculator embedded in a documentation page](/img/work/demo-access-calculator.png)

**What.** 21 "try it" demos embedded in 17 pages, plus decision trees on 15 pages and step-by-step guides on 35. Examples you can use on the [scenarios sample](/samples/scenarios):

- An **access calculator**: pick three settings and see a user's effective permission and the rule that produced it.
- A **sync-and-commit simulator**: tick what two people changed and see what each operation overwrites.
- A **cascade stepper** that walks one change down a tree of scenarios.
- A **create-a-scenario walkthrough**.

The application builder pages also carry a live chart preview for every widget type.

**Why.** Scenario access combines three levels and two rules. A table states that correctly, but a reader still has to apply it to one person. The calculator does that for them. Sync and commit is the same: the costly mistake is overwriting a colleague's work, so the simulator shows exactly which tables each operation replaces.

## My part

I set the direction for interactive docs. I shipped the scenarios and permissions set with its four demos, and built the components the demos depend on: an embed that sizes itself to its content, and a fullscreen control. The demos are plain HTML, CSS and JavaScript, so they need no build step and render anywhere.

Not measured yet: whether readers make fewer permission mistakes after using the calculator. Next step is to log which combinations readers try.

## What this shows

Choosing the form of the content, not just the words: when a table is the wrong tool, build the one the reader needs.
