import React, {
  Children,
  createContext,
  isValidElement,
  useContext,
  useEffect,
  useId,
  useRef,
  useState,
  type ReactNode,
} from 'react';
import useBaseUrl from '@docusaurus/useBaseUrl';

/* ---------- Expandables: native <details>, no JavaScript needed ---------- */

export function Expandables({children}: {children: ReactNode}) {
  return <div className="vp-expandables">{children}</div>;
}

export function ExpandableItem({
  id,
  title,
  subtitle,
  children,
}: {
  id?: string;
  title: ReactNode;
  subtitle?: ReactNode;
  children: ReactNode;
}) {
  return (
    <details className="vp-expandable" id={id}>
      <summary>
        <span className="vp-expandable__title">{title}</span>
        {subtitle ? <span className="vp-expandable__subtitle">{subtitle}</span> : null}
      </summary>
      <div className="vp-expandable__body">{children}</div>
    </details>
  );
}

/* ---------- Tabs ---------- */

type TabsState = {value: string; setValue: (v: string) => void; baseId: string};
const TabsContext = createContext<TabsState | null>(null);

function firstTriggerValue(children: ReactNode): string | undefined {
  let found: string | undefined;
  Children.forEach(children, (child) => {
    if (found || !isValidElement(child)) return;
    const props = child.props as {value?: string; children?: ReactNode};
    if (child.type === TabsTrigger && typeof props.value === 'string') found = props.value;
    else if (props.children) found = firstTriggerValue(props.children);
  });
  return found;
}

export function Tabs({defaultValue, children}: {defaultValue?: string | boolean; children: ReactNode}) {
  const initial = typeof defaultValue === 'string' ? defaultValue : firstTriggerValue(children) ?? '';
  const [value, setValue] = useState(initial);
  const baseId = useId();
  return (
    <TabsContext.Provider value={{value, setValue, baseId}}>
      <div className="vp-tabs">{children}</div>
    </TabsContext.Provider>
  );
}

export function TabsList({children}: {children: ReactNode}) {
  return (
    <div className="vp-tabs__list" role="tablist">
      {children}
    </div>
  );
}

export function TabsTrigger({value, children}: {value: string; children: ReactNode}) {
  const ctx = useContext(TabsContext)!;
  const selected = ctx.value === value;
  return (
    <button
      type="button"
      role="tab"
      id={`${ctx.baseId}-tab-${value}`}
      aria-selected={selected}
      aria-controls={`${ctx.baseId}-panel-${value}`}
      tabIndex={selected ? 0 : -1}
      className={selected ? 'vp-tabs__trigger is-active' : 'vp-tabs__trigger'}
      onClick={() => ctx.setValue(value)}>
      {children}
    </button>
  );
}

export function TabsContent({value, children}: {value: string; children: ReactNode}) {
  const ctx = useContext(TabsContext)!;
  return (
    <div
      role="tabpanel"
      id={`${ctx.baseId}-panel-${value}`}
      aria-labelledby={`${ctx.baseId}-tab-${value}`}
      hidden={ctx.value !== value}
      className="vp-tabs__panel">
      {children}
    </div>
  );
}

/* ---------- Stepper: a numbered sequence ---------- */

export function Stepper({children}: {children: ReactNode}) {
  return <ol className="vp-stepper">{children}</ol>;
}

export function Step({children}: {children: ReactNode}) {
  return <li className="vp-stepper__step">{children}</li>;
}

/* ---------- AutoHeightIframe: sizes itself to the demo inside ---------- */

export function AutoHeightIframe({
  src,
  title,
  messageType = 'demo-height',
  initialHeight = 480,
}: {
  src: string;
  title: string;
  messageType?: string;
  initialHeight?: number;
}) {
  const ref = useRef<HTMLIFrameElement>(null);
  const [height, setHeight] = useState(initialHeight);
  const url = useBaseUrl(src);
  useEffect(() => {
    function onMessage(e: MessageEvent) {
      if (!ref.current || e.source !== ref.current.contentWindow) return;
      const data = e.data as {type?: string; height?: number};
      if (data && data.type === messageType && typeof data.height === 'number') {
        setHeight(Math.max(120, Math.ceil(data.height)));
      }
    }
    window.addEventListener('message', onMessage);
    return () => window.removeEventListener('message', onMessage);
  }, [messageType]);
  return (
    <div className="vp-demo">
      <span className="vp-demo__label">Try it</span>
      <iframe ref={ref} src={url} title={title} loading="lazy" style={{height}} />
    </div>
  );
}

/* ---------- Decision tree and best-practice cards ---------- */

function inline(text: string): ReactNode[] {
  const parts = text.split(/(\*\*[^*]+\*\*|`[^`]+`)/g).filter(Boolean);
  return parts.map((p, i) => {
    if (p.startsWith('**')) return <strong key={i}>{p.slice(2, -2)}</strong>;
    if (p.startsWith('`')) return <code key={i}>{p.slice(1, -1)}</code>;
    return <React.Fragment key={i}>{p}</React.Fragment>;
  });
}

// Children arrive either as a template-literal Markdown list or as rendered nodes.
function ListOrNodes({children}: {children: ReactNode}) {
  if (typeof children !== 'string') return <>{children}</>;
  const items = children
    .split('\n')
    .map((l) => l.trim())
    .filter((l) => l.startsWith('- '))
    .map((l) => l.slice(2));
  if (!items.length) return <p>{inline(children.trim())}</p>;
  return (
    <ul>
      {items.map((it) => (
        <li key={it}>{inline(it)}</li>
      ))}
    </ul>
  );
}

export function DecisionTree({question, children}: {question: string; children: ReactNode}) {
  return (
    <div className="vp-decision">
      <div className="vp-decision__q">{question}</div>
      <div className="vp-decision__body">{children}</div>
    </div>
  );
}

export function DecisionYes({title, children}: {title: string; children: ReactNode}) {
  return (
    <div className="vp-decision__col">
      <span className="vp-decision__label">Yes</span>
      <div className="vp-decision__title">{title}</div>
      <ListOrNodes>{children}</ListOrNodes>
    </div>
  );
}

export function DecisionNo({title, children}: {title: string; children: ReactNode}) {
  return (
    <div className="vp-decision__col">
      <span className="vp-decision__label">No</span>
      <div className="vp-decision__title">{title}</div>
      <ul>{children}</ul>
    </div>
  );
}

export function DecisionLink({label, children}: {label: string; href?: string; children?: ReactNode}) {
  return (
    <li>
      <strong>{label}</strong> {children}
    </li>
  );
}

export function BestPractices({children}: {children: ReactNode}) {
  return <div className="vp-best">{children}</div>;
}

export function BestPracticeCard({title, children}: {title: string; children: ReactNode}) {
  return (
    <div className="vp-best__card">
      <h4>{title}</h4>
      <ListOrNodes>{children}</ListOrNodes>
    </div>
  );
}
