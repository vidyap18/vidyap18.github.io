/* Minimal runtime for .dc.html interactive demos embedded in docs iframes. */
(function () {
  "use strict";

  const STAGE_WIDTH = 1400;

  class DCLogic {
    constructor(props) {
      this.props = props || {};
      this.state = {};
      this._mounted = false;
      this._render = () => {};
    }

    setState(updater) {
      const prev = this.state;
      const patch =
        typeof updater === "function"
          ? updater(prev)
          : updater;
      const next = { ...prev, ...patch };
      if (shallowEqual(prev, next)) return;
      this.state = next;
      if (this._mounted) this._render();
    }

    componentDidMount() {}
    componentWillUnmount() {}
    renderVals() {
      return {};
    }
  }

  window.DCLogic = DCLogic;

  function shallowEqual(a, b) {
    const aKeys = Object.keys(a);
    const bKeys = Object.keys(b);
    if (aKeys.length !== bKeys.length) return false;
    for (const key of aKeys) {
      if (a[key] !== b[key]) return false;
    }
    return true;
  }

  function readAttr(el, name) {
    return el.getAttribute(name) || "";
  }

  function stripMustache(expr) {
    return expr.replace(/^\{\{\s*|\s*\}\}$/g, "").trim();
  }

  function resolvePath(path, scope) {
    const parts = path.split(".");
    let cur = scope;
    for (const part of parts) {
      if (cur == null) return undefined;
      cur = cur[part];
    }
    return cur;
  }

  function evalExpr(expr, scope) {
    expr = expr.trim();
    if (Object.prototype.hasOwnProperty.call(scope, expr)) return scope[expr];
    if (/^[a-zA-Z_$][\w$.]*$/.test(expr)) return resolvePath(expr, scope);
    return undefined;
  }

  function interpolate(text, scope) {
    if (!text.includes("{{")) return text;
    return text.replace(/\{\{\s*([^}]+?)\s*\}\}/g, (_, expr) => {
      const value = evalExpr(expr, scope);
      return value == null ? "" : String(value);
    });
  }

  function processNode(node, scope, handlers) {
    if (node.nodeType === Node.TEXT_NODE) {
      node.textContent = interpolate(node.textContent, scope);
      return;
    }
    if (node.nodeType !== Node.ELEMENT_NODE) return;

    const el = node;
    const tag = el.tagName.toLowerCase();

    if (tag === "sc-for") {
      const listExpr = stripMustache(readAttr(el, "list"));
      const asName = readAttr(el, "as") || "item";
      const placeholder = Number(readAttr(el, "hint-placeholder-count")) || 0;
      const list = evalExpr(listExpr, scope);
      const inner = el.innerHTML;
      const items =
        Array.isArray(list) && list.length
          ? list
          : Array.from({ length: placeholder }, () => ({}));

      const innerTemplate = document.createElement("template");
      innerTemplate.innerHTML = inner;

      const out = document.createDocumentFragment();
      items.forEach((item) => {
        const itemScope = { ...scope, [asName]: item };
        const clone = innerTemplate.content.cloneNode(true);
        Array.from(clone.childNodes).forEach((child) =>
          processNode(child, itemScope, handlers)
        );
        while (clone.firstChild) out.appendChild(clone.firstChild);
      });
      el.replaceWith(out);
      return;
    }

    if (tag === "sc-if") {
      const valueExpr = stripMustache(readAttr(el, "value"));
      const show = !!evalExpr(valueExpr, scope);
      const inner = el.innerHTML;
      const out = document.createDocumentFragment();
      if (show) {
        const block = document.createElement("template");
        block.innerHTML = inner;
        Array.from(block.content.childNodes).forEach((child) =>
          processNode(child, scope, handlers)
        );
        while (block.content.firstChild) out.appendChild(block.content.firstChild);
      }
      el.replaceWith(out);
      return;
    }

    Array.from(el.attributes).forEach((attr) => {
      const boundMatch = attr.value.match(/^\{\{\s*([^}]+?)\s*\}\}$/);
      if (boundMatch) {
        const handlerName = boundMatch[1].trim();
        const handler = scope[handlerName];
        if (typeof handler === "function") {
          handlers.push({ el, handler });
          el.removeAttribute(attr.name);
          return;
        }
      }
      if (attr.name === "style-hover") return;
      if (attr.value.includes("{{")) {
        el.setAttribute(attr.name, interpolate(attr.value, scope));
      }
    });

    if (el.hasAttribute("style-hover")) {
      const hoverStyle = el.getAttribute("style-hover");
      const baseStyle = el.getAttribute("style") || "";
      el.dataset.dcBaseStyle = baseStyle;
      el.dataset.dcHoverStyle = hoverStyle;
      el.classList.add("dc-hoverable");
      el.removeAttribute("style-hover");
    }

    Array.from(el.childNodes).forEach((child) => processNode(child, scope, handlers));
  }

  function renderTemplate(stage, html, scope, handlers) {
    const template = document.createElement("template");
    template.innerHTML = html.trim();
    Array.from(template.content.childNodes).forEach((child) =>
      processNode(child, scope, handlers)
    );
    stage.replaceChildren();
    while (template.content.firstChild) {
      stage.appendChild(template.content.firstChild);
    }
  }

  function applyHelmet(helmetEl) {
    if (!helmetEl) return;
    Array.from(helmetEl.children).forEach((child) => {
      const tag = child.tagName.toLowerCase();
      if (tag === "link") {
        const href = child.getAttribute("href");
        if (href && !document.querySelector(`link[href="${href}"]`)) {
          document.head.appendChild(child.cloneNode(true));
        }
      } else if (tag === "style" || tag === "meta") {
        document.head.appendChild(child.cloneNode(true));
      }
    });
  }

  function heightMessageType() {
    if (window.__DC_HEIGHT_MESSAGE__) return window.__DC_HEIGHT_MESSAGE__;
    const path = location.pathname || "";
    return path.includes("app-style") ? "app-style-preview-height" : "theme-preview-height";
  }

  function mount() {
    const root = document.querySelector("x-dc");
    const scriptEl = document.querySelector('script[type="text/x-dc"][data-dc-script]');
    if (!root || !scriptEl) return;

    applyHelmet(root.querySelector("helmet"));

    if (!document.getElementById("dc-hover-styles")) {
      const style = document.createElement("style");
      style.id = "dc-hover-styles";
      style.textContent = ".dc-hoverable:hover { /* applied via JS */ }";
      document.head.appendChild(style);
    }

    const templateParts = [];
    Array.from(root.childNodes).forEach((node) => {
      if (node.nodeType === Node.ELEMENT_NODE && node.tagName.toLowerCase() === "helmet") return;
      if (node.nodeType === Node.TEXT_NODE && !node.textContent.trim()) return;
      templateParts.push(
        node.nodeType === Node.ELEMENT_NODE ? node.outerHTML : node.textContent
      );
    });
    const templateHtml = templateParts.join("");

    const app = document.createElement("div");
    app.id = "dc-viewport";
    app.style.width = "100%";
    app.style.overflow = "hidden";

    const stage = document.createElement("div");
    stage.id = "dc-stage";
    stage.style.transformOrigin = "top left";
    app.appendChild(stage);
    root.replaceWith(app);

    let props = {};
    const propsAttr = scriptEl.getAttribute("data-props");
    if (propsAttr) {
      try {
        props = JSON.parse(propsAttr);
      } catch {
        props = {};
      }
    }

    let ComponentClass;
    try {
      ComponentClass = new Function(
        "DCLogic",
        `${scriptEl.textContent}\n;return typeof Component !== "undefined" ? Component : null;`
      )(DCLogic);
    } catch (error) {
      console.error("[support.js] Failed to load demo component:", error);
      return;
    }

    if (typeof ComponentClass !== "function") {
      console.error("[support.js] Demo component class was not found.");
      return;
    }

    const instance = new ComponentClass(props);
    let lastReportedHeight = 0;
    let fitRaf = 0;
    let renderRaf = 0;

    function reportHeight(height) {
      if (Math.abs(height - lastReportedHeight) <= 1) return;
      lastReportedHeight = height;
      window.parent.postMessage({ type: heightMessageType(), height }, "*");
    }

    function fitStage() {
      if (fitRaf) cancelAnimationFrame(fitRaf);
      fitRaf = requestAnimationFrame(() => {
        fitRaf = 0;
        const viewport = document.getElementById("dc-viewport");
        const stageEl = document.getElementById("dc-stage");
        if (!viewport || !stageEl) return;

        const scale = Math.min(1, document.documentElement.clientWidth / STAGE_WIDTH);
        stageEl.dataset.scale = String(scale);
        stageEl.style.transform = scale < 1 ? `scale(${scale})` : "";
        stageEl.style.transformOrigin = "top left";
        stageEl.style.width = scale < 1 ? `${STAGE_WIDTH}px` : "100%";

        const height = Math.ceil(stageEl.getBoundingClientRect().height);
        viewport.style.height = `${height}px`;
        reportHeight(height);
      });
    }

    function bindHoverHandlers() {
      stage.querySelectorAll(".dc-hoverable").forEach((el) => {
        const baseStyle = el.dataset.dcBaseStyle || "";
        const hoverStyle = el.dataset.dcHoverStyle || "";
        el.onmouseenter = () => {
          el.setAttribute("style", `${baseStyle};${hoverStyle}`);
        };
        el.onmouseleave = () => {
          el.setAttribute("style", baseStyle);
        };
      });
    }

    function invokeHandler(el, handler, event) {
      Object.defineProperty(event, "currentTarget", {
        configurable: true,
        value: el,
      });
      handler.call(instance, event);
    }

    function handleStageClick(event) {
      let el = event.target instanceof Element ? event.target : null;
      while (el && el !== stage) {
        if (typeof el._dcHandler === "function") {
          invokeHandler(el, el._dcHandler, event);
          return;
        }
        el = el.parentElement;
      }
    }

    function handleStageChange(event) {
      const target = event.target;
      if (!(target instanceof Element) || !stage.contains(target)) return;
      if (typeof target._dcHandler === "function") {
        invokeHandler(target, target._dcHandler, event);
      }
    }

    stage.addEventListener("click", handleStageClick);
    stage.addEventListener("change", handleStageChange);

    function attachHandlers(handlers) {
      handlers.forEach(({ el, handler }) => {
        el._dcHandler = handler;
      });
    }

    function doRender() {
      const vals = instance.renderVals ? instance.renderVals() : {};
      const scope = { ...instance.state, ...vals, props: instance.props };
      const handlers = [];
      renderTemplate(stage, templateHtml, scope, handlers);
      attachHandlers(handlers);
      bindHoverHandlers();
      fitStage();
    }

    const scheduleRender = () => {
      if (renderRaf) cancelAnimationFrame(renderRaf);
      renderRaf = requestAnimationFrame(() => {
        renderRaf = 0;
        doRender();
      });
    };

    instance._render = scheduleRender;
    instance._mounted = true;
    doRender();
    instance.componentDidMount();

    let resizeTimer = 0;
    window.addEventListener("resize", () => {
      clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(fitStage, 150);
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", mount);
  } else {
    mount();
  }
})();
