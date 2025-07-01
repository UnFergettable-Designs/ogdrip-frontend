;!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:{},n=(new e.Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="ab09fae6-bb96-4548-948b-057e41fbbcd4",e._sentryDebugIdIdentifier="sentry-dbid-ab09fae6-bb96-4548-948b-057e41fbbcd4")}catch(e){}}();import '../assets/page-ssr-DjA3kSal.js';
import { c as createComponent, r as renderComponent, b as renderScript, d as renderTemplate, m as maybeRenderHead } from '../assets/astro/server-DQjbNsKJ.js';
import { $ as $$Layout } from '../assets/Layout-DMf9HhLr.js';
/* empty css                                   */
export { r as renderers } from '../assets/_@astro-renderers-DH1ypLgn.js';

const $$ApiTest = createComponent(async ($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "API Test - OG Drip", "data-astro-cid-dlpotvmw": true }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="api-test" data-astro-cid-dlpotvmw> <h1 data-astro-cid-dlpotvmw>API Connection Test</h1> <button id="testApi" data-astro-cid-dlpotvmw>Test Backend API</button> <div id="results" class="results" data-astro-cid-dlpotvmw></div> </div> ` })} ${renderScript($$result, "/Users/johnferguson/Github/ogdrip/frontend/src/pages/api-test.astro?astro&type=script&index=0&lang.ts")} `;
}, "/Users/johnferguson/Github/ogdrip/frontend/src/pages/api-test.astro", void 0);

const $$file = "/Users/johnferguson/Github/ogdrip/frontend/src/pages/api-test.astro";
const $$url = "/api-test";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$ApiTest,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
