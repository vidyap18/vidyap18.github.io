import type {ReactNode} from 'react';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import {intro, tiles} from '../data/home';
import styles from './index.module.css';

export default function Home(): ReactNode {
  return (
    <Layout
      title="Vidya Patil"
      description="Senior Manager, Documentation at Lyric. Writing, AI, program management, and videos and podcasts. Prague, authorized to work in the Czech Republic.">
      <main className={styles.page}>
        <header className={styles.intro}>
          <p className={styles.role}>
            <span>{intro.title}</span>
            {intro.facts.map((f) => (
              <span key={f}>{f}</span>
            ))}
          </p>
          <h1 className={styles.name}>{intro.name}</h1>
          <p className={styles.line}>{intro.line}</p>
          <div className={styles.actions}>
            <Link className={styles.primary} to="/cv">
              View CV
            </Link>
            <a className={styles.secondary} href="mailto:vidyapatil123@gmail.com">
              vidyapatil123@gmail.com
            </a>
          </div>
        </header>

        <section className={styles.tiles} aria-label="Work">
          {tiles.map((t) => (
            <article key={t.n} className={styles.tile}>
              <span className={styles.n}>{t.n}</span>
              <h2 className={styles.tileTitle}>
                <Link to={t.links[0].to} className={styles.tileTitleLink}>
                  {t.title}
                </Link>
              </h2>
              <p className={styles.tileText}>{t.text}</p>
              <div className={styles.tileLinks}>
                {t.links.map((l) => (
                  <Link key={l.to} to={l.to} className={styles.tileLink}>
                    {l.label}
                  </Link>
                ))}
              </div>
            </article>
          ))}
        </section>
      </main>
    </Layout>
  );
}
