import React, {useEffect, useState} from 'react';

// Looping animation of the search change: keyword search and Ask a question
// as a matched pair, and a typed question handed to the assistant.

const Q = 'how do I share a scenario with my team?';
// step: 0 idle, 1 typing, 2 results, 3 ask row focused, 4 assistant answering
const DURATIONS = [1600, 2600, 1800, 1300, 5200];

export default function SearchSplitDemo() {
  const [step, setStep] = useState(0);
  const [typed, setTyped] = useState(0);
  const [answer, setAnswer] = useState(0);

  useEffect(() => {
    const reduce = typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    if (reduce) {
      setStep(2);
      setTyped(Q.length);
      return;
    }
    const t = setTimeout(() => setStep((s) => (s + 1) % DURATIONS.length), DURATIONS[step]);
    if (step === 0) {
      setTyped(0);
      setAnswer(0);
    }
    return () => clearTimeout(t);
  }, [step]);

  useEffect(() => {
    if (step !== 1) return;
    const i = setInterval(() => setTyped((n) => Math.min(Q.length, n + 1)), 55);
    return () => clearInterval(i);
  }, [step]);

  useEffect(() => {
    if (step !== 4) return;
    const i = setInterval(() => setAnswer((n) => Math.min(3, n + 1)), 900);
    return () => clearInterval(i);
  }, [step]);

  const modal = step >= 1 && step <= 3;
  const assistant = step === 4;

  return (
    <div className="ssd" aria-label="Animation: a question typed into keyword search is handed to the assistant">
      <div className="ssd__bar">
        <span className="ssd__logo">Docs</span>
        <span className="ssd__nav">Guides · Notes · Release notes</span>
        <span className={step === 0 ? 'ssd__btn is-pulse' : 'ssd__btn'}>⌕ Search by keyword <kbd>⌘K</kbd></span>
        <span className={step === 4 ? 'ssd__btn ssd__btn--ask is-on' : 'ssd__btn ssd__btn--ask'}>✦ Ask a question <kbd>⌘I</kbd></span>
      </div>
      <div className="ssd__page">
        <div className="ssd__line w60" />
        <div className="ssd__line w90" />
        <div className="ssd__line w80" />
        <div className="ssd__line w70" />
      </div>

      {modal && (
        <div className="ssd__modal">
          <div className="ssd__input">
            ⌕ <span>{Q.slice(0, typed)}</span>
            {step === 1 && <i className="ssd__caret" />}
          </div>
          {step >= 2 && (
            <div className="ssd__results">
              <div className={step === 3 ? 'ssd__ask is-on' : 'ssd__ask'}>
                <span>✦ Ask a question: “{Q}”</span>
                <kbd>⌘I</kbd>
              </div>
              <div className="ssd__or">or keyword matches</div>
              <div className="ssd__hit"><strong>Scenario Permissions</strong> · …who can <mark>share</mark> a…</div>
              <div className="ssd__hit"><strong>Teams and Groups</strong> · …add a <mark>team</mark> to…</div>
            </div>
          )}
        </div>
      )}

      {assistant && (
        <div className="ssd__panel">
          <div className="ssd__panelhead">✦ Ask a question</div>
          <div className="ssd__q">{Q}</div>
          {answer >= 1 && <div className="ssd__a">Open the Scenarios menu, select ⋮ next to the scenario, then <b>Share Scenario</b>.</div>}
          {answer >= 2 && <div className="ssd__a">Add people or groups and pick View, Edit or Manage for each.</div>}
          {answer >= 3 && <div className="ssd__src">Source: Sharing Scenarios</div>}
        </div>
      )}
    </div>
  );
}
