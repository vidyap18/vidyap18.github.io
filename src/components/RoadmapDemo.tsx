import React, {useState} from 'react';

// A recreation of the roadmap's two views, built on one fictional dataset.
// Internal: grouped by team, with keys, status and the plain-English update.
// Customer: grouped by supply chain decision, internal fields hidden.

type Epic = {
  key: string;
  team: string;
  decision: string;
  quarter: string;
  status: 'On track' | 'In progress' | 'Yet to start' | 'At risk';
  title: string;
  update: string;
  customer: string;
};

const EPICS: Epic[] = [
  {key: 'ALG-1187', team: 'Algorithms', decision: 'Demand', quarter: "Q4'26", status: 'On track', title: 'Intermittent demand modelling for slow-moving items', update: 'Beta with two pilot teams. General release planned for December.', customer: 'Better forecasts for items that sell rarely or in bursts.'},
  {key: 'ALG-1219', team: 'Algorithms', decision: 'Demand', quarter: "Q1'27", status: 'Yet to start', title: 'Promotion uplift in the baseline forecast', update: 'Design review done. Build starts next sprint.', customer: 'Forecasts that account for planned promotions.'},
  {key: 'PLAT-2041', team: 'AI agents', decision: 'Demand', quarter: "Q4'26", status: 'On track', title: 'Forecast review agent: explain each override', update: 'First version released in October. Next: explanations per override.', customer: 'An assistant that explains why a forecast was changed.'},
  {key: 'PLAT-2066', team: 'AI agents', decision: 'Supply', quarter: "Q1'27", status: 'In progress', title: 'Supply exception triage agent', update: 'Prompt and tool design in progress; evaluation set being built.', customer: 'An assistant that sorts supply exceptions by impact.'},
  {key: 'APP-3310', team: 'Planning apps', decision: 'Supply', quarter: "Q4'26", status: 'At risk', title: 'Capacity view across sites', update: 'Blocked on a data model change. Revised date next review.', customer: 'One view of production capacity across sites.'},
  {key: 'APP-3324', team: 'Planning apps', decision: 'Inventory', quarter: "Q4'26", status: 'On track', title: 'Safety stock what-if in scenarios', update: 'In QA. On track for the next release.', customer: 'Test safety stock changes in a scenario before applying them.'},
  {key: 'DATA-512', team: 'Data platform', decision: 'Inventory', quarter: "Q1'27", status: 'In progress', title: 'Faster inventory snapshots from the warehouse', update: 'Connector changes merged; performance testing next.', customer: 'Fresher inventory positions, loaded faster.'},
  {key: 'ALG-1240', team: 'Algorithms', decision: 'Transportation', quarter: "Q4'26", status: 'In progress', title: 'Multi-stop route optimisation with time windows', update: 'Solver changes done; validating on sample networks.', customer: 'Routes that respect delivery time windows across many stops.'},
  {key: 'DATA-530', team: 'Data platform', decision: 'Transportation', quarter: "Q1'27", status: 'Yet to start', title: 'Carrier rate import', update: 'Scoped. Waiting on rate file samples.', customer: 'Bring carrier rates in directly instead of by spreadsheet.'},
];

const QUARTERS = ['All quarters', "Q4'26", "Q1'27"];
const TEAMS = ['Planning apps', 'AI agents', 'Algorithms', 'Data platform'];
const DECISIONS = ['Demand', 'Supply', 'Inventory', 'Transportation'];

export default function RoadmapDemo() {
  const [view, setView] = useState<'internal' | 'customer'>('internal');
  const [quarter, setQuarter] = useState(QUARTERS[0]);
  const rows = EPICS.filter((e) => quarter === QUARTERS[0] || e.quarter === quarter);
  const groups = view === 'internal' ? TEAMS : DECISIONS;
  const groupOf = (e: Epic) => (view === 'internal' ? e.team : e.decision);

  return (
    <div className="rmd">
      <div className="rmd__label">Recreation with fictional data</div>
      <div className="rmd__bar">
        <div className="rmd__seg" role="group" aria-label="View">
          <button type="button" className={view === 'internal' ? 'is-on' : ''} aria-pressed={view === 'internal'} onClick={() => setView('internal')}>Internal</button>
          <button type="button" className={view === 'customer' ? 'is-on' : ''} aria-pressed={view === 'customer'} onClick={() => setView('customer')}>Customer</button>
        </div>
        <label className="rmd__q">
          Quarter
          <select value={quarter} onChange={(e) => setQuarter(e.target.value)}>
            {QUARTERS.map((q) => <option key={q}>{q}</option>)}
          </select>
        </label>
        <span className="rmd__count">{rows.length} of {EPICS.length} epics</span>
      </div>
      <p className="rmd__hint">
        {view === 'internal'
          ? 'Grouped by team. Shows the Jira key, status and the plain-English update.'
          : 'Grouped by supply chain decision. Keys, status and internal updates are hidden.'}
      </p>
      {groups.map((g) => {
        const items = rows.filter((e) => groupOf(e) === g);
        if (!items.length) return null;
        return (
          <div key={g} className="rmd__group">
            <h4>{g} <span>({items.length})</span></h4>
            <div className="rmd__tablewrap">
              <table>
                <thead>
                  {view === 'internal' ? (
                    <tr><th>Key</th><th>Epic</th><th>Status</th><th>Quarter</th><th>Roadmap update</th></tr>
                  ) : (
                    <tr><th>What's coming</th><th>Quarter</th></tr>
                  )}
                </thead>
                <tbody>
                  {items.map((e) =>
                    view === 'internal' ? (
                      <tr key={e.key}>
                        <td className="rmd__key">{e.key}</td>
                        <td>{e.title}</td>
                        <td><span className={`rmd__st rmd__st--${e.status.replace(/\s/g, '').toLowerCase()}`}>{e.status}</span></td>
                        <td>{e.quarter}</td>
                        <td>{e.update}</td>
                      </tr>
                    ) : (
                      <tr key={e.key}>
                        <td>{e.customer}</td>
                        <td>{e.quarter}</td>
                      </tr>
                    ),
                  )}
                </tbody>
              </table>
            </div>
          </div>
        );
      })}
    </div>
  );
}
