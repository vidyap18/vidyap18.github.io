import React, {Children, isValidElement, ReactNode, useEffect, useState} from 'react';

// A re-creation of the published release notes layout: a highlights box,
// category filters, and expandable release cards. Written for this portfolio.

const OPEN_EVENT = 'vp-release-open';

function openCard(id: string) {
  window.dispatchEvent(new CustomEvent(OPEN_EVENT, {detail: id}));
  const el = document.getElementById(id);
  if (el) setTimeout(() => el.scrollIntoView({behavior: 'smooth', block: 'start'}), 60);
}

export function ReleasePage({title, children}: {title: string; children: ReactNode}) {
  return (
    <div className="rn-frame">
      <div className="rn-frame__bar">
        <span className="rn-dot" /><span className="rn-dot" /><span className="rn-dot" />
        <span className="rn-frame__url">docs · Release Notes</span>
      </div>
      <div className="rn">
        <div className="rn-title" role="heading" aria-level={2}>
          <svg width="34" height="34" viewBox="0 0 48 48" fill="none" aria-hidden="true">
            <path d="M6 15L24 6l18 9v18l-18 9-18-9z" fill="#F1E9F2" />
            <path d="M6 15L24 6l18 9v18l-18 9-18-9zM6 15l18 9 18-9M24 24v18" stroke="#6E4B71" strokeWidth="2.4" strokeLinejoin="round" />
          </svg>
          {title}
        </div>
        {children}
      </div>
    </div>
  );
}

function Ship() {
  return (
    <svg className="rn-ship" viewBox="0 0 300 50" aria-hidden="true">
      <path d="M8 46h290" stroke="#c9b6cb" strokeDasharray="3 4" />
      <path d="M14 10h56M20 10v34M30 10v34M20 22h10M62 10v8" stroke="#3b2a3d" strokeWidth="2" fill="none" />
      <g className="rn-ship__boat">
        <path d="M200 34h70l-8 10h-56z" fill="#6E4B71" />
        <rect x="208" y="26" width="12" height="8" fill="#b493b7" />
        <rect x="222" y="26" width="12" height="8" fill="#8f6a92" />
        <rect x="236" y="26" width="12" height="8" fill="#b493b7" />
        <rect x="250" y="22" width="10" height="12" fill="#3b2a3d" />
      </g>
    </svg>
  );
}

export function ReleaseHero({
  title,
  subtitle,
  items,
}: {
  title: string;
  subtitle: string;
  items: {title: string; target: string}[];
}) {
  const [open, setOpen] = useState(true);
  return (
    <div className={open ? 'rn-hero is-open' : 'rn-hero'}>
      <button type="button" className="rn-hero__head" aria-expanded={open} onClick={() => setOpen(!open)}>
        <span className="rn-hero__copy">
          <strong>{title}</strong>
          <span>{subtitle}</span>
        </span>
        <Ship />
        <svg className="rn-chev" viewBox="0 0 20 20" aria-hidden="true"><path d="M5 7.5l5 5 5-5" stroke="currentColor" strokeWidth="1.6" fill="none" strokeLinecap="round" /></svg>
      </button>
      {open && (
        <ol className="rn-hero__list">
          {items.map((it, i) => (
            <li key={it.target}>
              <button type="button" onClick={() => openCard(it.target)}>
                <span className="rn-num">{i + 1}</span>
                <span className="rn-hero__item">{it.title}</span>
                <span aria-hidden="true">→</span>
              </button>
            </li>
          ))}
        </ol>
      )}
    </div>
  );
}

type CardProps = {
  id: string;
  title: string;
  category: string;
  tag?: string;
  tagNote?: string;
  teaser: string;
  children?: ReactNode;
};

export function ReleaseCard({id, title, tag, tagNote, teaser, children}: CardProps) {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const h = (e: Event) => {
      if ((e as CustomEvent<string>).detail === id) setOpen(true);
    };
    window.addEventListener(OPEN_EVENT, h);
    if (window.location.hash === `#${id}`) setOpen(true);
    return () => window.removeEventListener(OPEN_EVENT, h);
  }, [id]);
  return (
    <div id={id} className={open ? 'rn-card is-open' : 'rn-card'}>
      <button type="button" className="rn-card__head" aria-expanded={open} onClick={() => setOpen(!open)}>
        <span className="rn-card__titles">
          {tag && <span className="rn-tag">{tag}</span>}
          {tagNote && <span className="rn-tagnote">{tagNote}</span>}
          <span className="rn-card__title">{title}</span>
          <span className="rn-card__teaser">{teaser}</span>
        </span>
        <svg className="rn-chev" viewBox="0 0 20 20" aria-hidden="true"><path d="M5 7.5l5 5 5-5" stroke="currentColor" strokeWidth="1.6" fill="none" strokeLinecap="round" /></svg>
      </button>
      <div className="rn-card__detail">
        <div>
          <div className="rn-card__body">{children}</div>
        </div>
      </div>
    </div>
  );
}

export function ReleaseGrid({intro, children}: {intro?: string; children: ReactNode}) {
  const cards = Children.toArray(children).filter(isValidElement) as React.ReactElement<CardProps>[];
  const cats: string[] = [];
  cards.forEach((c) => {
    if (c.props.category && !cats.includes(c.props.category)) cats.push(c.props.category);
  });
  const [cat, setCat] = useState('All');
  const shown = cards.filter((c) => cat === 'All' || c.props.category === cat);
  return (
    <div className="rn-grid">
      {intro && <p className="rn-intro">{intro}</p>}
      <div className="rn-chips" role="group" aria-label="Filter by category">
        {['All', ...cats].map((c) => (
          <button key={c} type="button" className={c === cat ? 'rn-chip is-on' : 'rn-chip'} aria-pressed={c === cat} onClick={() => setCat(c)}>
            {c}
          </button>
        ))}
      </div>
      <p className="rn-count"><strong>{shown.length}</strong> of {cards.length} shown</p>
      <div className="rn-cards">{shown}</div>
    </div>
  );
}

export function ReleaseClip({src, alt, size}: {src: string; alt: string; size?: 'm'}) {
  return (
    <video className={size === 'm' ? 'rn-media rn-media--m' : 'rn-media'} src={src} autoPlay loop muted playsInline preload="none" aria-label={alt} />
  );
}

export function RnLink({children}: {children: ReactNode}) {
  return <span className="rn-a">{children}</span>;
}

export function Admonition({type = 'info', title, children}: {type?: 'info' | 'tip' | 'warning'; title?: string; children: ReactNode}) {
  return (
    <div className={`rn-adm rn-adm--${type}`}>
      <strong>{title ?? (type === 'tip' ? 'Tip' : type === 'warning' ? 'Warning' : 'Info')}</strong>
      <div>{children}</div>
    </div>
  );
}
