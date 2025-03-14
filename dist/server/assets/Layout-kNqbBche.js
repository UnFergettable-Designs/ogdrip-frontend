;!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:{},n=(new e.Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="8d0ae229-d7c3-4caf-b207-429cdf05dd32",e._sentryDebugIdIdentifier="sentry-dbid-8d0ae229-d7c3-4caf-b207-429cdf05dd32")}catch(e){}}();import { c as createComponent, a as createAstro, m as maybeRenderHead, e as addAttribute, b as renderScript, d as renderTemplate, j as renderSlot, r as renderComponent, k as renderHead, u as unescapeHTML } from './astro/server-DWSwO9et.js';
import 'clsx';
import './login.a70697a9-Di5a0tWd.js';

const $$Astro$1 = createAstro();
const $$Header = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$Header;
  let logoSrc = "/images/ogdrip_logo.webp";
  const adminAuthRequired = false;
  let isAdmin = false;
  {
    try {
      const isBuildTime = true;
      if (!isBuildTime) ;
    } catch (e) {
      console.warn("Error accessing request headers:", e);
      isAdmin = false;
    }
  }
  const currentPath = Astro2.url.pathname;
  return renderTemplate`${maybeRenderHead()}<header class="header" data-astro-cid-3ef6ksr2> <div class="logo-container" data-astro-cid-3ef6ksr2> <img${addAttribute(logoSrc, "src")} alt="{title} logo" class="logo" data-astro-cid-3ef6ksr2> </div> <nav class="navigation" data-astro-cid-3ef6ksr2> <ul data-astro-cid-3ef6ksr2> <li data-astro-cid-3ef6ksr2><a href="/"${addAttribute(currentPath === "/" ? "active" : "", "class")} data-astro-cid-3ef6ksr2>Home</a></li> <li data-astro-cid-3ef6ksr2> <a href="/documentation"${addAttribute(currentPath === "/documentation" ? "active" : "", "class")} data-astro-cid-3ef6ksr2>Documentation</a> </li> <li data-astro-cid-3ef6ksr2> <a href="/history"${addAttribute(currentPath === "/history" ? "active" : "", "class")} data-astro-cid-3ef6ksr2>History</a> </li> ${isAdmin && renderTemplate`<li class="admin-indicator" data-astro-cid-3ef6ksr2> <span class="admin-badge" data-astro-cid-3ef6ksr2>Admin</span> <button id="admin-logout" title="Logout" data-astro-cid-3ef6ksr2> <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-astro-cid-3ef6ksr2> <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" data-astro-cid-3ef6ksr2></path> <polyline points="16 17 21 12 16 7" data-astro-cid-3ef6ksr2></polyline> <line x1="21" y1="12" x2="9" y2="12" data-astro-cid-3ef6ksr2></line> </svg> </button> </li>`} </ul> </nav> </header> ${renderScript($$result, "/Users/johnferguson/Github/ogdrip/frontend/src/components/Header.astro?astro&type=script&index=0&lang.ts")} `;
}, "/Users/johnferguson/Github/ogdrip/frontend/src/components/Header.astro", void 0);

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a;
const $$Astro = createAstro();
const $$Layout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Layout;
  const { title } = Astro2.props;
  const logoScript = `
  document.addEventListener('DOMContentLoaded', () => {
    const logoImg = document.getElementById('ogdrip-logo');
    logoImg.onerror = function() { 
      this.src = '/images/placeholder.svg';
    };
  });
`;
  return renderTemplate(_a || (_a = __template(['<html lang="en"> <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width"><link rel="icon" type="image/svg+xml" href="/favicon.svg"><meta name="generator"', "><title>", "</title><script>", "<\/script>", '</head> <body> <div class="container"> ', " <main> ", " </main> <footer> <p>Powered by Go and Astro with Deno</p> </footer> </div> </body></html>"])), addAttribute(Astro2.generator, "content"), title, unescapeHTML(logoScript), renderHead(), renderComponent($$result, "Header", $$Header, {}), renderSlot($$result, $$slots["default"]));
}, "/Users/johnferguson/Github/ogdrip/frontend/src/layouts/Layout.astro", void 0);

export { $$Layout as $ };
