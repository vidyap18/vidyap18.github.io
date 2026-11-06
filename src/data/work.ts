export type WorkItem = {
  slug: string;
  kicker: string;
  title: string;
  why: string;
  image: string;
  imageAlt: string;
};

export const hero = {
  name: 'Vidya Patil · Senior technical writer and documentation lead',
  headline: 'I write product docs and build the workflows that ship them.',
  text:
    'Thirteen years in enterprise software. For the last two I have headed documentation at an AI supply chain planning platform while writing pages and merging pull requests myself.',
  facts: [
    'Prague',
    'Authorized to work in the Czech Republic',
    'Open to EU remote roles or hybrid in Prague',
    'English, Hindi, Kannada, Marathi',
  ],
  aside:
    "My employer's documentation sits behind a login. The work below uses real numbers. The writing samples are real pages with identifying details masked where I can show them, and labelled re-creations where I cannot.",
};

// Order: the three strongest first (docs-as-code, interactive docs, AI), then release work, then measurement.
export const work: WorkItem[] = [
  {
    slug: 'docs-as-code',
    kicker: 'Docs platform · shipped June 2026',
    title: 'Moving four documentation spaces to docs-as-code',
    why: 'GitBook to a Docusaurus site with pull-request review, previews and CI. 14 people outside the writing team merged docs changes in the five months after go-live.',
    image: '/img/work/persona-led-ia-prototype.png',
    imageAlt: 'Role-based information architecture prototype for the docs site',
  },
  {
    slug: 'try-it-docs',
    kicker: 'Interactive docs · shipped 2026',
    title: 'Docs readers can try',
    why: 'An access calculator, a sync-and-commit simulator and live chart previews on 17 pages, so readers check their own case instead of reading a matrix.',
    image: '/img/work/demo-access-calculator.png',
    imageAlt: 'Scenario access calculator embedded in a documentation page',
  },
  {
    slug: 'ask-ai',
    kicker: 'AI assistant · live since August 2026',
    title: 'Ask AI: making the docs answerable by an assistant',
    why: 'I set the requirements, ran a two-round evaluation with 22 reviewers, and wrote the readiness check each page passes. Fully correct answers rose from about four in ten to two in three.',
    image: '/img/work/ask-ai-dashboard.png',
    imageAlt: 'Ask AI usage dashboard with numbers blurred',
  },
  {
    slug: 'release-hub',
    kicker: 'Release communication · in use since July 2026',
    title: 'The Release Hub: what changes for customers, a week ahead',
    why: 'Every change sorted by what customers must do, published about eight days before release. 47 features previewed across five releases in three months.',
    image: '/img/work/release-hub.png',
    imageAlt: 'Release Hub board with fictional features grouped by customer impact',
  },
  {
    slug: 'release-notes',
    kicker: 'Release notes · since February 2025',
    title: 'Release notes and release videos, every two weeks',
    why: 'More than 40 releases, a rollout package for the biggest change of 2026, and a video and podcast format I introduced.',
    image: '/img/work/release-notes-redesign.png',
    imageAlt: 'Redesigned release notes page with highlights panel and filters',
  },
  {
    slug: 'docs-analytics',
    kicker: 'Measurement · 2026',
    title: 'Deciding what to document next from the data',
    why: 'About half of 222 support tickets in a five-week sample were knowledge gaps. That set the next plan. Also: search analytics and a screenshot audit.',
    image: '/img/work/image-audit-brief.png',
    imageAlt: 'Brief proposing a CSS rule for screenshot borders across the docs',
  },
];

export const moreWork = [
  {slug: 'roadmap', title: 'A roadmap leadership can read', text: 'A Jira-fed roadmap dashboard in plain English, used in the CEO\'s weekly update.'},
  {slug: 'in-product-help', title: 'Help inside the product', text: 'Guided tours, beacons and tooltips, with limits on how often they appear.'},
];

export const quotes = [
  {
    text: 'This is incredible. It addresses one of our top customer-success focus areas.',
    who: 'Senior Director, Customer Success, on the Release Hub',
  },
  {
    text: 'The first thing people noticed and subsequently loved was the Ask AI feature.',
    who: 'Customer Success, on the assistant launch',
  },
  {
    text: 'The release notes we publish showcase a great personality.',
    who: 'Founder and CEO, in the company-wide channel',
  },
];

export const samples = [
  {
    to: '/samples/scenarios',
    kicker: 'User guide · real pages, masked',
    title: 'Scenarios and permissions, with four working try-it demos',
    text: 'Understanding permissions, syncing and committing, and a task page. Real pages with identifying details masked.',
  },
  {
    to: '/samples/forecast',
    kicker: 'User guide · re-created',
    title: 'Train your first forecast model',
    text: 'A nine-step quick start, a retrain how-to, a settings reference, and using the in-product AI assistant.',
  },
  {
    to: '/samples/release-comms',
    kicker: 'Release communication · re-created',
    title: 'A release note and the customer briefing behind it',
    text: "The format I use for changes that move someone's workflow: release note, customer briefing, email, internal briefing, video brief.",
  },
  {
    to: '/samples/api',
    kicker: 'API docs · re-created, not runnable',
    title: 'An API tutorial and the reference page it leads to',
    text: 'From an OpenAPI 3.0 spec written for the sample: tutorial, how-to, reference, explanation.',
  },
  {
    to: '/samples/method/retrieval-ready-docs',
    kicker: 'Method',
    title: 'Writing documentation an AI assistant can answer from',
    text: 'What the assistant sees in a page, the seven checks, and how to triage a wrong answer.',
  },
  {
    to: '/samples/design/per-note-doc-versioning-proposal',
    kicker: 'Design proposal',
    title: 'Per-note documentation versioning',
    text: 'A proposal to engineering, with options, trade-offs and a pilot plan.',
  },
];

export const videos = [
  {id: 'b7rydgtgyf', title: 'October 2026 release highlights', length: '1:15', note: "A whole release in a minute, with links into the docs. Opens the site's What's New."},
  {id: 'nh4bb7rchx', title: 'Development and production environments walkthrough', length: '3:38', note: 'The biggest change of 2026, presented by the product manager from the briefing I wrote.'},
  {id: 'knohl2w7z5', title: 'Semantic model introduction', length: '1:58', note: 'Feature explainer with a synthetic presenter.'},
  {id: 'prrybl0ws7', title: 'Unified application view', length: '1:54', note: 'Feature explainer.'},
  {id: 'rfbmiks1bb', title: 'Adding notes inline', length: '1:43', note: 'A how-to in under two minutes.'},
  {id: 'lwy45h61u4', title: 'Release podcast, first episode', length: '4:56', note: 'The two-host audio format I introduced in March 2025.'},
];
