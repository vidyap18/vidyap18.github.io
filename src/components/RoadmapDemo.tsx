import React, {Fragment, useMemo, useState} from 'react';

// A recreation of the roadmap dashboard on one fictional dataset.
// Internal view: sections by team, areas by functional area, every field.
// Customer view: sections by audience, areas by supply chain decision,
// with keys, status and internal updates hidden.

type Status = 'On Track' | 'In Progress' | 'Yet to Start' | 'At Risk';
type Epic = {
  key: string;
  team: 'Studio' | 'Agentic' | 'Algorithms';
  area: string;
  decision: 'Demand' | 'Supply' | 'Inventory' | 'Transportation' | 'Network';
  audience: 'Supply Chain Decisions' | 'AI Agents' | 'Platform';
  note?: string;
  quarter: "Q4'26" | "Q1'27";
  status: Status;
  summary: string;
  update: string;
  description: string;
  customer: string;
};

const EPICS: Epic[] = [
  {key: 'ALG-1187', team: 'Algorithms', area: 'Demand', decision: 'Demand', audience: 'Supply Chain Decisions', note: 'Analyze Demand', quarter: "Q4'26", status: 'On Track', summary: 'Intermittent demand modeling for slow-moving items', update: 'Beta with two pilot teams.', description: 'Adds a model family for items that sell rarely or in bursts, selected automatically when the history is sparse.', customer: 'Better forecasts for items that sell rarely or in bursts.'},
  {key: 'ALG-1203', team: 'Algorithms', area: 'Demand', decision: 'Demand', audience: 'Supply Chain Decisions', note: 'Analyze Demand', quarter: "Q4'26", status: 'Yet to Start', summary: 'Demand classification by pattern (smooth, erratic, lumpy)', update: '-', description: 'Classifies each item by demand pattern so the right model is chosen up front.', customer: 'Each item is matched to the forecasting approach that suits its demand pattern.'},
  {key: 'ALG-1219', team: 'Algorithms', area: 'Demand', decision: 'Demand', audience: 'Supply Chain Decisions', note: 'Predict Demand', quarter: "Q1'27", status: 'In Progress', summary: 'Promotion uplift in the baseline forecast', update: 'Design review done. Build starts next sprint.', description: 'Uses planned promotions as an input, so uplift is part of the forecast rather than a manual override.', customer: 'Forecasts that account for planned promotions.'},
  {key: 'ALG-1240', team: 'Algorithms', area: 'Transportation & Fulfillment', decision: 'Transportation', audience: 'Supply Chain Decisions', note: 'Optimize Routes', quarter: "Q4'26", status: 'In Progress', summary: 'Multi-stop routing with delivery time windows', update: 'Solver changes done; validating on sample networks.', description: 'Respects customer delivery windows across routes with many stops.', customer: 'Routes that respect delivery time windows across many stops.'},
  {key: 'ALG-1252', team: 'Algorithms', area: 'Network Design', decision: 'Network', audience: 'Supply Chain Decisions', note: 'Optimize Network', quarter: "Q1'27", status: 'Yet to Start', summary: 'Service-level targets in network optimization', update: 'Scoped with two product managers.', description: 'Lets planners set a service level per region and see the cost of meeting it.', customer: 'Set service-level targets by region and see what they cost.'},
  {key: 'ALG-1261', team: 'Algorithms', area: 'Inventory', decision: 'Inventory', audience: 'Supply Chain Decisions', note: 'Optimize Inventory', quarter: "Q4'26", status: 'On Track', summary: 'Multi-echelon safety stock targets', update: 'In QA. On track for the next release.', description: 'Sets safety stock across connected sites rather than one site at a time.', customer: 'Safety stock set across your whole network, not site by site.'},
  {key: 'PLAT-2041', team: 'Agentic', area: 'Planning agents', decision: 'Demand', audience: 'AI Agents', quarter: "Q4'26", status: 'On Track', summary: 'Forecast review agent: explain each override', update: 'First version released in October.', description: 'An agent that reviews forecast overrides and explains the reason for each one.', customer: 'An assistant that explains why a forecast was changed.'},
  {key: 'PLAT-2066', team: 'Agentic', area: 'Planning agents', decision: 'Supply', audience: 'AI Agents', quarter: "Q1'27", status: 'In Progress', summary: 'Supply exception triage agent', update: 'Evaluation set being built.', description: 'Ranks supply exceptions by business impact and drafts the next step for each.', customer: 'An assistant that sorts supply exceptions by impact.'},
  {key: 'PLAT-2077', team: 'Agentic', area: 'Agent platform', decision: 'Inventory', audience: 'AI Agents', quarter: "Q1'27", status: 'Yet to Start', summary: 'Agents grounded in inventory policy documents', update: '-', description: 'Lets agents cite the customer’s own inventory policies when they recommend a change.', customer: 'Assistants that follow your own inventory policies.'},
  {key: 'APP-3310', team: 'Studio', area: 'Interfaces', decision: 'Supply', audience: 'Platform', quarter: "Q4'26", status: 'At Risk', summary: 'Capacity view across sites', update: 'Blocked on a data model change. Revised date at next review.', description: 'One view of production capacity across sites, with drill-down to lines.', customer: 'One view of production capacity across sites.'},
  {key: 'APP-3324', team: 'Studio', area: 'Application Lifecycle', decision: 'Inventory', audience: 'Platform', quarter: "Q4'26", status: 'On Track', summary: 'Compare scenarios side by side before deploying', update: 'In QA.', description: 'Shows the difference between two scenarios before a planner deploys one to production.', customer: 'Compare two scenarios side by side before you publish.'},
  {key: 'DATA-512', team: 'Studio', area: 'Connectors', decision: 'Inventory', audience: 'Platform', quarter: "Q1'27", status: 'In Progress', summary: 'Faster inventory snapshots from the warehouse', update: 'Connector changes merged; performance testing next.', description: 'Incremental loads for inventory snapshots, so positions refresh in minutes.', customer: 'Fresher inventory positions, loaded faster.'},
  {key: 'DATA-530', team: 'Studio', area: 'Connectors', decision: 'Transportation', audience: 'Platform', quarter: "Q1'27", status: 'Yet to Start', summary: 'Carrier rate import', update: 'Waiting on sample rate files.', description: 'Imports carrier rate cards directly instead of through spreadsheets.', customer: 'Bring carrier rates in directly instead of by spreadsheet.'},
  {key: 'DATA-541', team: 'Studio', area: 'Connectors', decision: 'Supply', audience: 'Platform', quarter: "Q4'26", status: 'On Track', summary: 'SFTP source connector with retries', update: 'Released to two pilot workspaces.', description: 'Loads files from SFTP on a schedule, with retries and clear error messages.', customer: 'Load files from SFTP on a schedule.'},
  {key: 'APP-3341', team: 'Studio', area: 'Interfaces', decision: 'Demand', audience: 'Platform', quarter: "Q4'26", status: 'In Progress', summary: 'Edit forecasts in a pivot without leaving the app', update: 'Design approved; build in progress.', description: 'Planners edit forecast values directly in a pivot, and edits save to the source rows.', customer: 'Edit forecasts directly in a pivot table.'},
  {key: 'PLAT-2052', team: 'Agentic', area: 'Agent platform', decision: 'Transportation', audience: 'AI Agents', quarter: "Q4'26", status: 'In Progress', summary: 'Agent run history with sources for every answer', update: 'Internal beta.', description: 'Every agent run keeps the data and documents it used, so a planner can check an answer.', customer: 'See the sources behind every assistant answer.'},
];

const VIEWS = {
  internal: {
    subtitle: 'What each team is building, by quarter.',
    sections: ['Studio', 'Agentic', 'Algorithms'] as const,
    sectionOf: (e: Epic) => e.team as string,
    areaOf: (e: Epic) => e.area,
  },
  customer: {
    subtitle: "What's coming for supply chain decisions, AI agents and the platform.",
    sections: ['Supply Chain Decisions', 'AI Agents', 'Platform'] as const,
    sectionOf: (e: Epic) => e.audience as string,
    areaOf: (e: Epic) => e.decision as string,
  },
};

const STATUS_CLASS: Record<Status, string> = {'On Track': 'ok', 'In Progress': 'prog', 'Yet to Start': 'todo', 'At Risk': 'risk'};

export default function RoadmapDemo() {
  const [view, setView] = useState<'internal' | 'customer'>('internal');
  const [section, setSection] = useState<string>('Studio');
  const [quarter, setQuarter] = useState<"Q4'26" | "Q1'27">("Q4'26");
  const [status, setStatus] = useState('');
  const [area, setArea] = useState('');
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState<string | null>(null);
  const v = VIEWS[view];
  const customer = view === 'customer';

  const switchView = (next: 'internal' | 'customer') => {
    setView(next);
    setSection(VIEWS[next].sections[0]);
    setArea('');
    setStatus('');
    setOpen(null);
  };

  const inSection = EPICS.filter((e) => v.sectionOf(e) === section);
  const rows = useMemo(
    () =>
      inSection.filter(
        (e) =>
          e.quarter === quarter &&
          (customer || !status || e.status === status) &&
          (!query || (customer ? e.customer : `${e.key} ${e.summary}`).toLowerCase().includes(query.toLowerCase())),
      ),
    [inSection, quarter, status, query, customer],
  );
  const areas = Array.from(new Set(inSection.map(v.areaOf))).filter((a) => rows.some((e) => v.areaOf(e) === a));
  const shown = rows.filter((e) => !area || v.areaOf(e) === area);
  const countFor = (s: string) => EPICS.filter((e) => v.sectionOf(e) === s && e.quarter === quarter).length;

  return (
    <div className="rmx">
      <div className="rmx__top">
        <span className="rmx__label">Recreation with fictional data</span>
        <div className="rmx__switch" role="group" aria-label="Roadmap view">
          <button type="button" className={!customer ? 'is-on' : ''} aria-pressed={!customer} onClick={() => switchView('internal')}>Internal view</button>
          <button type="button" className={customer ? 'is-on' : ''} aria-pressed={customer} onClick={() => switchView('customer')}>Customer view</button>
        </div>
      </div>

      <div className="rmx__hero">
        <div className="rmx__brand">◇ Meridian</div>
        <div className="rmx__title">Roadmap</div>
        <div className="rmx__sub">{v.subtitle}</div>
        <div className="rmx__tabs">
          {v.sections.map((s) => (
            <button key={s} type="button" className={section === s ? 'is-on' : ''} onClick={() => { setSection(s); setArea(''); setOpen(null); }}>
              {s} <span>({countFor(s)})</span>
            </button>
          ))}
        </div>
      </div>

      <div className="rmx__body">
        <div className="rmx__h">Explore the roadmap</div>
        <input className="rmx__search" placeholder={customer ? 'Search by name…' : 'Search by key or summary…'} value={query} onChange={(e) => setQuery(e.target.value)} />
        <div className="rmx__filters">
          {(["Q4'26", "Q1'27"] as const).map((q) => (
            <button key={q} type="button" className={quarter === q ? 'rmx__pill is-on' : 'rmx__pill'} onClick={() => setQuarter(q)}>{q}</button>
          ))}
          {!customer && (
            <select value={status} onChange={(e) => setStatus(e.target.value)} aria-label="Roadmap status">
              <option value="">All statuses</option>
              {Object.keys(STATUS_CLASS).map((s) => <option key={s}>{s}</option>)}
            </select>
          )}
        </div>
        <div className="rmx__hint">{customer ? 'Keys, status and internal updates are hidden in this view. Click a row to read more.' : 'Click any row to read its full description.'}</div>

        <div className="rmx__grid">
          <nav className="rmx__side">
            <button type="button" className={!area ? 'is-on' : ''} onClick={() => setArea('')}>All areas <span>({rows.length})</span></button>
            {areas.map((a) => (
              <button key={a} type="button" className={area === a ? 'is-on' : ''} onClick={() => setArea(a)}>
                {a} <span>({rows.filter((e) => v.areaOf(e) === a).length})</span>
              </button>
            ))}
          </nav>

          <div className="rmx__main">
            {!shown.length && <p className="rmx__empty">Nothing planned here for {quarter}.</p>}
            {areas.filter((a) => shown.some((e) => v.areaOf(e) === a)).map((a) => {
              const items = shown.filter((e) => v.areaOf(e) === a);
              return (
                <div key={a} className="rmx__area">
                  <div className="rmx__areah">{a} <span>({items.length})</span></div>
                  <div className="rmx__tablewrap">
                    <table>
                      <thead>
                        {customer ? (
                          <tr><th>What's coming</th><th>Quarter</th></tr>
                        ) : (
                          <tr><th>Key</th><th>Summary</th><th>Roadmap status</th><th>Quarter</th><th>Roadmap update</th></tr>
                        )}
                      </thead>
                      <tbody>
                        {items.map((e) => (
                          <Fragment key={e.key}>
                            <tr className="rmx__row" onClick={() => setOpen(open === e.key ? null : e.key)}>
                              {customer ? (
                                <>
                                  <td>{e.note ? <span className="rmx__note">{e.note}</span> : null}{e.customer}</td>
                                  <td>{e.quarter}</td>
                                </>
                              ) : (
                                <>
                                  <td className="rmx__key">▸ {e.key}</td>
                                  <td>{e.note ? <span className="rmx__note">{e.note}</span> : null}{e.summary}</td>
                                  <td><span className={`rmx__st rmx__st--${STATUS_CLASS[e.status]}`}>{e.status}</span></td>
                                  <td>{e.quarter}</td>
                                  <td>{e.update}</td>
                                </>
                              )}
                            </tr>
                            {open === e.key && (
                              <tr className="rmx__detail"><td colSpan={customer ? 2 : 5}>{customer ? e.customer : e.description}</td></tr>
                            )}
                          </Fragment>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
