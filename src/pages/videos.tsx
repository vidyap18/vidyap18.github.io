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
        <p className="pg-lede">Release walkthroughs, product explainers and a release podcast, all published to customers on the documentation site. Each opens on the company's public video host.</p>

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
              <a className="pg-link" href={url(featured.id)} target="_blank" rel="noreferrer">
                Open on the video host
              </a>
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
                    <span className="pg-video__play">Play · {m.length}</span>
                  </div>
                  <div className="pg-video__body">
                    <h3>{m.title}</h3>
                    <p>{m.text}</p>
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
