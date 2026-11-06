import type {ReactNode} from 'react';
import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';
import Layout from '@theme/Layout';
import {hero, work, moreWork, quotes, samples, videos} from '../data/work';
import styles from './index.module.css';

function Hero() {
  return (
    <header className={styles.hero}>
      <div>
        <p className={styles.heroName}>{hero.name}</p>
        <h1 className={styles.heroLine}>{hero.headline}</h1>
        <p className={styles.heroText}>{hero.text}</p>
        <ul className={styles.facts}>
          {hero.facts.map((f) => (
            <li key={f}>{f}</li>
          ))}
        </ul>
      </div>
      <aside className={styles.heroAside}>
        <p style={{margin: 0}}>{hero.aside}</p>
        <div>
          <Link to="/samples">Writing samples</Link>
          <Link to="/cv">CV</Link>
        </div>
      </aside>
    </header>
  );
}

function Work() {
  return (
    <section className={styles.section} id="work">
      <div className={styles.sectionHead}>
        <h2>Work</h2>
        <p>Six projects from the last two years, each with my part and where it stands.</p>
      </div>
      <div className={styles.grid}>
        {work.map((w) => (
          <Link key={w.slug} to={`/work/${w.slug}`} className={styles.card}>
            <div className={styles.cardImage}>
              <img src={useBaseUrl(w.image)} alt={w.imageAlt} loading="lazy" />
            </div>
            <div className={styles.cardBody}>
              <span className={styles.cardKicker}>{w.kicker}</span>
              <h3 className={styles.cardTitle}>{w.title}</h3>
              <p className={styles.cardWhy}>{w.why}</p>
              <span className={styles.cardMore}>Read the case study</span>
            </div>
          </Link>
        ))}
      </div>
      <div className={styles.samples} style={{marginTop: '1.5rem'}}>
        {moreWork.map((m) => (
          <Link key={m.slug} to={`/work/${m.slug}`} className={styles.sample}>
            <span className="vp-eyebrow">More work</span>
            <h3 className={styles.sampleTitle}>{m.title}</h3>
            <p className={styles.sampleText}>{m.text}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}

function Quotes() {
  return (
    <section className={styles.section} aria-labelledby="quotes-title">
      <div className={styles.sectionHead}>
        <h2 id="quotes-title">What colleagues said</h2>
        <p>Internal feedback from the people who used the work.</p>
      </div>
      <div className={styles.quotes}>
        {quotes.map((q) => (
          <blockquote key={q.who} className={styles.quote}>
            “{q.text}”<footer>{q.who}</footer>
          </blockquote>
        ))}
      </div>
    </section>
  );
}

function Samples() {
  return (
    <section className={styles.section} id="samples">
      <div className={styles.sectionHead}>
        <h2>Writing samples</h2>
        <p>Two minutes each. Real pages with identifying details masked where I can show them, labelled re-creations for a fictional product where I cannot.</p>
      </div>
      <div className={styles.samples}>
        {samples.map((s) => (
          <Link key={s.to} to={s.to} className={styles.sample}>
            <span className="vp-eyebrow">{s.kicker}</span>
            <h3 className={styles.sampleTitle}>{s.title}</h3>
            <p className={styles.sampleText}>{s.text}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}

function Videos() {
  const featured = videos[0];
  return (
    <section className={styles.section} id="videos">
      <div className={styles.sectionHead}>
        <h2>Videos</h2>
        <p>Release walkthroughs, feature explainers and a podcast, all published to customers on the docs site.</p>
      </div>
      <div className={styles.videoWrap}>
        <div>
          <div className={styles.videoFrame}>
            <iframe
              src={`https://fast.wistia.net/embed/iframe/${featured.id}?seo=false&videoFoam=false`}
              title={featured.title}
              allow="autoplay; fullscreen"
              allowFullScreen
              loading="lazy"
            />
          </div>
          <p className={styles.sampleText} style={{marginTop: '0.6rem'}}>
            <strong>{featured.title}</strong> ({featured.length}). {featured.note}
          </p>
        </div>
        <ul className={styles.videoList}>
          {videos.slice(1).map((v) => (
            <li key={v.id}>
              <a href={`https://lyric.wistia.com/medias/${v.id}`} target="_blank" rel="noreferrer">
                <strong>{v.title}</strong>
              </a>{' '}
              <span>({v.length}) {v.note}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section className={styles.contact} id="contact">
      <div>
        <h2>Get in touch</h2>
        <p>Open to senior technical writer and documentation lead roles: EU remote, or hybrid in Prague.</p>
      </div>
      <div className={styles.contactLinks}>
        <a className="primary" href="mailto:vidyapatil123@gmail.com">vidyapatil123@gmail.com</a>
        <a href="tel:+420737488486">+420 737 488 486</a>
        <a href="https://www.linkedin.com/in/vidyapatil18" target="_blank" rel="noreferrer">linkedin.com/in/vidyapatil18</a>
        <Link to="/cv">CV</Link>
      </div>
    </section>
  );
}

export default function Home(): ReactNode {
  return (
    <Layout
      title="Vidya Patil"
      description="Senior technical writer and documentation lead. Product docs, docs-as-code, release communication and AI-ready documentation.">
      <main className={styles.page}>
        <Hero />
        <Work />
        <Quotes />
        <Samples />
        <Videos />
        <Contact />
      </main>
    </Layout>
  );
}
