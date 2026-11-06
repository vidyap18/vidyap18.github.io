// Homepage content. Every claim here is backed by a case study page.

export const hero = {
  name: 'Vidya Patil',
  title: 'Senior Manager, Documentation at Lyric',
  facts: ['Prague', 'Authorized to work in the Czech Republic'],
  line: 'I write release notes and product docs, run the release process behind them, and build the prototypes and AI tools that change how my team works.',
};

// Selected work: one wide feature, then two compact rows.
export const feature = {
  kicker: 'Working prototype',
  title: 'Sync or commit: see what gets overwritten before you click',
  context:
    "Before a sync or a commit, a planner needs to know which tables will be overwritten, theirs or a colleague's. The simulator lets them tick what changed and see the result before they touch real data.",
  demo: '/demos/sync-commit-simulator.html',
  demoTitle: 'Sync and commit simulator: tick what changed and see what each operation overwrites',
  action: {label: 'Try the prototype', to: '/samples/scenarios/syncing-and-committing-scenarios'},
  more: {label: 'See all my prototypes', to: '/work/prototypes'},
};

export const releaseWriting = {
  kicker: 'Release writing',
  title: 'Explaining a change that moves people’s work',
  context: 'For planners whose models were about to split into a draft and a live version. They needed to know nothing would break, and to decide when to promote.',
  excerpt: [
    'Until now, every change a planner saved to a model went live the moment it was saved, in front of everyone using it. A half-finished hierarchy or a renamed measure could land mid-cycle.',
    'Planning models now have two workspaces, Build and Live, so you can change one and keep the other steady.',
    'Nothing is promoted automatically. You decide which models to promote and when.',
  ],
  label: 'Re-created for a fictional product, from a release I wrote.',
  action: {label: 'Read the excerpt', to: '/samples/release-comms/release-note-build-and-live'},
};

export const releaseDelivery = {
  kicker: 'Release delivery',
  title: 'One rollout, from internal preview to publication',
  context: 'Separate development and production environments, rolled out to every customer in September 2026. I owned the communication end to end.',
  steps: [
    {when: 'About a week before', what: 'Internal preview in the Release Hub, sorted by what customers must do'},
    {when: 'Before rollout', what: 'A briefing for customer success, through seven drafts, and the customer email'},
    {when: 'Rollout', what: 'A customer briefing with a five-step migration and an FAQ'},
    {when: 'Release day', what: 'The release note and a 3:38 walkthrough video, which I produced'},
  ],
  result: 'Customers had the email and the briefing before rollout day. The release note and the video went out with the release.',
  action: {label: 'See the rollout', to: '/work/release-notes'},
};

// AI and documentation.
export const aiEvaluation = {
  kicker: 'Evaluating an AI assistant',
  title: 'Is a wrong answer the docs’ fault, or the system’s?',
  context:
    'Our documentation assistant answers customer questions from the docs. I designed its evaluation: 126 graded answers, 22 reviewers, and the cited source graded separately from the answer.',
  table: [
    {label: 'Fully correct', a: '15 of 39', b: '58 of 87'},
    {label: 'Correct source cited', a: 'about half', b: 'about 4 in 5'},
  ],
  tableNote: 'Round one, July 2026, internal reviewers. Round two, July to August, customer-facing teams. Different questions in each round, so read it as a direction.',
  checks: [
    'Does the page name the thing the reader asked about?',
    'Does each section make sense on its own?',
    'Is the fact only in a table?',
    'Are prerequisites inside the procedure?',
    'Does the page say what the product cannot do?',
    'Is each term used one way?',
    'Do two pages contradict each other?',
  ],
  verdict: 'If the page passes all seven, the problem goes to engineering, not to the writer.',
  action: {label: 'See the evaluation', to: '/work/ask-ai'},
};

export const aiTool = {
  kicker: 'Building AI tools for the team',
  title: 'A drafter that turns a ticket into a release preview',
  context: 'I built it with Claude Code. It drafts the customer-facing row; a writer decides what customers are told.',
  input: {
    label: 'Ticket',
    lines: ['PLN-1042 · Require one approver before a plan goes live', 'Drafts still save as before. Approver is set per plan.'],
  },
  draft: {
    label: 'Draft',
    lines: [
      'Impact: Heads up. The old way still works, but the steps changed.',
      'Customers need to know: plans now need one approver before they go live.',
      'Customer action: choose an approver for each plan.',
    ],
  },
  writer: {
    label: 'The writer decides',
    lines: [
      'Heads up or immediate action? Drafts still save, so heads up.',
      'Add the date the approver must be set by, after checking it with the product manager.',
    ],
  },
  label: 'Illustrative example with a fictional ticket.',
  action: {label: 'See the Release Hub', to: '/work/release-hub'},
};

export const aiShipping = {
  kicker: 'Shipping product changes with AI',
  title: 'Writers who change the product, not just the docs',
  items: [
    {
      role: 'Led',
      text: 'My writers ship in-product help straight into the product’s frontend code: info tips, a close control for the chat widget, and removing coach marks that had outlived their use. Six changes merged since September 2026, three more in review, including native info pop-ups that replace a third-party in-app help tool.',
    },
    {
      role: 'Built',
      text: 'A working branch of the docs site that splits keyword search from the AI assistant, so a typed question goes to the assistant instead of returning no results. Engineering shipped the approach in their merged change.',
    },
    {
      role: 'Built',
      text: 'Docs-site code: search analytics, a CI workflow that keeps a last-updated date on about 3,000 pages, and a fullscreen control for embedded video.',
    },
  ],
  action: {label: 'See how the team works with AI', to: '/work/ask-ai#how-the-team-writes-with-ai-now'},
};

export const moreWork = [
  {
    title: 'Moving four documentation spaces to docs-as-code',
    proof: '14 people outside the writing team merged documentation changes in the five months after go-live.',
    to: '/work/docs-as-code',
  },
  {
    title: 'Prototypes',
    proof: 'Six clickable prototypes for navigation, versioning, landing pages and search. Five shipped or were adopted.',
    to: '/work/prototypes',
  },
  {
    title: 'Writing samples',
    proof: 'A user guide with working demos, API docs from an OpenAPI spec, release communication, a method article and a design proposal.',
    to: '/samples',
  },
  {
    title: 'All work',
    proof: 'Interactive docs, the Release Hub, measurement, roadmap communication, in-product help and videos.',
    to: '/work',
  },
];
