import type {ReactNode} from 'react';
import Layout from '@theme/Layout';
import {featured, groups} from '../data/media';

const url = (id: string) => `https://lyric.wistia.com/medias/${id}`;

export default function Videos(): ReactNode {
  return (
    <Layout title="Videos & podcasts" description="Release walkthroughs, product explainers and a release podcast, all published to customers.">
      <main className="pg">
        <span className="pg-eyebrow">Videos & podcasts</span>
        <h1 className="pg-title">Videos & podcasts</h1>
        <p className="pg-lede">Release walkthroughs, product explainers and a release podcast, all published to customers on the documentation site. Each card opens the video on Wistia, the company's public video host, in a new tab.</p>

        <section className="pg-section">
          <div className="pg-split">
            <div className="pg-embed">
              <iframe
                src={`https://fast.wistia.net/embed/iframe/${featured.id}?seo=false&videoFoam=false`}
                title={featured.title}
                allow="autoplay; fullscreen"
                allowFullScreen
                loading="lazy"
              />
            </div>
            <div>
              <span className="pg-tag pg-tag--accent">Featured · {featured.length}</span>
              <h2 style={{marginTop: '0.4rem', fontSize: '1.6rem'}}>{featured.title}</h2>
              <p style={{color: 'var(--vp-ink-2)', lineHeight: 1.6}}>{featured.text}</p>
              {featured.role && <p className="pg-role"><strong>My role:</strong> {featured.role}</p>}
              <p>
                <a className="pg-link" href="/samples/release-comms/video-brief-release-walkthrough">Read the video brief (re-created)</a>
                <a className="pg-link" href={url(featured.id)} target="_blank" rel="noreferrer">Open on Wistia ↗</a>
              </p>
            </div>
          </div>
        </section>

        {groups.map((g) => (
          <section key={g.title} className="pg-section">
            <div className="pg-sectionhead">
              <h2>{g.title}</h2>
              <p>{g.intro}</p>
            </div>
            <div className={g.items.length % 2 === 0 ? 'pg-videos pg-videos--two' : 'pg-videos'}>
              {g.items.map((m) => (
                <a key={m.id + g.title} className="pg-video" href={url(m.id)} target="_blank" rel="noreferrer">
                  <div className="pg-video__thumb">
                    {m.thumb ? <img src={m.thumb} alt="" loading="lazy" /> : <span className="pg-video__ph">{m.title}</span>}
                    <span className="pg-video__play">Watch on Wistia ↗ · {m.length}</span>
                  </div>
                  <div className="pg-video__body">
                    <h3>{m.title}</h3>
                    <p>{m.text}</p>
                    {m.role && <p className="pg-role"><strong>My role:</strong> {m.role}</p>}
                  </div>
                </a>
              ))}
            </div>
          </section>
        ))}
      </main>
    </Layout>
  );
}
