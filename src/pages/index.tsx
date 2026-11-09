import type {ReactNode} from 'react';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import {intro, tiles} from '../data/home';
import styles from './index.module.css';

const ICONS: Record<string, ReactNode> = {
  '01': (
    <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 5.5A1.5 1.5 0 0 1 5.5 4H11v16H5.5A1.5 1.5 0 0 1 4 18.5v-13ZM13 4h5.5A1.5 1.5 0 0 1 20 5.5v13a1.5 1.5 0 0 1-1.5 1.5H13V4Z" /><path d="M6.5 8h2.5M6.5 11h2.5M15.5 8h2M15.5 11h2" /></svg>
  ),
  '02': (
    <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3v3M12 18v3M3 12h3M18 12h3M6 6l2 2M16 16l2 2M6 18l2-2M16 8l2-2" /><circle cx="12" cy="12" r="3.2" /></svg>
  ),
  '03': (
    <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3.5" y="4.5" width="17" height="16" rx="2" /><path d="M3.5 9h17M8 3v3M16 3v3M7.5 13h4M7.5 16.5h7" /></svg>
  ),
  '04': (
    <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2" /><path d="M10 9.5v5l4.5-2.5L10 9.5Z" /></svg>
  ),
};

export default function Home(): ReactNode {
  return (
    <Layout
      title="Vidya Patil"
      description="Senior Manager, Documentation at Lyric. Writing, AI, program management, and videos and podcasts. Prague, authorized to work in the Czech Republic.">
      <main>
        <header className={styles.hero}>
          <div className={styles.heroInner}>
            <p className={styles.role}>
              <span className={styles.roleTitle}>{intro.title}</span>
              {intro.facts.map((f) => (
                <span key={f} className={styles.chip}>{f}</span>
              ))}
            </p>
            <h1 className={styles.name}>{intro.name}</h1>
            <p className={styles.line}>{intro.line}</p>
            <div className={styles.actions}>
              <Link className={styles.primary} to="/work">
                See case studies
              </Link>
              <a className={styles.secondary} href="/Vidya_Patil_CV.pdf" download>
                Download CV (PDF)
              </a>
              <a className={styles.mail} href="mailto:vidyapatil123@gmail.com">
                vidyapatil123@gmail.com
              </a>
            </div>
          </div>
        </header>

        <section className={styles.body} aria-label="Work">
          <div className={styles.sectionHead}>
            <span className={styles.eyebrow}>Explore</span>
            <h2 className={styles.sectionTitle}>What I do</h2>
          </div>
          <div className={styles.tiles}>
            {tiles.map((t) => (
              <article key={t.n} className={styles.tile}>
                <span className={styles.icon}>{ICONS[t.n]}</span>
                <h3 className={styles.tileTitle}>
                  <Link to={t.links[0].to} className={styles.tileTitleLink}>
                    {t.title}
                  </Link>
                </h3>
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
          </div>
        </section>
      </main>
    </Layout>
  );
}
