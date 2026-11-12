// Visit counting with GoatCounter (https://vidyap18.goatcounter.com). No cookies, no personal data.
//
// The GoatCounter script (added in docusaurus.config.ts) counts the first page a visitor opens.
// The site then changes pages without reloading, so this module counts each later page itself,
// and counts clicks on any PDF link (the CV downloads) as events named "download: <file>".
//
// Visits from localhost are never counted, so local previews don't show up in the numbers.
// To stop counting your own visits, open https://vidyap18.github.io/#toggle-goatcounter once in each browser.
import type {ClientModule} from '@docusaurus/types';
import ExecutionEnvironment from '@docusaurus/ExecutionEnvironment';

type GoatCounter = {count?: (vars: Record<string, unknown>) => void};
const gc = (): GoatCounter | undefined => (window as unknown as {goatcounter?: GoatCounter}).goatcounter;

if (ExecutionEnvironment.canUseDOM) {
  document.addEventListener('click', (e) => {
    const link = (e.target as Element | null)?.closest?.('a[href$=".pdf"]') as HTMLAnchorElement | null;
    if (!link) return;
    const file = new URL(link.href, location.href).pathname;
    gc()?.count?.({event: true, path: `download: ${file}`, title: `Downloaded ${file}`});
  });
}

const clientModule: ClientModule = {
  onRouteDidUpdate({location, previousLocation}) {
    // The first page is counted by the GoatCounter script; only count moves within the site.
    if (!previousLocation || previousLocation.pathname === location.pathname) return;
    gc()?.count?.({
      path: location.pathname,
      // Same-site referrer, so GoatCounter doesn't credit every page to the original source.
      referrer: window.location.origin + previousLocation.pathname,
    });
  },
};

export default clientModule;
