;!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:{},n=(new e.Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="5b619c68-86bc-4eb7-b3bb-f5b408538ddc",e._sentryDebugIdIdentifier="sentry-dbid-5b619c68-86bc-4eb7-b3bb-f5b408538ddc")}catch(e){}}();import '../assets/page-ssr-CCPBSLtm.js';
import { c as createComponent, r as renderComponent, b as renderScript, d as renderTemplate, m as maybeRenderHead } from '../assets/astro/server-C1gvCaV3.js';
import { $ as $$Layout } from '../assets/Layout-CWf2QrOb.js';
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
