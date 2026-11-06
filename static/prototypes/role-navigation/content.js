/* ============================================================
   PROTOTYPE CONTENT — proposed persona-led IA for Meridian Studio docs
   v2 — persona-owned content now nests directly under each persona.
   Only genuinely dual-audience content stays in a shared section.
   Not real product data. Existing-page content is adapted from the
   current docs-ui repo (staging) where practical; pages marked
   isNew are genuinely new, proposed content (see Dev/Prod plan).
   ============================================================ */

const BADGE_LABEL = {
  "business-user": "Business User",
  "data-scientist": "Data Scientist",
  "supply-chain-engineer": "Supply Chain Engineer",
  shared: "Shared",
  legacy: "Legacy",
  builder: "Builder",
  everyone: "Everyone",
};

function badgePill(key, sm) {
  if (!key) return "";
  return `<span class="badge-pill badge-${key} ${sm ? "badge-sm" : ""}">${BADGE_LABEL[key] || key}</span>`;
}

/* ---------------- NAVIGATION TREE ---------------- */
const NAV = [
  {
    key: "get-started",
    label: "GET STARTED",
    children: [
      { key: "platform-overview", label: "Platform Overview" },
      { key: "key-concepts", label: "Key Concepts" },
    ],
  },
  {
    key: "business-user-section",
    label: "BUSINESS USER",
    badge: "business-user",
    children: [
      { key: "business-user", label: "Business User" },
      { key: "using-an-application", label: "Using an Application" },
      { key: "personalizing-your-view", label: "Personalizing Your View" },
    ],
  },
  {
    key: "data-scientist-section",
    label: "DATA SCIENTIST",
    badge: "data-scientist",
    children: [
      { key: "data-scientist", label: "Data Scientist" },
      {
        key: "create-your-own-notes-subcat", label: "Create Your Own Notes", isSubcat: true,
        children: [
          { key: "green-notes-overview", label: "Overview (Green Notes)" },
          { key: "create-note", label: "Create a Note" },
          { key: "release-a-note", label: "Release a Note" },
        ],
      },
    ],
  },
  {
    key: "supply-chain-engineer-section",
    label: "SUPPLY CHAIN ENGINEER",
    badge: "supply-chain-engineer",
    children: [
      { key: "supply-chain-engineer", label: "Supply Chain Engineer" },
      { key: "quick-start", label: "Quick Start" },
      {
        key: "building-application-subcat", label: "Building an Application", isSubcat: true,
        children: [
          { key: "getting-started-app", label: "Getting Started" },
          { key: "configuring-data", label: "Configuring Data" },
          { key: "building-interface", label: "Building the Interface" },
          { key: "customizing-appearance", label: "Customizing Appearance" },
          { key: "managing-personalization-admin", label: "Managing Page Personalization" },
          { key: "viewing-audit-logs", label: "Viewing Audit Logs" },
        ],
      },
      { key: "publishing-to-production", label: "Publishing to Production" },
      { key: "sharing-applications", label: "Sharing Applications" },
      {
        key: "transform-notes-subcat", label: "Transform Notes", isSubcat: true,
        children: [
          { key: "transform-notes-overview", label: "Overview" },
          { key: "nct-notes", label: "No-Code Transform (NCT) Notes" },
          { key: "sql-transform-notes", label: "SQL Transform Notes" },
        ],
      },
      {
        key: "syncs-subcat", label: "Syncs", isSubcat: true,
        children: [
          { key: "syncs-overview", label: "Overview" },
          { key: "app-syncs", label: "App Syncs" },
          { key: "global-syncs", label: "Global Syncs" },
        ],
      },
    ],
  },
  {
    key: "build-configure",
    label: "BUILD & CONFIGURE",
    badge: "shared",
    children: [
      {
        key: "data-subcat", label: "Data", isSubcat: true,
        children: [
          { key: "data-overview", label: "Overview" },
          { key: "data-connections", label: "Connections" },
          { key: "data-bridges", label: "Bridges" },
        ],
      },
      {
        key: "notes-sequences-subcat", label: "Notes & Sequences", isSubcat: true,
        children: [
          { key: "notes-overview", label: "Notes" },
          { key: "sequences-overview", label: "Sequences" },
          { key: "note-catalog", label: "Science Note Catalog" },
        ],
      },
    ],
  },
  {
    key: "applications",
    label: "APPLICATIONS",
    badge: "shared",
    children: [
      { key: "applications-overview", label: "Applications Overview" },
      {
        key: "understanding-scenarios-subcat", label: "Understanding Scenarios", isSubcat: true,
        children: [
          { key: "understanding-scenarios", label: "Understanding Scenarios", badge: "shared" },
          { key: "setting-up-scenarios", label: "Setting Up Scenarios", badge: "builder" },
          { key: "managing-scenarios", label: "Managing Scenarios", badge: "everyone" },
          { key: "syncing-committing-scenarios", label: "Syncing & Committing Scenarios", badge: "everyone" },
          { key: "data-layers-scenarios", label: "Understanding Data Layers", badge: "everyone" },
          { key: "troubleshooting-scenarios", label: "Troubleshooting Scenarios", badge: "everyone" },
        ],
      },
      { key: "understanding-dev-prod", label: "Understanding Development and Production", isNew: true },
      { key: "managing-applications-list", label: "Managing the Applications List" },
      {
        key: "classic-applications-subcat", label: "Classic Applications (Legacy)", badge: "legacy", isSubcat: true,
        children: [
          { key: "use-an-application-classic", label: "Use an Application" },
          { key: "switch-classic-nextgen", label: "Switch Between Classic and Next Gen" },
          { key: "configure-an-application-classic", label: "Configure an Application" },
          { key: "manage-scenarios-classic", label: "Manage Scenarios in Applications" },
          { key: "create-visualizations-classic", label: "Create Visualizations" },
          { key: "publish-application-classic", label: "Publish the Application" },
          { key: "table-operations", label: "Table Operations" },
        ],
      },
    ],
  },
  {
    key: "reference-admin",
    label: "REFERENCE & ADMINISTRATION",
    badge: "shared",
    children: [
      { key: "admin-settings", label: "Admin Settings" },
      { key: "sso-integration", label: "SSO Integration" },
      { key: "api-reference", label: "API Reference" },
      { key: "security-datasets", label: "Security & Sample Datasets" },
    ],
  },
];

/* ---------------- helper: card html ---------------- */
function card(pageKey, title, desc, icon) {
  return `<a class="ia-card" href="#/${pageKey}" onclick="navigate('${pageKey}')">
    <div class="ia-card-title">${icon || ""} ${title}</div>
    <div class="ia-card-desc">${desc}</div>
  </a>`;
}
function cardGrid(inner) { return `<div class="card-grid">${inner}</div>`; }
function admonition(type, html) {
  const icon = type === "warning" ? "⚠" : type === "tip" ? "💡" : "ℹ";
  return `<div class="admonition admonition-${type}"><span class="admonition-icon">${icon}</span><div>${html}</div></div>`;
}

/* ================================================================
   PAGE CONTENT
   ================================================================ */
const PAGES = {};

/* ---------- GET STARTED ---------- */

PAGES["platform-overview"] = {
  title: "Meridian Studio",
  breadcrumb: ["Get Started"],
  badges: ["shared"],
  html: `
    <p class="lede">Meridian Studio is the platform where supply chain teams build, run, and manage intelligent planning solutions. It brings together data, algorithms, workflows, and planning applications in a single environment so that business users, data scientists, and supply chain engineers can work from a shared foundation without handing work across disconnected tools.</p>
    <p>Whether you are a planner reviewing forecasts, a data scientist tuning a model, or an engineer wiring up a pipeline, Meridian Studio gives you the layer of the platform you need, and a clear view into the layers above and below it.</p>
    <h2>Find Your Path</h2>
    <p>Meridian Studio serves different users in different ways. Pick the role closest to yours &mdash; each section below is a self-contained home for that role's day-to-day work, not just a link out to a shared bucket.</p>
    ${cardGrid(
      card("business-user", "Business User " + badgePill("business-user", true), "Review forecasts, manage scenarios, and act on recommendations in a planning application.") +
      card("data-scientist", "Data Scientist " + badgePill("data-scientist", true), "Build, configure, and validate the models that power Meridian's recommendations.") +
      card("supply-chain-engineer", "Supply Chain Engineer " + badgePill("supply-chain-engineer", true), "Design data pipelines, author Sequences, and build and publish applications planners rely on.")
    )}
    <div class="relocated-note">Proposed change: the current homepage has a separate, shorter "Find Your Path" widget that doesn't link to the full persona pages below. This prototype merges them into one entry point.</div>
    <h2>Shared foundations</h2>
    <p>A few things are genuinely used by more than one persona and stay in one canonical place, cross-linked from wherever they're needed:</p>
    ${cardGrid(
      card("data-overview", "Data", "Connect source systems and manage the data both Data Scientists and Supply Chain Engineers build on.") +
      card("understanding-scenarios", "Understanding Scenarios", "Used daily by Business Users, set up by Supply Chain Engineers.") +
      card("understanding-dev-prod", "Development & Production " + badgePill("new", true), "What the two versions of an Application mean, for whoever touches either one.")
    )}
    <h2>Key Concepts</h2>
    ${cardGrid(card("key-concepts", "Key Concepts", "A plain-language guide to the building blocks of Meridian Studio."))}
  `,
};

PAGES["key-concepts"] = {
  title: "Key Concepts",
  breadcrumb: ["Get Started"],
  badges: ["shared"],
  html: `
    <p class="desc">This page defines the terms you will encounter across Meridian Studio. Use it as your reference when something is unfamiliar, whether you are building your first Sequence, configuring an Application, or managing your team's access.</p>
    <div class="relocated-note">Unchanged from the current docs — remains the single canonical glossary, linked from every persona section and every shared section below.</div>
    <h3>Start here if you are new</h3>
    <table>
      <tr><th>Term</th><th>Description</th></tr>
      <tr><td><a href="#/notes-overview" onclick="navigate('notes-overview')"><strong>Note</strong></a></td><td>A unit that takes inputs (data or parameters) and produces outputs. Notes are the building blocks of everything you create in Meridian Studio.</td></tr>
      <tr><td><a href="#/sequences-overview" onclick="navigate('sequences-overview')"><strong>Sequence</strong></a></td><td>A connected chain of Notes that defines a complete data workflow, from ingestion through transformation and output.</td></tr>
      <tr><td><strong>Composition</strong></td><td>An organizational container that holds all Sequences and Applications for a given solution.</td></tr>
      <tr><td><a href="#/applications-overview" onclick="navigate('applications-overview')"><strong>Application</strong></a></td><td>A canvas where users design interactive interfaces using charts, tables, filters, pivots, and other widgets.</td></tr>
      <tr><td><a href="#/understanding-scenarios" onclick="navigate('understanding-scenarios')"><strong>Scenario</strong></a></td><td>A copy of planning data that lets users simulate different business situations without affecting the main dataset.</td></tr>
      <tr><td><strong>Signature Scenario</strong></td><td>The system-provided default Scenario that holds the most current version of planning data.</td></tr>
    </table>
    <h3>Access and Administration <span class="badge-pill badge-new badge-sm">Proposed additions</span></h3>
    <table>
      <tr><th>Term</th><th>Description</th></tr>
      <tr><td><strong>Development</strong> <span class="badge-pill badge-new badge-sm">new entry</span></td><td>The version of an Application where Creators build, change, and validate. Changes appear immediately here.</td></tr>
      <tr><td><strong>Production</strong> <span class="badge-pill badge-new badge-sm">new entry</span></td><td>The stable version of an Application that Consumers work in day to day. Only updated when a Creator publishes.</td></tr>
      <tr><td><strong>Builder mode / User mode</strong> <span class="badge-pill badge-new badge-sm">new entry</span></td><td>The toggle that switches between building an Application's interface and experiencing it as a Consumer would.</td></tr>
      <tr><td><strong>Creator</strong> <span class="badge-pill badge-new badge-sm">new entry</span></td><td>The role that builds, configures, tests, and publishes Applications. Works primarily in Development.</td></tr>
      <tr><td><strong>Consumer / Business User</strong> <span class="badge-pill badge-new badge-sm">new entry</span></td><td>The role that uses Applications for day-to-day planning work. Works primarily in Production.</td></tr>
      <tr><td><strong>Workspace</strong></td><td>An isolated area within an organization where users, permissions, and data are segmented.</td></tr>
      <tr><td><strong>Privilege</strong></td><td>A studio-wide permission that controls what a user can do across the entire Meridian instance.</td></tr>
    </table>
    <p class="stub-note">Full glossary (Note Types, Transformations, Execution, Applications, Predictions) unchanged — condensed here for the prototype.</p>
  `,
};

/* ---------- BUSINESS USER (persona owns its content directly) ---------- */

PAGES["business-user"] = {
  title: "Business User",
  breadcrumb: [],
  badges: ["business-user"],
  html: `
    <div class="persona-hero hero-business-user">
      <div class="tagline">Review plans. Make decisions. Keep the business moving.</div>
      <p class="desc-text">Models generate forecasts, recommendations, and optimization results behind the scenes. Your Application turns those outputs into interactive planning interfaces where teams can review plans, test alternatives, make adjustments, and take action. No exports. No handoffs. No waiting for reports.</p>
    </div>
    <div class="relocated-note">Everything you need day to day now lives directly in this section — you shouldn't need to visit a generic "Applications" area to find your own tasks.</div>
    <h2>Your workflow in Meridian</h2>
    <p>Most of what you do in Meridian follows three steps: review the latest outputs, adjust where the numbers need your judgment, and execute when the plan is ready.</p>

    <div class="phase-block">
      <div class="phase-block-header"><div class="phase-num">1</div><h3>Review</h3></div>
      <div class="phase-hint">Understand what's happening before acting</div>
      <p class="phase-lead">Review KPIs, explore trends, drill into exceptions, and understand what's driving performance before deciding what to do next.</p>
      ${cardGrid(
        card("using-an-application", "Charts and tables", "KPI summaries surface what matters. Charts reveal trends. Tables and pivots let you investigate in detail.") +
        card("using-an-application", "Filters and drill-downs", "Refine results by region, product, customer, or time period.")
      )}
    </div>

    <div class="phase-block">
      <div class="phase-block-header"><div class="phase-num">2</div><h3>Adjust</h3></div>
      <div class="phase-hint">Apply your judgment where models can't</div>
      <p class="phase-lead">Models provide recommendations, but planning decisions often require information they don't have. Adjust values and test assumptions before committing changes.</p>
      ${cardGrid(
        card("using-an-application", "Overrides", "Edit values directly in tables and data grids without exporting to spreadsheets.") +
        card("understanding-scenarios", "Scenarios " + badgePill("shared", true), "Create alternative versions of your plan, test assumptions, and compare outcomes side by side.")
      )}
    </div>

    <div class="phase-block">
      <div class="phase-block-header"><div class="phase-num">3</div><h3>Execute</h3></div>
      <div class="phase-hint">Move the plan forward when it's ready</div>
      <p class="phase-lead">Once you've reviewed the data and validated your decisions, move the plan forward. Trigger workflows, refresh calculations, and commit approved changes.</p>
      ${cardGrid(
        card("using-an-application", "Actions", "Rerun forecasts, launch replenishment calculations, and trigger operational workflows.") +
        card("syncing-committing-scenarios", "Commit and sync " + badgePill("shared", true), "Merge approved scenario changes into the main plan, or pull the latest data into your working copy.")
      )}
    </div>

    <div class="phase-block" style="border-color: var(--tag-info-border);">
      <div class="phase-block-header"><div class="phase-num" style="background:var(--tag-info-background);color:var(--tag-info-foreground)">🆕</div><h3>What Development and Production mean for you</h3></div>
      <p class="phase-lead">You work in <strong>Production</strong> &mdash; the stable version of the Application your team relies on day to day. Your Creator makes and tests changes separately in <strong>Development</strong> before publishing them to you, so you're never interrupted by unfinished work. If your Creator asks you to try something before it goes live, they'll give you access to Development too &mdash; you'll see both versions and can switch between them.</p>
      ${cardGrid(card("understanding-dev-prod", "Understanding Development and Production " + badgePill("new", true) + " " + badgePill("shared", true), "What the two versions mean, what you can do in each, and how to tell which one you're in."))}
    </div>

    <div class="where-to-start">
      <h3>Where to start</h3>
      <p>Open your <a href="#/using-an-application" onclick="navigate('using-an-application')">Application</a> and start with reviewing the interfaces. When the plan looks good, commit it and let your team know.</p>
    </div>
  `,
};

PAGES["using-an-application"] = {
  title: "Using an Application",
  breadcrumb: ["Business User"],
  badges: ["business-user"],
  html: `
    <p class="desc">Your Application is built, published, and ready to use. Whether you're reviewing data, exploring different planning scenarios, or collaborating with teammates, this guide walks you through the tasks you'll perform most often.</p>
    <div class="admonition admonition-tip"><span class="admonition-icon">💡</span><div>New to Meridian Studio? <a href="#/key-concepts" onclick="navigate('key-concepts')">Key Concepts</a> introduces Application, Scenario, Signature Scenario, Widget, Page, and more.</div></div>
    <h3>Opening Your Application</h3>
    <p>Every planning session starts here. Visit the <a href="#/managing-applications-list" onclick="navigate('managing-applications-list')">Applications</a> page to view, launch, or pin the Applications you use most often.</p>
    <h3>Reviewing Your Data</h3>
    <p>Charts, Tables, Pivots, Maps, Indicators, and Lists are your main tools for visualizing and interacting with data. Use page filters to update every widget on a page, or widget filters to focus on a single visualization.</p>
    <h3>Making Adjustments</h3>
    <p>Update charts, tables, or pivots to refine your plan. Every change stays in your current Scenario, including the Signature Scenario, so you can experiment freely without affecting other Scenarios until you're ready to commit.</p>
    <ul>
      <li><strong>Update Data:</strong> Edit values in Tables and Pivots, then save them to your Scenario.</li>
      <li><strong>Explore Data:</strong> Drill down with Heatmap and Bar Chart drill-downs.</li>
    </ul>
    <h3>Testing Assumptions With Scenarios</h3>
    <p>"What if?" is where Scenarios shine. Create alternative plans, compare outcomes, and test ideas without changing the shared plan until you're confident.</p>
    ${cardGrid(
      card("setting-up-scenarios", "Create a Scenario", "Build an alternative version of your plan.") +
      card("managing-scenarios", "Compare Scenarios", "Review outcomes side by side.") +
      card("syncing-committing-scenarios", "Commit to Parent", "Merge approved changes into the shared plan.") +
      card("syncing-committing-scenarios", "Sync from Parent", "Pull the latest shared data into your working Scenario.")
    )}
    <h3>Personalizing Your View</h3>
    <p>Personalize widgets and pages to match how you like to work. Your changes are saved only to your account &mdash; everyone else continues to see the original Application. See <a href="#/personalizing-your-view" onclick="navigate('personalizing-your-view')">Personalizing Your View</a> for the full options.</p>
    <h3>Putting the Plan Into Action</h3>
    <p>Run Actions directly from your Application to execute forecasts, replenishment calculations, and other operational workflows.</p>
    <h3>Sharing with Teammates</h3>
    <p>Planning works best when everyone is on the same page. If you need to grant a new teammate access, ask your Application's Creator &mdash; see <a href="#/sharing-applications" onclick="navigate('sharing-applications')">Sharing Applications</a> for how they do it.</p>
    <div class="admonition admonition-info"><span class="admonition-icon">ℹ</span><div><strong>Working in Production:</strong> the tasks above happen in the Application's Production version. If you've been given access to test in Development too, you'll see a toggle to switch between them &mdash; see <a href="#/understanding-dev-prod" onclick="navigate('understanding-dev-prod')">Understanding Development and Production</a>.</div></div>
  `,
};
PAGES["personalizing-your-view"] = { title: "Personalizing Your View", breadcrumb: ["Business User"], badges: ["business-user"],
  html: `<p class="desc">Personalize charts, tables, and pivots &mdash; filters, sorting, columns, styling. Changes are saved only to your account. Review or reset personalizations from the Personalized badge.</p><p class="stub-note">Content preview — unchanged from the current docs (relocated here from the old "Building Application" section — this is the day-to-day, Business-User-facing personalization task; the builder-side defaults live under Supply Chain Engineer's <a href="#/managing-personalization-admin" onclick="navigate('managing-personalization-admin')">Managing Page Personalization</a>).</p>` };

/* ---------- DATA SCIENTIST (persona owns its content directly) ---------- */

PAGES["data-scientist"] = {
  title: "Data Scientist",
  breadcrumb: [],
  badges: ["data-scientist"],
  html: `
    <div class="persona-hero hero-data-scientist">
      <div class="tagline">More time on strategic algorithms. Less time on infrastructure.</div>
      <p class="desc-text">Write your models in Python, wire them into Sequences, and let Meridian handle compute, scheduling, and data flow. Your outputs feed directly into the supply chain plans the planning team acts on every day.</p>
    </div>
    <div class="relocated-note">Create Your Own Notes (Green Notes) now nests directly under this section &mdash; it's your core identity, not a generic "build" bucket you share with everyone.</div>

    <div class="phase-block">
      <div class="phase-block-header"><div class="phase-num">1</div><h3>Build</h3></div>
      <div class="phase-hint">Primary tool: Green Notes</div>
      <p class="phase-lead">A Green Note is a blank canvas. Write Python, import packages, call external APIs, and connect to your own data sources. If no pre-built Science Note covers your problem, this is where you build your solution.</p>
      ${cardGrid(
        card("green-notes-overview", "Develop a Green Note", "Write Python in the Studio editor or develop locally and push back into Meridian.") +
        card("data-connections", "Connect Data Sources " + badgePill("shared", true), "Data Source Notes support local files, AWS S3, PostgreSQL, and Snowflake.")
      )}
    </div>

    <div class="phase-block">
      <div class="phase-block-header"><div class="phase-num">2</div><h3>Deploy</h3></div>
      <div class="phase-hint">Replace cron jobs with Sequences</div>
      <p class="phase-lead">Wire your Green Note into a Sequence and Meridian handles the rest: managed compute, scheduled runs, and data piped automatically from one Note to the next.</p>
      ${cardGrid(
        card("sequences-overview", "Build a Sequence " + badgePill("shared", true), "Chain Data Source Notes, Transform Notes, your Green Note, and Science Notes in order.") +
        card("sequences-overview", "Schedule and Run " + badgePill("shared", true), "Set your Sequence to run on a schedule &mdash; no separate infrastructure to maintain.")
      )}
    </div>

    <div class="phase-block">
      <div class="phase-block-header"><div class="phase-num">3</div><h3>Accelerate</h3></div>
      <div class="phase-hint">Check the catalog before building from scratch</div>
      <p class="phase-lead">Most supply chain ML problems have a pre-built starting point in the catalog. Use Science Notes as accelerators, or as a foundation for your own approach.</p>
      ${cardGrid(
        card("note-catalog", "Science Note Catalog " + badgePill("shared", true), "Pre-built algorithms covering inventory optimization, demand propagation, network design, and more.") +
        card("green-notes-overview", "Prediction Workspace", "Run classification, regression, and demand forecasting experiments without writing code.")
      )}
    </div>

    <div class="admonition admonition-info">
      <span class="admonition-icon">ℹ</span>
      <div><strong>Note on "publishing":</strong> your work is <em>released to the Note Catalog</em> &mdash; a different action from publishing an Application to Production, which lives under <a href="#/supply-chain-engineer" onclick="navigate('supply-chain-engineer')">Supply Chain Engineer</a>. Kept in separate sections deliberately so the two "release/publish" actions don't get confused.</div>
    </div>

    <div class="where-to-start">
      <h3>Where to start</h3>
      <p>Check the <a href="#/note-catalog" onclick="navigate('note-catalog')">Science Note Catalog</a> first. If a pre-built algorithm covers your use case, wire it into a Sequence and move on. If you need custom logic, build a Green Note, then <a href="#/release-a-note" onclick="navigate('release-a-note')">release it to the catalog</a>.</p>
    </div>
  `,
};

PAGES["green-notes-overview"] = {
  title: "Overview (Green Notes)",
  breadcrumb: ["Data Scientist", "Create Your Own Notes"],
  badges: ["data-scientist"],
  html: `
    <p class="desc">Green Notes let you run your own code inside Meridian Studio, with the same interface and capabilities as Blue Notes, but with your logic inside.</p>
    <h3>What You Can Do With Green Notes</h3>
    <ul>
      <li><strong>Develop and Test in Studio</strong> &mdash; use Build mode to configure code and inputs, then Test mode to run with data before release.</li>
      <li><strong>Work Locally or in the Cloud</strong> &mdash; clone the Note's Git repo, develop in your preferred environment.</li>
      <li><strong>Version and Release</strong> &mdash; iterate in draft, then release a versioned Green Note when ready.</li>
    </ul>
    <div class="admonition admonition-info"><span class="admonition-icon">ℹ</span><div><strong>This is a different "release" than Publishing to Production.</strong> Releasing a Note makes it available in the Note Catalog for use in any Sequence. It has nothing to do with an Application's Development or Production version.</div></div>
    <p class="stub-note">Content preview — the full Create Your Own Notes section (configure code, data schema, settings, compute, secrets, sharing) unchanged from the current docs.</p>
  `,
};
PAGES["create-note"] = { title: "Create a Note", breadcrumb: ["Data Scientist", "Create Your Own Notes"], badges: ["data-scientist"],
  html: `<p class="desc">Step-by-step: create a new Green Note, configure its schema, and begin developing.</p><p class="stub-note">Content preview — unchanged from the current docs.</p>` };
PAGES["release-a-note"] = { title: "Release a Note", breadcrumb: ["Data Scientist", "Create Your Own Notes"], badges: ["data-scientist"],
  html: `<p class="desc">Once development and testing are complete, release the Note to convert it from a Gray Note to a Green Note, making it available for production use in the Note Catalog.</p>
  <div class="admonition admonition-warning"><span class="admonition-icon">⚠</span><div>Kept physically separate from Supply Chain Engineer's Publishing to Production on purpose &mdash; this page's "release" and "production use" language is about the Note Catalog, unrelated to an Application's Production version.</div></div>
  <p class="stub-note">Content preview — Release Type (Stable/Beta/Legacy) and Release to Catalog flow unchanged from the current docs.</p>` };

/* ---------- SUPPLY CHAIN ENGINEER (persona owns its content directly) ---------- */

PAGES["supply-chain-engineer"] = {
  title: "Supply Chain Engineer",
  breadcrumb: [],
  badges: ["supply-chain-engineer"],
  html: `
    <div class="persona-hero hero-supply-chain-engineer">
      <div class="tagline">You make the data move. Meridian makes sure it always does.</div>
      <p class="desc-text">You build and maintain the Sequences, schema mappings, and transformations that feed the supply chain. Meridian gives you Source Connections, NCT Notes, and automated Sequences so that work does not rely on custom scripts or external schedulers.</p>
    </div>
    <div class="relocated-note">Building an Application, Publishing to Production, Sharing Applications, Transform Notes, and Syncs all now nest directly under this section &mdash; previously scattered across "Applications," "Transform Notes," and "Syncs" as separate top-level areas you'd have had to already know to look in.</div>

    <div class="phase-block">
      <div class="phase-block-header"><div class="phase-num">1</div><h3>Connect Your Data</h3></div>
      <div class="phase-hint">Primary tools: Data Source Notes, NCT Notes</div>
      <p class="phase-lead">A connection layer pulls directly from your source systems. A transform layer lets you filter, join, aggregate, and reshape that data before it reaches the Science Note.</p>
      ${cardGrid(
        card("data-connections", "Data Source Notes " + badgePill("shared", true), "Upload files directly, or pull from a Source Connection.") +
        card("nct-notes", "NCT Notes", "Filter, Join, Aggregate, Union, Sort, and SQL Transform &mdash; no custom code required.")
      )}
    </div>

    <div class="phase-block">
      <div class="phase-block-header"><div class="phase-num">2</div><h3>Build Your Model</h3></div>
      <div class="phase-hint">Primary tools: Note Catalog, Entity Relationship Diagram</div>
      <p class="phase-lead">Browse the catalog of pre-built Science Notes before writing anything custom. For logic the catalog doesn't cover, create a Green Note with a Python canvas.</p>
      ${cardGrid(
        card("note-catalog", "Note Catalog " + badgePill("shared", true), "Pre-built Science Notes covering inventory optimization, demand propagation, and route optimization.") +
        card("sequences-overview", "Entity Relationship Diagram " + badgePill("shared", true), "A visual map of every table in your Composition and how they join.")
      )}
    </div>

    <div class="phase-block">
      <div class="phase-block-header"><div class="phase-num">3</div><h3>Deliver for the Business</h3></div>
      <div class="phase-hint">Primary tools: Visualizations, Scenarios</div>
      <p class="phase-lead">Meridian Applications surface your Sequence outputs as charts, maps, tables, and dashboards. You configure which pages exist, what each visualization shows, and how Scenarios are structured.</p>
      ${cardGrid(
        card("building-interface", "Visualizations", "Build charts, maps, tables, and dashboards inside the Meridian Application.") +
        card("understanding-scenarios", "Scenarios " + badgePill("shared", true), "Define the Signature Scenario once. Planners run parent-child Scenarios to test assumptions.")
      )}
    </div>

    <div class="phase-block" style="border-color: var(--tag-purple-border);">
      <div class="phase-block-header"><div class="phase-num" style="background:var(--tag-purple-background);color:var(--tag-purple-foreground)">4</div><h3>Publish</h3></div>
      <div class="phase-hint">Primary tool: Publishing to Production</div>
      <p class="phase-lead">Everything above happens in Development. When the Application is ready for planners to rely on day to day, publish it to Production &mdash; your changes stay isolated from consumers until you do.</p>
      ${cardGrid(
        card("publishing-to-production", "Publish to Production " + badgePill("new", true), "First publish vs. later publishes, carrying over scenario data and access, and the new Production URL.") +
        card("sharing-applications", "Sharing Applications", "Grant Development-only, Production-only, or both access, per user or group.") +
        card("understanding-dev-prod", "What you can (and can't) change in Production " + badgePill("new", true) + " " + badgePill("shared", true), "The reference for what stays editable once an Application is live.")
      )}
    </div>

    <h2>Your other tools</h2>
    ${cardGrid(
      card("transform-notes-overview", "Transform Notes", "Filter, Join, Aggregate, Union, Sort, and SQL Transform Notes.") +
      card("syncs-overview", "Syncs", "Trigger-and-action automations across a single Application or across your whole Composition.") +
      card("quick-start", "Quick Start", "An end-to-end tutorial: Composition to Sequence to published Application.")
    )}

    <div class="where-to-start">
      <h3>Where to start</h3>
      <p>The fastest path starts at the data layer. Add a <a href="#/data-connections" onclick="navigate('data-connections')">Data Source Note</a>, then an <a href="#/nct-notes" onclick="navigate('nct-notes')">NCT Note</a> to reshape the fields. Browse the Note Catalog for a Science Note that fits, or create a Green Note for custom logic. Then <a href="#/building-interface" onclick="navigate('building-interface')">configure the Application</a>, and when it's ready for planners, <a href="#/publishing-to-production" onclick="navigate('publishing-to-production')">publish it to Production</a>.</p>
    </div>
  `,
};

PAGES["quick-start"] = { title: "Quick Start", breadcrumb: ["Supply Chain Engineer"], badges: ["supply-chain-engineer"],
  html: `<p class="desc">An end-to-end tutorial: create a Composition and Sequence, add Notes, build an interface, and publish your first Application.</p><p class="stub-note">Content preview — the final "Publish and share" step will be updated to reflect the new first-publish carryover choices and Production URL (see the Dev/Prod documentation plan). Rest of the tutorial unchanged.</p>` };

PAGES["getting-started-app"] = {
  title: "Getting Started",
  breadcrumb: ["Supply Chain Engineer", "Building an Application"],
  badges: ["supply-chain-engineer"],
  html: `
    <p class="desc">An Application is your canvas: a space where you design interfaces with charts, filters, tables, pivots, and other interactive elements.</p>
    <h3>Create a Next Gen Application</h3>
    <ol>
      <li>Log in to Meridian Studio and open (or create) a Composition.</li>
      <li>Create a Sequence and run it to generate output tables.</li>
      <li>Add tables via Managed Tables and Semantic Model.</li>
      <li>Add a page, then add widgets: charts, tables, pivots, filters.</li>
      <li>Preview your application, then publish it.</li>
    </ol>
    <div class="relocated-note">Step 5 updated: the old flow ended with "click Publish Changes." That button is being replaced &mdash; editing is now live (WYSIWYG) in Development, and publishing is a separate, deliberate step. See <a href="#/publishing-to-production" onclick="navigate('publishing-to-production')">Publishing to Production</a> ${badgePill("new", true)}.</div>
    <h3>What's Next</h3>
    ${cardGrid(
      card("using-an-application", "Using an Application " + badgePill("business-user", true), "How Business Users will review data and take action.") +
      card("understanding-scenarios", "Understanding Scenarios " + badgePill("shared", true), "Test assumptions without changing your Signature Scenario.") +
      card("publishing-to-production", "Publishing to Production " + badgePill("new", true), "When your Application is ready for planners to rely on.")
    )}
  `,
};
PAGES["configuring-data"] = { title: "Configuring Data", breadcrumb: ["Supply Chain Engineer", "Building an Application"], badges: ["supply-chain-engineer"],
  html: `<p class="desc">Select the tables that contain your metrics and attributes, then build your Semantic Model &mdash; classify columns as Attributes or Measures, define relationships, and add calculated fields.</p><p class="stub-note">Content preview — Managed Tables, Semantic Model, How Data and Schema Flow, and Validations unchanged from the current docs. This structural configuration work happens in Development.</p>` };
PAGES["building-interface"] = { title: "Building the Interface", breadcrumb: ["Supply Chain Engineer", "Building an Application"], badges: ["supply-chain-engineer"],
  html: `<p class="desc">Design pages and layouts, then add interactive widgets &mdash; charts, tables, pivots, filters, maps, indicators &mdash; to build the interface planners will use.</p>
  <div class="relocated-note">Updated: the Config/Preview mode toggle previously used while building is replaced by the Builder/User mode toggle (same underlying concept, new name, consistent with the rest of the Applications area).</div>
  <p class="stub-note">Content preview — Setting Up the Application Interface, Using Widgets in Your Application (charts, tables, pivots, filters, maps, indicators, inputs, lists) unchanged from the current docs.</p>` };
PAGES["customizing-appearance"] = { title: "Customizing Appearance", breadcrumb: ["Supply Chain Engineer", "Building an Application"], badges: ["supply-chain-engineer"],
  html: `<p class="desc">Set theming and appearance for the whole Application &mdash; colors, logos, and layout defaults.</p><p class="stub-note">Content preview — unchanged from the current docs. This is Development-only; changes reach Production only after publishing.</p>` };
PAGES["managing-personalization-admin"] = { title: "Managing Page Personalization", breadcrumb: ["Supply Chain Engineer", "Building an Application"], badges: ["supply-chain-engineer"],
  html: `<p class="desc">Set the default layout and personalization behavior for a page. (Business Users personalizing their own view is covered separately &mdash; see <a href="#/personalizing-your-view" onclick="navigate('personalizing-your-view')">Personalizing Your View</a>.)</p><p class="stub-note">Content preview — unchanged from the current docs.</p>` };
PAGES["viewing-audit-logs"] = { title: "Viewing Audit Logs", breadcrumb: ["Supply Chain Engineer", "Building an Application"], badges: ["supply-chain-engineer"],
  html: `<p class="desc">Audit Logs provide a running record of every data change made through Table, Pivot, and Data Grid widgets on your pages.</p><p class="stub-note">Content preview — unchanged from the current docs.</p>` };

PAGES["publishing-to-production"] = {
  title: "Publishing to Production",
  breadcrumb: ["Supply Chain Engineer"],
  badges: ["supply-chain-engineer"],
  isNew: true,
  html: `
    <p class="lede">When your Application is ready for Consumers to rely on, publish it from Development to Production.</p>
    <h2>First publish</h2>
    <p>The first time you publish an Application, you're prompted with two choices that are only available at this stage:</p>
    <ul>
      <li><strong>Carry over scenario data</strong> &mdash; by default the Signature scenario, or choose others. This lets Production start with the data already in use in Development.</li>
      <li><strong>Copy user permissions</strong> &mdash; carries over the users and groups who already have access, so you don't have to re-add them in Production.</li>
    </ul>
    <p>Once you confirm, Meridian provisions the Production version. Depending on the size of your Sequence, this can take anywhere from under a minute to around ten minutes.</p>
    <h2>Subsequent publishes</h2>
    <p>Later publishes update Production with your latest Development changes. The first-publish carryover choices above are not offered again &mdash; scenario data and access in Production are managed independently after the first publish.</p>
    <div class="admonition admonition-warning"><span class="admonition-icon">⚠</span><div><strong>Action schedules never carry over.</strong> Any schedule created in Development must be manually recreated in Production after every publish where it matters. This is one of the most important readiness checks before going live.</div></div>
    <h2>What changes after publishing</h2>
    <ul>
      <li>Production gets its own, separate URL. Your existing Development URL keeps working, unchanged.</li>
      <li>Share the new Production URL with your Consumers and have them use it going forward.</li>
      <li>Review who should keep access to Development &mdash; most Consumers won't need it, but anyone testing changes for you should. See <a href="#/sharing-applications" onclick="navigate('sharing-applications')">Sharing Applications</a>.</li>
    </ul>
    <hr/>
    <h2>Moving an existing application to Production</h2>
    <p>If you're publishing an application that already has real users and data, a few extra steps make the transition smooth:</p>
    <ol>
      <li><strong>Identify production-ready applications.</strong> Start with applications that are actively used, support recurring workflows, and need to stay stable while you keep building. You don't need to move everything at once.</li>
      <li><strong>Complete the first publish</strong>, carrying over the scenarios and users your team already depends on (see above).</li>
      <li><strong>Recreate action schedules</strong> in Production &mdash; they were not carried over.</li>
      <li><strong>Share the Production URL</strong> and direct your team to use it going forward. Your existing Development URL keeps working, so nothing breaks on rollout day.</li>
      <li><strong>Review access.</strong> A typical setup: Creators get both Development and Production; most Consumers get Production only; a few Consumers testing your next round of changes get Development too.</li>
    </ol>
    <div class="admonition admonition-info"><span class="admonition-icon">ℹ</span><div>Nothing changes automatically. Existing applications continue to work exactly as they do today until you choose to publish them.</div></div>
    ${cardGrid(card("understanding-dev-prod", "Understanding Development and Production " + badgePill("new", true) + " " + badgePill("shared", true), "The concepts and the full editability reference."))}
  `,
};
PAGES["sharing-applications"] = {
  title: "Sharing Applications",
  breadcrumb: ["Supply Chain Engineer"],
  badges: ["supply-chain-engineer"],
  html: `
    <p class="desc">Share your Application with your team by assigning permissions to users or groups.</p>
    <div class="relocated-note">Relocated from the current <code>manage-interfaces.md</code>. This is where the Development/Production access dimension gets added &mdash; you'll be able to grant a user Development-only, Production-only, or both, per Application.</div>
    <table>
      <tr><th>Capability</th><th>App Admin</th><th>Read/Write</th><th>Read Only</th></tr>
      <tr><td>View Data Grid</td><td>✔️</td><td>✔️</td><td>✔️</td></tr>
      <tr><td>Edit Data Grid</td><td>✔️</td><td>✔️</td><td>✖️</td></tr>
      <tr><td>Create/Copy Scenarios</td><td>✔️</td><td>✔️</td><td>✖️</td></tr>
      <tr><td>Manage User Permissions</td><td>✔️</td><td>✖️</td><td>✖️</td></tr>
      <tr><td>Edit App Configuration</td><td>✔️</td><td>✖️</td><td>✖️</td></tr>
    </table>
    <p class="stub-note">Content preview — full Add User / Add Group flow unchanged from the current docs.</p>
  `,
};

PAGES["transform-notes-overview"] = { title: "Transform Notes — Overview", breadcrumb: ["Supply Chain Engineer", "Transform Notes"], badges: ["supply-chain-engineer"],
  html: `<p class="desc">A Transform Note enables you to transform data as required. Meridian Studio provides two types: No-Code Transform Notes and SQL Transform Notes.</p>
  <div class="relocated-note">Moved out of the old shared "Transform Notes" top-level section &mdash; Data Scientist's own workflow never uses NCT Notes, so this belongs with Supply Chain Engineer only.</div>` };
PAGES["nct-notes"] = { title: "No-Code Transform (NCT) Notes", breadcrumb: ["Supply Chain Engineer", "Transform Notes"], badges: ["supply-chain-engineer"],
  html: `<p class="desc">A library of visual transform steps &mdash; Filter, Join, Aggregate, Union, Sort &mdash; that reshape incoming data, no custom code required.</p><p class="stub-note">Content preview — full transformation reference (filter, join, aggregate, union, sort, caching, schema propagation) unchanged from the current docs.</p>` };
PAGES["sql-transform-notes"] = { title: "SQL Transform Notes", breadcrumb: ["Supply Chain Engineer", "Transform Notes"], badges: ["supply-chain-engineer"],
  html: `<p class="desc">A Transform Note that allows custom SQL queries for data transformations when no-code operations aren't enough.</p><p class="stub-note">Content preview — unchanged from the current docs.</p>` };

PAGES["syncs-overview"] = {
  title: "Syncs — Overview",
  breadcrumb: ["Supply Chain Engineer", "Syncs"],
  badges: ["supply-chain-engineer"],
  html: `
    <p class="desc">A Sync is a workflow that connects your Application to automate repetitive tasks. Every Sync has a Trigger and one or more Actions.</p>
    <div class="relocated-note">Moved out of the old shared "Syncs" top-level section &mdash; automation authoring is Supply Chain Engineer's tool, not something Data Scientist's own workflow touches.</div>
    <h3>App Syncs and Global Syncs</h3>
    <table>
      <tr><th></th><th>App Sync</th><th>Global Sync</th></tr>
      <tr><td>Where you create it</td><td>Inside an Application</td><td>Workspace-level Syncs section</td></tr>
      <tr><td>Scope</td><td>Single Application</td><td>Across multiple Applications in a Composition</td></tr>
      <tr><td>Can orchestrate across Applications</td><td>No</td><td>Yes</td></tr>
    </table>
    ${cardGrid(card("app-syncs", "App Syncs", "Single-Application automations.") + card("global-syncs", "Global Syncs", "Cross-Application, Workspace-level automations."))}
  `,
};
PAGES["app-syncs"] = { title: "App Syncs", breadcrumb: ["Supply Chain Engineer", "Syncs"], badges: ["supply-chain-engineer"], html: `<p class="desc">Build, validate, and activate an App Sync inside a single Application.</p><p class="stub-note">Content preview — unchanged from the current docs.</p>` };
PAGES["global-syncs"] = { title: "Global Syncs", breadcrumb: ["Supply Chain Engineer", "Syncs"], badges: ["supply-chain-engineer"], html: `<p class="desc">A Global Sync connects bridges, Sequences, ML workflows, and actions across different Applications within a Composition.</p><p class="stub-note">Content preview — unchanged from the current docs.</p>` };

/* ---------- BUILD & CONFIGURE (genuinely shared only) ---------- */

PAGES["data-overview"] = {
  title: "Data — Overview",
  breadcrumb: ["Build & Configure", "Data"],
  badges: ["shared"],
  html: `
    <p class="desc">Meridian's Data capabilities help you integrate external data sources and push processed data to external destinations.</p>
    <div class="relocated-note">Stays shared: both Data Scientist and Supply Chain Engineer connect data sources as part of their own workflows.</div>
    <h3>The Two-Layer Architecture</h3>
    <p><strong>Connections</strong> give Meridian access to external systems. <strong>Bridges</strong> define what data flows and when. One Connection can support multiple Bridges; each Bridge references exactly one Connection.</p>
    ${cardGrid(card("data-connections", "Connections", "Bring data in from PostgreSQL, Snowflake, AWS S3, and more.") + card("data-bridges", "Bridges", "Automate sync flows: incremental updates, full refreshes, or append-only."))}
  `,
};
PAGES["data-connections"] = { title: "Connections", breadcrumb: ["Build & Configure", "Data"], badges: ["shared"],
  html: `<p class="desc">A Connection is a configured access point to an external system that allows Meridian to read or write data. Each Connection is set up as either a Source or a Destination.</p><p class="stub-note">Content preview — full page (per-connector setup guides for Snowflake, S3, PostgreSQL, SFTP, and more) unchanged from the current docs.</p>` };
PAGES["data-bridges"] = { title: "Bridges", breadcrumb: ["Build & Configure", "Data"], badges: ["shared"],
  html: `<p class="desc">A Bridge is a data flow framework that connects Sources and Destinations, enabling data movement and synchronization between external systems and Meridian.</p><p class="stub-note">Content preview — configuration options and sync scheduling unchanged from the current docs.</p>` };

PAGES["notes-overview"] = {
  title: "Notes",
  breadcrumb: ["Build & Configure", "Notes & Sequences"],
  badges: ["shared"],
  html: `
    <p class="desc">A Note is the atomic unit in Meridian Studio. Notes are strung together in a Sequence, feeding one's output as the input to the next.</p>
    <h3>Types of Notes</h3>
    <table>
      <tr><th>Note Type</th><th>Description</th></tr>
      <tr><td><strong>Science Note</strong></td><td>Blue Note (Meridian-created, pre-built) or Green Note (user-created custom logic).</td></tr>
      <tr><td><strong>Data Source Note</strong></td><td>Feeds input data from a local machine, AWS S3, Postgres, Snowflake, and other connections.</td></tr>
      <tr><td><strong>Transform Note</strong></td><td>Transforms and reshapes data within a Sequence.</td></tr>
      <tr><td><strong>Text Note</strong></td><td>Adds annotations or descriptions directly on the canvas.</td></tr>
    </table>
    <p class="stub-note">Content preview — full step-by-step procedures (add, configure, delete, duplicate a Note) unchanged from the current docs.</p>
  `,
};

PAGES["sequences-overview"] = {
  title: "Sequences",
  breadcrumb: ["Build & Configure", "Notes & Sequences"],
  badges: ["shared"],
  html: `
    <p class="desc">A Sequence in Meridian is a data workflow made up of multiple Notes that are connected to produce a decision or prediction within an Application. It acts as the logic engine of your solution.</p>
    <h3>Why Use Sequences</h3>
    <ul>
      <li><strong>Control Execution Order</strong> &mdash; define which Note runs first and what follows.</li>
      <li><strong>Automate Workflows</strong> &mdash; eliminate manual steps with repeatable execution paths.</li>
      <li><strong>Combine Notes into End-to-End Processes</strong> &mdash; link Science, Data Source, and Transform Notes into one flow.</li>
    </ul>
    <p class="stub-note">Content preview — Tour the Interface, Manage Sequences/Compositions, Run a Sequence, Tailored Actions, and Audit Logs unchanged from the current docs.</p>
  `,
};
PAGES["note-catalog"] = {
  title: "Science Note Catalog",
  breadcrumb: ["Build & Configure", "Notes & Sequences"],
  badges: ["shared"],
  html: `
    <p class="desc">Pre-built Science Notes covering inventory optimization, demand propagation, network design, route optimization, and time-series forecasting. Browse the catalog before writing anything custom &mdash; chances are the problem is already solved.</p>
    <div class="relocated-note">Stays shared: this is Data Scientist's primary accelerator and Supply Chain Engineer's first stop before building custom logic. Both persona sections link here directly.</div>
    <p class="stub-note">Content preview — full catalog browsing and filtering unchanged from the current docs.</p>
  `,
};

/* ---------- APPLICATIONS (genuinely shared only) ---------- */

PAGES["applications-overview"] = {
  title: "Applications",
  breadcrumb: ["Applications"],
  badges: ["shared"],
  html: `
    <div class="relocated-note">Repurposed from the current <code>next-gen-application/overview.md</code>. The day-to-day "using" and "building" content has moved to live directly under Business User and Supply Chain Engineer respectively &mdash; what's left here is genuinely shared concept and reference material.</div>
    <p class="lede">Next-Gen Apps in Meridian Studio provide a flexible way to build interactive planning interfaces on top of your supply chain logic. Each app connects to a Sequence, keeping your planning data live and responsive.</p>
    <h2>Where the task-oriented content lives now</h2>
    ${cardGrid(
      card("using-an-application", "Using an Application " + badgePill("business-user", true), "Review data, test scenarios, personalize your view, and take action.") +
      card("getting-started-app", "Building an Application " + badgePill("supply-chain-engineer", true), "Design pages, configure data, and build the interface planners use.") +
      card("publishing-to-production", "Publishing to Production " + badgePill("supply-chain-engineer", true) + " " + badgePill("new", true), "Promoting a Development Application to Production.")
    )}
    <h2>What stays here</h2>
    ${cardGrid(
      card("understanding-scenarios", "Understanding Scenarios " + badgePill("shared", true), "Used daily by Business Users, set up by Supply Chain Engineers.") +
      card("understanding-dev-prod", "Development & Production " + badgePill("shared", true) + " " + badgePill("new", true), "The concept both sides of an Application's lifecycle share.") +
      card("managing-applications-list", "Managing the Applications List", "Viewing, launching, and pinning Applications &mdash; relevant to everyone who opens one.")
    )}
    <h3>How are Classic and Next Gen modes different?</h3>
    <p>Every Application opens in a unified view with a toggle that switches between Classic and Next Gen modes. Both act on the same Application and Sequence &mdash; what changes is the interface you use to build and interact with it. Next Gen is the recommended starting point for all new work.</p>
    <div class="admonition admonition-info"><span class="admonition-icon">ℹ</span><div><strong>Classic Applications will be retired</strong> once Meridian Studio moves to Next Gen only. Until then, Classic documentation remains available &mdash; see <a href="#/use-an-application-classic" onclick="navigate('use-an-application-classic')">Classic Applications (Legacy)</a>.</div></div>
  `,
};

/* ---- Understanding Scenarios family (genuinely shared) ---- */
PAGES["understanding-scenarios"] = {
  title: "Understanding Scenarios",
  breadcrumb: ["Applications", "Understanding Scenarios"],
  badges: ["shared"],
  html: `
    <p class="desc">A Scenario is a working copy of your data where you can test assumptions, model strategies, and evaluate outcomes without touching the main dataset.</p>
    <div class="admonition admonition-info"><span class="admonition-icon">ℹ</span><div>Before your team can create and work with Scenarios, a few settings need to be enabled &mdash; see <a href="#/setting-up-scenarios" onclick="navigate('setting-up-scenarios')">Setting Up Scenarios</a> ${badgePill("builder", true)}.</div></div>
    <h3>How Scenarios Fit Into Your Workflow</h3>
    <p>Every Application includes a Signature Scenario, built from the default dataset. When you create a new Scenario, it is copied from the Signature or another existing Scenario into a separate working version. Scenarios are organized in a parent-child structure: syncing pulls changes down from parent to child; committing pushes changes back up.</p>
    <pre style="background:var(--muted);padding:1rem;border-radius:6px;overflow-x:auto;font-size:0.85rem;">Signature  [BASE — always the source of truth]
│
├── Demand_Review_Q1  [Child]
│     ├── Category_Beverages  [Grandchild]
│     └── Category_Snacks  [Grandchild]
└── Supply_Review_Q1  [Child]
      └── Plant_North  [Grandchild]</pre>
    <h3>Why Use Scenarios?</h3>
    <ul>
      <li>Work in parallel without blocking each other</li>
      <li>Test freely, commit intentionally</li>
      <li>Maintain a complete audit trail</li>
      <li>Compare options side by side</li>
    </ul>
    <p class="stub-note">Content preview — the full "Use Cases" library (S&amp;OP, Demand Planning, Supply Planning, FP&amp;A, Multi-Entity Consolidation, Governance &amp; Handoff, and more) unchanged from the current docs.</p>
    <div class="relocated-note">Kept as ONE shared home rather than split or duplicated between Business User and Supply Chain Engineer — both genuinely use it, just for different tasks. Per-page badges below show who each page is mainly for.</div>
  `,
};
PAGES["setting-up-scenarios"] = { title: "Setting Up Scenarios", breadcrumb: ["Applications", "Understanding Scenarios"], badges: ["builder"],
  html: `<p class="desc">App Admin permission is required to enable the Scenarios Capability. You must be in Builder mode of the Application to configure this setting.</p><p class="stub-note">Content preview — unchanged from the current docs, except the "Publish the Application for the settings to take effect" instruction is updated to reference the new <a href="#/publishing-to-production" onclick="navigate('publishing-to-production')">Publishing to Production</a> workflow instead of the old page-builder Publish button.</p>` };
PAGES["managing-scenarios"] = { title: "Managing Scenarios", breadcrumb: ["Applications", "Understanding Scenarios"], badges: ["everyone"],
  html: `<p class="desc">Compare, merge, rename, and delete Scenarios. The Signature Scenario is always shown at the top, marked BASE.</p><p class="stub-note">Content preview — unchanged from the current docs.</p>` };
PAGES["syncing-committing-scenarios"] = { title: "Syncing & Committing Scenarios", breadcrumb: ["Applications", "Understanding Scenarios"], badges: ["everyone"],
  html: `<p class="desc">Sync pulls changes down from a parent Scenario into your working copy. Commit pushes your approved changes back up to the parent.</p><p class="stub-note">Content preview — unchanged from the current docs. This is exactly the page the Business User journey's "Commit and sync" step links to.</p>` };
PAGES["data-layers-scenarios"] = { title: "Understanding Data Layers in Scenarios", breadcrumb: ["Applications", "Understanding Scenarios"], badges: ["everyone"],
  html: `<p class="desc">Explains the Config, Data Management, and Published App layers of a Scenario &mdash; what's a testing space vs. what end users see.</p>
  <div class="admonition admonition-warning"><span class="admonition-icon">⚠</span><div><strong>Needs a rewrite once Dev/Prod ships:</strong> this page's existing "Config" vs. "Published App" language is a page-builder-level concept, separate from the new Development/Production application-level split. As written today it risks readers conflating "Published" with "Production." Flagged in the Dev/Prod documentation plan (P0).</div></div>
  <p class="stub-note">Content preview — unchanged pending that rewrite.</p>` };
PAGES["troubleshooting-scenarios"] = { title: "Troubleshooting Scenarios", breadcrumb: ["Applications", "Understanding Scenarios"], badges: ["everyone"],
  html: `<p class="desc">Common issues: Config Scenario not reflecting the latest Signature data, sync/commit conflicts, and more.</p><p class="stub-note">Content preview — unchanged from the current docs.</p>` };

PAGES["understanding-dev-prod"] = {
  title: "Understanding Development and Production",
  breadcrumb: ["Applications"],
  badges: ["shared"],
  isNew: true,
  html: `
    <p class="lede">Every Meridian Studio Application has two versions: <strong>Development</strong>, where Creators build, change, and validate; and <strong>Production</strong>, the stable version Consumers rely on day to day.</p>
    <table>
      <tr><th></th><th>Development</th><th>Production</th></tr>
      <tr><td>Who works here</td><td>Creators (and any Consumers given test access)</td><td>Consumers, day to day</td></tr>
      <tr><td>When changes appear</td><td>Immediately</td><td>Only after a Creator publishes</td></tr>
      <tr><td>Structural editing</td><td>Allowed</td><td>Largely restricted</td></tr>
    </table>
    <h2>Builder mode and User mode</h2>
    <p>While working in Development, Creators switch between two modes using a toggle near the top of the Application:</p>
    <ul>
      <li><strong>Builder mode</strong> &mdash; lay out pages, add widgets, configure data. This is where structural changes happen.</li>
      <li><strong>User mode</strong> &mdash; experience the Development app as a Consumer would. This isn't a mock preview; it's the real Development application, so you can create test scenarios, upload data, and run actions exactly as a Consumer eventually will.</li>
    </ul>
    <div class="admonition admonition-warning"><span class="admonition-icon">⚠</span><div><strong>Known limitation:</strong> if you switch to User mode before any page exists, you'll see "no pages available," and creating a page from User mode doesn't currently work &mdash; go back to Builder mode first.</div></div>
    <h2>What you can do in Production</h2>
    <p>Once an Application is published, most day-to-day work continues in Production without needing Development. Structural changes still require going back to Development and publishing again.</p>
    <table>
      <tr><th>Allowed in Production</th><th>Must be changed in Development</th></tr>
      <tr><td>Run Sequences, Notes, and actions</td><td>Change Sequence structure</td></tr>
      <tr><td>Upload data</td><td>Add or remove tables</td></tr>
      <tr><td>Change exposed parameters</td><td>Change schemas or semantic models</td></tr>
      <tr><td>Create action schedules</td><td>Create actions</td></tr>
      <tr><td>Manage Scenarios</td><td>Edit interfaces</td></tr>
      <tr><td>Add or remove users and groups</td><td>Edit syncs</td></tr>
      <tr><td>View and download audit logs</td><td>Change application appearance</td></tr>
      <tr><td>Personalize the interface</td><td>&mdash;</td></tr>
    </table>
    <div class="admonition admonition-info"><span class="admonition-icon">ℹ</span><div><strong>Open question:</strong> whether editing table data directly (not just viewing it) is allowed in Production is still being confirmed with Product &mdash; see the Dev/Prod documentation plan's Open Questions.</div></div>
    <h2>Common questions</h2>
    <p><strong>Can Consumers test before Production?</strong> Yes &mdash; a Consumer who needs to validate a change can be given access to Development to test workflows before they reach Production.</p>
    <p><strong>Can a Creator make a quick fix directly in Production?</strong> No. The change must be made in Development and published.</p>
    <p><strong>Is rollback supported?</strong> Not yet confirmed. Don't rely on being able to roll back a Production publish.</p>
    ${cardGrid(card("publishing-to-production", "Publishing to Production " + badgePill("new", true) + " " + badgePill("supply-chain-engineer", true), "The step-by-step procedure, under Supply Chain Engineer."))}
  `,
};

PAGES["managing-applications-list"] = {
  title: "Managing the Applications List",
  breadcrumb: ["Applications"],
  badges: ["shared"],
  html: `
    <p class="desc">View, launch, pin, and copy your Applications from the Applications page.</p>
    <div class="relocated-note">Relocated from the current <code>manage-interfaces.md</code>. The everyday "view/launch/pin" actions relevant to anyone opening an app stay here; the promote-to-Production and sharing actions moved to Supply Chain Engineer's <a href="#/publishing-to-production" onclick="navigate('publishing-to-production')">Publishing to Production</a> and <a href="#/sharing-applications" onclick="navigate('sharing-applications')">Sharing Applications</a>.</div>
    <p>Right-click an Application to Launch, Pin to Top, Share, or Copy it.</p>
    <div class="admonition admonition-info"><span class="admonition-icon">ℹ</span><div><strong>Open question:</strong> the existing "Create Ready App" action reads almost identically to the new Publish workflow. Whether it's being renamed, replaced, or kept as a separate path is still being confirmed with Product &mdash; see Open Questions.</div></div>
    <div class="admonition admonition-warning"><span class="admonition-icon">⚠</span><div>Once Dev/Prod ships, this list is expected to show Development and Production as separate entries per Application. That was not yet built as of the latest product review &mdash; this page will need new screenshots once it ships.</div></div>
  `,
};

/* ---- Classic Applications (Legacy) ---- */
PAGES["use-an-application-classic"] = {
  title: "Use an Application",
  breadcrumb: ["Applications", "Classic Applications (Legacy)"],
  badges: ["legacy"],
  html: `
    <div class="admonition admonition-warning"><span class="admonition-icon">⚠</span><div>We encourage all new builders to use Next-Gen Applications. This page covers working with Applications in Classic mode. <strong>Classic Applications will be retired</strong> once Meridian Studio moves to Next-Gen only &mdash; documentation remains available until then.</div></div>
    <p class="desc">Open a configured Application, view its content, and run it.</p>
    <h3>Open an Application</h3>
    <p>Every Application opens in the unified view with a toggle to switch between Classic and Next Gen modes. If your Application was built in Classic mode, it opens in Classic mode by default.</p>
    <p class="stub-note">Content preview — Filter Tables, Run the Application, Upload Data unchanged from the current docs.</p>
  `,
};
PAGES["switch-classic-nextgen"] = { title: "Switch Between Classic and Next Gen", breadcrumb: ["Applications", "Classic Applications (Legacy)"], badges: ["legacy"],
  html: `<p class="desc">The Classic/Next Gen toggle sits in the top right of the application header. The mode is saved per Application, not per user.</p><p class="stub-note">Content preview — unchanged from the current docs.</p>` };
PAGES["configure-an-application-classic"] = { title: "Configure an Application", breadcrumb: ["Applications", "Classic Applications (Legacy)"], badges: ["legacy"],
  html: `<p class="desc">Classic-mode App Configuration: Content, Actions, Settings, API, and Users Access panes.</p><p class="stub-note">Content preview — Define Users and Groups Access, Define Scenario Access, Define User Actions and Parameters, Define Data and Visualization Visibility, Manage API Access unchanged from the current docs.</p>` };
PAGES["manage-scenarios-classic"] = { title: "Manage Scenarios in Applications", breadcrumb: ["Applications", "Classic Applications (Legacy)"], badges: ["legacy"],
  html: `<p class="desc">Create, copy, edit, and delete Scenarios in a Classic-mode Application.</p><p class="stub-note">Content preview — unchanged from the current docs.</p>` };
PAGES["create-visualizations-classic"] = { title: "Create Visualizations", breadcrumb: ["Applications", "Classic Applications (Legacy)"], badges: ["legacy"],
  html: `<p class="desc">Build charts, dashboards, and maps for a Classic-mode Application.</p><p class="stub-note">Content preview — unchanged from the current docs. Placement confirmed for this prototype; not yet verified against full page content.</p>` };
PAGES["publish-application-classic"] = { title: "Publish the Application", breadcrumb: ["Applications", "Classic Applications (Legacy)"], badges: ["legacy"],
  html: `<p class="desc">Toggle "Publish App" to make a Classic Application visible to users with access.</p>
  <div class="admonition admonition-info"><span class="admonition-icon">ℹ</span><div>Same word, different mechanism from Supply Chain Engineer's <a href="#/publishing-to-production" onclick="navigate('publishing-to-production')">Publishing to Production</a> workflow &mdash; this toggle controls visibility of one Classic Application; it does not create a separate Production version.</div></div>` };
PAGES["table-operations"] = { title: "Table Operations", breadcrumb: ["Applications", "Classic Applications (Legacy)"], badges: ["legacy", "shared"],
  html: `<p class="desc">Edit table data directly in the grid &mdash; single-cell edits, column updates, row add/delete/duplicate.</p><p class="stub-note">Content preview — unchanged from the current docs. Also referenced from Supply Chain Engineer's Building an Application, since this applies to Next-Gen tables too.</p>` };

/* ---------- REFERENCE & ADMINISTRATION ---------- */
PAGES["admin-settings"] = { title: "Admin Settings", breadcrumb: ["Reference & Administration"], badges: ["shared"],
  html: `<p class="desc">Organization managers configure users, groups, compute resources, scheduled runs, secrets, and other system-level settings here.</p><p class="stub-note">Content preview — Organization Settings, User Settings, Run Settings, Secrets Manager unchanged from the current docs.</p>` };
PAGES["sso-integration"] = { title: "SSO Integration", breadcrumb: ["Reference & Administration"], badges: ["shared"],
  html: `<p class="desc">Configure single sign-on with Azure Active Directory or Okta.</p><p class="stub-note">Content preview — unchanged from the current docs.</p>` };
PAGES["api-reference"] = { title: "API Reference", breadcrumb: ["Reference & Administration"], badges: ["shared"],
  html: `<p class="desc">Connect external systems to Meridian via the External API &mdash; includes a Power BI connection guide and sample Python scripts.</p><p class="stub-note">Content preview — unchanged from the current docs.</p>` };
PAGES["security-datasets"] = { title: "Security & Sample Datasets", breadcrumb: ["Reference & Administration"], badges: ["shared"],
  html: `<p class="desc">Security practices at Meridian, and sample datasets for exploring the platform.</p><p class="stub-note">Content preview — unchanged from the current docs.</p>` };
