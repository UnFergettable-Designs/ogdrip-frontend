;!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:{},n=(new e.Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="db0615e1-20db-46e4-9b38-eee2a408481f",e._sentryDebugIdIdentifier="sentry-dbid-db0615e1-20db-46e4-9b38-eee2a408481f")}catch(e){}}();import '../assets/page-ssr-DcytLDl0.js';
import { c as createComponent, r as renderComponent, d as renderTemplate, m as maybeRenderHead, e as addAttribute } from '../assets/astro/server-natjiicX.js';
import { $ as $$Layout } from '../assets/Layout-DHy68yoU.js';
import { g as getCollection } from '../assets/_astro_content-CvOVKMSh.js';
export { r as renderers } from '../assets/_@astro-renderers-DH1ypLgn.js';

const $$Documentation = createComponent(async ($$result, $$props, $$slots) => {
  const backend_docs = await getCollection("backend_docs");
  const frontend_docs = await getCollection("frontend_docs");
  const sortedBackendDocs = backend_docs.sort(
    (a, b) => (a.data.order || 99) - (b.data.order || 99)
  );
  const sortedFrontendDocs = frontend_docs.sort(
    (a, b) => (a.data.order || 99) - (b.data.order || 99)
  );
  const title = "Documentation - Open Graph Generator";
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": title, "data-astro-cid-7boucb6x": true }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<main data-astro-cid-7boucb6x> <h1 data-astro-cid-7boucb6x>Documentation</h1> <p class="subtitle" data-astro-cid-7boucb6x>
Everything you need to know about the Open Graph Generator
</p> <div class="docs-container" data-astro-cid-7boucb6x> <div class="docs-section" data-astro-cid-7boucb6x> <h2 data-astro-cid-7boucb6x>Frontend Documentation</h2> <p data-astro-cid-7boucb6x>Learn how to use the Open Graph Generator in your projects</p> <ul class="docs-list" data-astro-cid-7boucb6x> ${sortedFrontendDocs.map((doc) => renderTemplate`<li class="doc-item" data-astro-cid-7boucb6x> <a${addAttribute(`/docs/frontend/${doc.slug}`, "href")} data-astro-cid-7boucb6x> <h3 data-astro-cid-7boucb6x>${doc.data.title}</h3> <p data-astro-cid-7boucb6x>${doc.data.description}</p> ${doc.data.updated && renderTemplate`<span class="updated-date" data-astro-cid-7boucb6x>
Updated: ${doc.data.updated.toLocaleDateString()} </span>`} </a> </li>`)} </ul> </div> <div class="docs-section" data-astro-cid-7boucb6x> <h2 data-astro-cid-7boucb6x>Backend Documentation</h2> <p data-astro-cid-7boucb6x>Technical documentation for developers and administrators</p> <ul class="docs-list" data-astro-cid-7boucb6x> ${sortedBackendDocs.map((doc) => renderTemplate`<li class="doc-item" data-astro-cid-7boucb6x> <a${addAttribute(`/docs/backend/${doc.slug}`, "href")} data-astro-cid-7boucb6x> <h3 data-astro-cid-7boucb6x>${doc.data.title}</h3> <p data-astro-cid-7boucb6x>${doc.data.description}</p> ${doc.data.updated && renderTemplate`<span class="updated-date" data-astro-cid-7boucb6x>
Updated: ${doc.data.updated.toLocaleDateString()} </span>`} </a> </li>`)} </ul> </div> </div> </main> ` })} `;
}, "/Users/johnferguson/Github/ogdrip/frontend/src/pages/documentation.astro", void 0);

const $$file = "/Users/johnferguson/Github/ogdrip/frontend/src/pages/documentation.astro";
const $$url = "/documentation";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Documentation,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
