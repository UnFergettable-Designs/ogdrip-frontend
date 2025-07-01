;!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:{},n=(new e.Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="173c6e1b-403b-443c-925a-c76782abc8b5",e._sentryDebugIdIdentifier="sentry-dbid-173c6e1b-403b-443c-925a-c76782abc8b5")}catch(e){}}();import '../assets/page-ssr-DjA3kSal.js';
import { c as createComponent, a as createAstro } from '../assets/astro/server-DQjbNsKJ.js';
import 'clsx';
import '../assets/Layout-DMf9HhLr.js';
import { B as BROWSER } from '../assets/false-CEq7RL57.js';
/* empty css                               */
export { r as renderers } from '../assets/_@astro-renderers-DH1ypLgn.js';

const $$Astro = createAstro();
const prerender = false;
const $$Docs = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Docs;
  const adminAuthRequired = undefined                                           === "true";
  let isAdmin = false;
  try {
    if (!BROWSER) {
      const isBuildTime = true;
      if (!isBuildTime) ;
    }
  } catch (e) {
    console.warn("Error accessing request headers:", e);
    isAdmin = false;
  }
  return Astro2.redirect("/documentation");
}, "/Users/johnferguson/Github/ogdrip/frontend/src/pages/docs.astro", void 0);
const $$file = "/Users/johnferguson/Github/ogdrip/frontend/src/pages/docs.astro";
const $$url = "/docs";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Docs,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
