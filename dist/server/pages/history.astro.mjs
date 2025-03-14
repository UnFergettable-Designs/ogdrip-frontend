;!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:{},n=(new e.Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="b3f95c86-e25b-41d4-8045-e30d167891ad",e._sentryDebugIdIdentifier="sentry-dbid-b3f95c86-e25b-41d4-8045-e30d167891ad")}catch(e){}}();import '../assets/page-ssr-BT8hj9vb.js';
import { c as createComponent, a as createAstro, r as renderComponent, b as renderScript, d as renderTemplate, m as maybeRenderHead, e as addAttribute } from '../assets/astro/server-Dn10uLf2.js';
import { $ as $$Layout } from '../assets/Layout-CbYzmFfP.js';
export { r as renderers } from '../assets/_@astro-renderers-DH1ypLgn.js';

const $$Astro = createAstro();
const prerender = false;
const $$History = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$History;
  let generations = [];
  let error = null;
  let totalCount = 0;
  let pageSize = 20;
  let currentPage = 1;
  let isAuthenticated = false;
  let adminAuthRequired = undefined                                           === "true";
  const API_URL = "http://localhost:8888";
  {
    try {
      const isBuildTime = true;
      if (!isBuildTime) ; else {
        console.log("Running in build mode, skipping backend API calls");
      }
    } catch (e) {
      console.warn("Error during SSR rendering:", e);
    }
  }
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Generation History - Open Graph Generator", "data-astro-cid-tal57otx": true }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<main data-astro-cid-tal57otx> <div class="header-container" data-astro-cid-tal57otx> <h1 data-astro-cid-tal57otx>Generation History</h1> <p class="subtitle" data-astro-cid-tal57otx>View your recent Open Graph image generations</p> ${isAuthenticated && renderTemplate`<div class="admin-controls" data-astro-cid-tal57otx> <span class="admin-badge" data-astro-cid-tal57otx>Admin</span> <a href="/admin/logout" class="logout-button" data-astro-cid-tal57otx>
Logout
</a> </div>`} </div> ${error && renderTemplate`<div class="error-message" data-astro-cid-tal57otx> <p data-astro-cid-tal57otx>Error: ${error}</p> <button id="retry-button" data-astro-cid-tal57otx>Retry</button> </div>`} <div class="history-controls" data-astro-cid-tal57otx> <div class="filter-controls" data-astro-cid-tal57otx> <label for="status-filter" data-astro-cid-tal57otx>Filter by status:</label> <select id="status-filter" data-astro-cid-tal57otx> <option value="all" data-astro-cid-tal57otx>All</option> <option value="completed" data-astro-cid-tal57otx>Completed</option> <option value="pending" data-astro-cid-tal57otx>Pending</option> <option value="failed" data-astro-cid-tal57otx>Failed</option> </select> </div> <div class="sort-controls" data-astro-cid-tal57otx> <label for="sort-order" data-astro-cid-tal57otx>Sort by:</label> <select id="sort-order" data-astro-cid-tal57otx> <option value="newest" data-astro-cid-tal57otx>Newest first</option> <option value="oldest" data-astro-cid-tal57otx>Oldest first</option> </select> </div> </div> <div id="generations-container" class="generations-grid" data-astro-cid-tal57otx> ${generations.map(
    (gen) => renderTemplate`<div class="generation-card"${addAttribute(gen.id, "data-id")}${addAttribute(gen.status, "data-status")} data-astro-cid-tal57otx> <div class="image-container" data-astro-cid-tal57otx> ${gen.image_path && renderTemplate`<img${addAttribute(`${API_URL}/api/download/${gen.id}/image`, "src")}${addAttribute(gen.title || "Generated Image", "alt")} loading="lazy" data-astro-cid-tal57otx>`} ${!gen.image_path && renderTemplate`<div class="no-image" data-astro-cid-tal57otx>No image available</div>`} <div class="status-badge status-{gen.status}" data-astro-cid-tal57otx>${gen.status}</div> </div> <div class="generation-details" data-astro-cid-tal57otx> <h3 data-astro-cid-tal57otx>${gen.title || "Untitled"}</h3> <p class="description" data-astro-cid-tal57otx>${gen.description || "No description"}</p> <p class="created-date" data-astro-cid-tal57otx>
Created: ${new Date(gen.created_at).toLocaleString()} </p> <div class="generation-actions" data-astro-cid-tal57otx> ${gen.status === "completed" && renderTemplate`<a${addAttribute(`${API_URL}/api/download/${gen.id}`, "href")} class="download-button" data-astro-cid-tal57otx>
Download
</a>`} <button class="view-details-button"${addAttribute(gen.id, "data-id")} data-astro-cid-tal57otx>
View Details
</button> </div> </div> </div>`
  )} </div> ${generations.length === 0 && !error && renderTemplate`<div class="no-generations" data-astro-cid-tal57otx> <p data-astro-cid-tal57otx>
No generations found. Try generating some Open Graph images first!
</p> <a href="/" class="button" data-astro-cid-tal57otx>
Go to Generator
</a> </div>`} <div class="pagination" data-astro-cid-tal57otx> <button id="prev-page"${addAttribute(currentPage <= 1, "disabled")} data-astro-cid-tal57otx>Previous</button> <span id="page-info" data-astro-cid-tal57otx>Page ${currentPage} of ${Math.ceil(totalCount / pageSize) || 1}</span> <button id="next-page"${addAttribute(currentPage >= Math.ceil(totalCount / pageSize), "disabled")} data-astro-cid-tal57otx>Next</button> </div> <!-- Modal for generation details --> <div id="details-modal" class="modal" data-astro-cid-tal57otx> <div class="modal-content" data-astro-cid-tal57otx> <span class="close-button" data-astro-cid-tal57otx>&times;</span> <h2 data-astro-cid-tal57otx>Generation Details</h2> <div id="modal-content" data-astro-cid-tal57otx> <!-- Will be populated by JavaScript --> </div> </div> </div> </main> ` })} ${renderScript($$result, "/Users/johnferguson/Github/ogdrip/frontend/src/pages/history.astro?astro&type=script&index=0&lang.ts")} `;
}, "/Users/johnferguson/Github/ogdrip/frontend/src/pages/history.astro", void 0);
const $$file = "/Users/johnferguson/Github/ogdrip/frontend/src/pages/history.astro";
const $$url = "/history";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$History,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
