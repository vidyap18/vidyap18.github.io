import type {ReactNode} from 'react';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import {AutoHeightIframe} from '@site/src/components/mdx';
import {
  hero,
  feature,
  releaseWriting,
  releaseDelivery,
  aiEvaluation,
  aiTool,
  aiShipping,
  moreWork,
} from '../data/work';
import styles from './index.module.css';

function Opening() {
  return (
    <header className={styles.opening}>
      <p className={styles.meta}>
        <span className={styles.name}>{hero.name}</span>
        <span>{hero.title}</span>
        {hero.facts.map((f) => (
          <span key={f}>{f}</span>
        ))}
      </p>
      <h1 className={styles.line}>{hero.line}</h1>
      <div className={styles.actions}>
        <a className={styles.primary} href="#selected-work">
          See selected work
        </a>
        <Link className={styles.secondary} to="/cv">
          View CV
        </Link>
      </div>
    </header>
  );
}

function Kicker({children}: {children: ReactNode}) {
  return <span className={styles.kicker}>{children}</span>;
}

function Feature() {
  return (
    <article className={styles.feature}>
      <div className={styles.featureText}>
        <Kicker>{feature.kicker}</Kicker>
        <h3>{feature.title}</h3>
        <p>{feature.context}</p>
        <div className={styles.links}>
          <Link className={styles.action} to={feature.action.to}>
            {feature.action.label}
          </Link>
          <Link to={feature.more.to}>{feature.more.label}</Link>
        </div>
      </div>
      <div className={styles.featureArtifact}>
        <AutoHeightIframe src={feature.demo} title={feature.demoTitle} initialHeight={420} />
      </div>
    </article>
  );
}

function ReleaseWriting() {
  return (
    <article className={styles.row}>
      <div className={styles.rowText}>
        <Kicker>{releaseWriting.kicker}</Kicker>
        <h3>{releaseWriting.title}</h3>
        <p>{releaseWriting.context}</p>
        <Link className={styles.action} to={releaseWriting.action.to}>
          {releaseWriting.action.label}
        </Link>
      </div>
      <figure className={styles.excerpt}>
        <blockquote>
          {releaseWriting.excerpt.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </blockquote>
        <figcaption>{releaseWriting.label}</figcaption>
      </figure>
    </article>
  );
}

function ReleaseDelivery() {
  return (
    <article className={styles.row}>
      <div className={styles.rowText}>
        <Kicker>{releaseDelivery.kicker}</Kicker>
        <h3>{releaseDelivery.title}</h3>
        <p>{releaseDelivery.context}</p>
        <Link className={styles.action} to={releaseDelivery.action.to}>
          {releaseDelivery.action.label}
        </Link>
      </div>
      <div className={styles.timelineWrap}>
        <ol className={styles.timeline}>
          {releaseDelivery.steps.map((s) => (
            <li key={s.when}>
              <span>{s.when}</span>
              {s.what}
            </li>
          ))}
        </ol>
        <p className={styles.result}>{releaseDelivery.result}</p>
      </div>
    </article>
  );
}

function AiEvaluation() {
  return (
    <article className={styles.aiBlock}>
      <Kicker>{aiEvaluation.kicker}</Kicker>
      <h3>{aiEvaluation.title}</h3>
      <p>{aiEvaluation.context}</p>
      <table className={styles.miniTable}>
        <thead>
          <tr>
            <th />
            <th>Round one</th>
            <th>Round two</th>
          </tr>
        </thead>
        <tbody>
          {aiEvaluation.table.map((r) => (
            <tr key={r.label}>
              <th scope="row">{r.label}</th>
              <td>{r.a}</td>
              <td>{r.b}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className={styles.note}>{aiEvaluation.tableNote}</p>
      <p className={styles.subhead}>The seven checks I wrote for a wrong answer</p>
      <ol className={styles.checks}>
        {aiEvaluation.checks.map((c) => (
          <li key={c}>{c}</li>
        ))}
      </ol>
      <p className={styles.verdict}>{aiEvaluation.verdict}</p>
      <Link className={styles.action} to={aiEvaluation.action.to}>
        {aiEvaluation.action.label}
      </Link>
    </article>
  );
}

function Panel({label, lines, tone}: {label: string; lines: string[]; tone?: 'writer'}) {
  return (
    <div className={tone === 'writer' ? `${styles.panel} ${styles.panelWriter}` : styles.panel}>
      <span className={styles.panelLabel}>{label}</span>
      {lines.map((l) => (
        <p key={l}>{l}</p>
      ))}
    </div>
  );
}

function AiTool() {
  return (
    <article className={styles.aiBlock}>
      <Kicker>{aiTool.kicker}</Kicker>
      <h3>{aiTool.title}</h3>
      <p>{aiTool.context}</p>
      <div className={styles.flow}>
        <Panel label={aiTool.input.label} lines={aiTool.input.lines} />
        <span className={styles.arrow} aria-hidden="true">↓</span>
        <Panel label={aiTool.draft.label} lines={aiTool.draft.lines} />
        <span className={styles.arrow} aria-hidden="true">↓</span>
        <Panel label={aiTool.writer.label} lines={aiTool.writer.lines} tone="writer" />
      </div>
      <p className={styles.note}>{aiTool.label}</p>
      <Link className={styles.action} to={aiTool.action.to}>
        {aiTool.action.label}
      </Link>
    </article>
  );
}

function AiShipping() {
  return (
    <article className={styles.shipping}>
      <div>
        <Kicker>{aiShipping.kicker}</Kicker>
        <h3>{aiShipping.title}</h3>
      </div>
      <ul className={styles.shipList}>
        {aiShipping.items.map((i) => (
          <li key={i.text}>
            <span className={styles.role}>{i.role}</span>
            <span>{i.text}</span>
          </li>
        ))}
      </ul>
    </article>
  );
}

function More() {
  return (
    <section className={styles.section} aria-labelledby="more-title">
      <h2 id="more-title" className={styles.sectionTitle}>More work</h2>
      <ul className={styles.moreList}>
        {moreWork.map((m) => (
          <li key={m.to}>
            <Link to={m.to}>{m.title}</Link>
            <span>{m.proof}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

function Contact() {
  return (
    <section className={styles.contact} aria-labelledby="contact-title">
      <h2 id="contact-title" className={styles.sectionTitle}>Contact</h2>
      <p>Open to senior technical writer and documentation lead roles, EU remote or hybrid in Prague.</p>
      <p className={styles.contactLine}>
        <a href="mailto:vidyapatil123@gmail.com">vidyapatil123@gmail.com</a>
        <span>+420 737 488 486</span>
        <a href="https://www.linkedin.com/in/vidyapatil18" target="_blank" rel="noreferrer">
          linkedin.com/in/vidyapatil18
        </a>
        <Link to="/cv">CV</Link>
      </p>
    </section>
  );
}

export default function Home(): ReactNode {
  return (
    <Layout
      title="Vidya Patil"
      description="Senior Manager, Documentation at Lyric. Release writing and delivery, working prototypes, and AI for documentation. Prague, authorized to work in the Czech Republic.">
      <main className={styles.page}>
        <Opening />
        <section id="selected-work" className={styles.section} aria-labelledby="work-title">
          <h2 id="work-title" className={styles.sectionTitle}>Selected work</h2>
          <Feature />
          <ReleaseWriting />
          <ReleaseDelivery />
        </section>
        <section className={styles.section} aria-labelledby="ai-title">
          <h2 id="ai-title" className={styles.sectionTitle}>AI and documentation</h2>
          <div className={styles.aiGrid}>
            <AiEvaluation />
            <AiTool />
          </div>
          <AiShipping />
        </section>
        <More />
        <Contact />
      </main>
    </Layout>
  );
}
