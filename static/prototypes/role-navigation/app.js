/* ============================================================
   App shell: sidebar rendering, routing, page rendering.
   Prototype only — plain vanilla JS, no build step.
   ============================================================ */

let currentKey = null;

function findFirstPageKey() {
  for (const group of NAV) {
    for (const child of group.children) {
      if (child.page !== false && PAGES[child.key]) return child.key;
      if (child.children) {
        for (const gc of child.children) {
          if (PAGES[gc.key]) return gc.key;
        }
      }
    }
  }
  return "platform-overview";
}

function navigate(key) {
  if (!PAGES[key]) key = findFirstPageKey();
  window.location.hash = "/" + key;
}

function onHashChange() {
  const key = (window.location.hash || "").replace(/^#\/?/, "") || findFirstPageKey();
  renderPage(key);
  renderSidebar(key);
  document.getElementById("sidebar").classList.remove("mobile-open");
  window.scrollTo({ top: 0, behavior: "instant" in window ? "instant" : "auto" });
}

/* ---------------- Sidebar ---------------- */
function renderSidebar(activeKey) {
  currentKey = activeKey;
  const el = document.getElementById("sidebar");
  el.innerHTML = "";

  NAV.forEach((group) => {
    const groupEl = document.createElement("div");
    groupEl.className = "nav-group";

    const heading = document.createElement("div");
    heading.className = "nav-heading";
    heading.innerHTML = `<span>${group.label}</span>${group.badge ? badgePill(group.badge, true) : ""}<span class="chevron">▾</span>`;
    heading.onclick = () => {
      groupEl.classList.toggle("collapsed");
    };
    groupEl.appendChild(heading);

    const childrenWrap = document.createElement("div");
    childrenWrap.className = "nav-children";

    group.children.forEach((child) => {
      if (child.isSubcat) {
        const subcat = document.createElement("div");
        subcat.className = "nav-subcat";
        subcat.innerHTML = `<span>${child.label}</span>${child.badge ? badgePill(child.badge, true) : ""}<span class="chevron-sub">▾</span>`;
        subcat.onclick = () => {
          subcat.classList.toggle("collapsed");
        };
        childrenWrap.appendChild(subcat);

        const subChildren = document.createElement("div");
        subChildren.className = "nav-subchildren";
        (child.children || []).forEach((leaf) => {
          subChildren.appendChild(renderNavLeaf(leaf, activeKey, 3));
        });
        childrenWrap.appendChild(subChildren);
      } else if (child.children) {
        // non-subcat parent with children (not used currently, but kept generic)
        const item = renderNavLeaf(child, activeKey, 2);
        childrenWrap.appendChild(item);
        child.children.forEach((leaf) => {
          childrenWrap.appendChild(renderNavLeaf(leaf, activeKey, 3));
        });
      } else {
        childrenWrap.appendChild(renderNavLeaf(child, activeKey, 2));
      }
    });

    groupEl.appendChild(childrenWrap);
    el.appendChild(groupEl);
  });
}

function renderNavLeaf(leaf, activeKey, depth) {
  const item = document.createElement("div");
  const page = PAGES[leaf.key];
  const isNew = leaf.isNew || (page && page.isNew);
  item.className = `nav-item depth-${depth}` + (leaf.key === activeKey ? " active" : "");
  item.innerHTML = `<span class="nav-label">${leaf.label}</span>${isNew ? badgePill("new", true) : ""}${leaf.badge ? badgePill(leaf.badge, true) : ""}`;
  item.onclick = () => navigate(leaf.key);
  return item;
}

/* ---------------- Page rendering ---------------- */
function renderPage(key) {
  const page = PAGES[key] || PAGES[findFirstPageKey()];
  const main = document.getElementById("main-content");

  const breadcrumbHtml = (page.breadcrumb || [])
    .map((b) => `<span>${b}</span>`)
    .concat([`<span>${page.title}</span>`])
    .join(' <span style="opacity:.5"> / </span> ');

  const badgesHtml = (page.badges || []).map((b) => badgePill(b)).join(" ");

  const newBanner = page.isNew
    ? `<div class="new-page-banner">🆕 <span>Proposed new page — this content does not exist in the current documentation. Drafted for prototype review.</span></div>`
    : "";

  main.innerHTML = `
    <div class="breadcrumbs">${breadcrumbHtml}</div>
    ${newBanner}
    <article>
      <h1>${page.title}</h1>
      <div class="page-badges">${badgesHtml}</div>
      ${page.html}
    </article>
  `;

  renderToc(main);
}

function renderToc(main) {
  const tocEl = document.getElementById("toc-rail");
  const headings = main.querySelectorAll("article h2, article h3");
  if (!headings.length) {
    tocEl.innerHTML = "";
    return;
  }
  let html = `<div class="toc-rail-title">On this page</div>`;
  headings.forEach((h, i) => {
    const id = "toc-" + i;
    h.id = id;
    const indent = h.tagName === "H3" ? "padding-left:1.1rem;font-size:0.76rem;" : "";
    html += `<a href="#" style="${indent}" onclick="event.preventDefault(); document.getElementById('${id}').scrollIntoView({behavior:'smooth'});">${h.textContent}</a>`;
  });
  tocEl.innerHTML = html;
}

/* ---------------- Theme toggle ---------------- */
function toggleTheme() {
  const root = document.documentElement;
  const isDark = root.getAttribute("data-theme") === "dark";
  root.setAttribute("data-theme", isDark ? "light" : "dark");
  document.getElementById("theme-icon").textContent = isDark ? "🌙" : "☀️";
}

function toggleMobileSidebar() {
  document.getElementById("sidebar").classList.toggle("mobile-open");
}

window.addEventListener("hashchange", onHashChange);
window.addEventListener("DOMContentLoaded", onHashChange);
