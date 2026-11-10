// Left-hand section navigation for long single pages (AI, Program Management, Videos & Podcasts).
// It looks like the docs sidebar on the Samples and Case Studies pages, stays in view while
// the reader scrolls, and highlights the section on screen.
//
// Sections are read from the page itself: every `.pg-sectionhead h2`, plus any element with
// a `data-nav="Label"` attribute. Rename a heading and the navigation follows.
import {useEffect, useRef, useState, type ReactNode} from 'react';

type Item = {id: string; label: string};

const slug = (s: string) =>
  s.toLowerCase().replace(/&/g, 'and').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

export default function PageNav({title, children}: {title: string; children: ReactNode}): ReactNode {
  const body = useRef<HTMLDivElement>(null);
  const [items, setItems] = useState<Item[]>([]);
  const [active, setActive] = useState('');

  useEffect(() => {
    const root = body.current;
    if (!root) return;
    const found: Item[] = [];
    const targets: HTMLElement[] = [];
    root.querySelectorAll<HTMLElement>('.pg-sectionhead h2, [data-nav]').forEach((el) => {
      const label = el.dataset.nav || el.textContent?.trim() || '';
      if (!label) return;
      const target = (el.closest('.pg-section') as HTMLElement) || el;
      if (!target.id) target.id = slug(label);
      found.push({id: target.id, label});
      targets.push(target);
    });
    setItems(found);

    // Section ids are added here, after the page loads, so follow a shared link like /ai#ship-changes now.
    const hash = decodeURIComponent(window.location.hash.slice(1));
    if (hash) document.getElementById(hash)?.scrollIntoView();

    const onScroll = () => {
      // The active section is the last one whose top has passed a line just under the navbar.
      const line = 140;
      let current = '';
      for (const t of targets) if (t.getBoundingClientRect().top - line <= 0) current = t.id;
      const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4;
      if (atBottom && targets.length) current = targets[targets.length - 1].id;
      setActive(current);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, {passive: true});
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const links = (
    <ul>
      <li>
        <a href="#top" className={active === '' ? 'is-active' : undefined} onClick={(e) => { e.preventDefault(); window.scrollTo({top: 0, behavior: 'smooth'}); }}>
          {title}
        </a>
      </li>
      {items.map((it) => (
        <li key={it.id} className="pgnav__sub">
          <a href={`#${it.id}`} className={active === it.id ? 'is-active' : undefined}>
            {it.label}
          </a>
        </li>
      ))}
    </ul>
  );

  return (
    <div className="pgnav-layout">
      <aside className="pgnav" aria-label="On this page">
        <nav className="pgnav__inner">{links}</nav>
      </aside>
      <div className="pgnav-main" ref={body}>
        {items.length > 0 && (
          <details className="pgnav-mobile">
            <summary>On this page</summary>
            <nav>{links}</nav>
          </details>
        )}
        {children}
      </div>
    </div>
  );
}
