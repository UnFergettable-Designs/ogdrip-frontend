;!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:{},n=(new e.Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="f53dbb9a-f85e-4176-b7c1-b5717f1837fb",e._sentryDebugIdIdentifier="sentry-dbid-f53dbb9a-f85e-4176-b7c1-b5717f1837fb")}catch(e){}}();import '../../assets/page-ssr-DjA3kSal.js';
import { c as createComponent, a as createAstro, r as renderComponent, b as renderScript, d as renderTemplate, m as maybeRenderHead, e as addAttribute } from '../../assets/astro/server-DQjbNsKJ.js';
import { $ as $$Layout } from '../../assets/Layout-DMf9HhLr.js';
import { B as BROWSER } from '../../assets/false-CEq7RL57.js';
/* empty css                                   */
export { r as renderers } from '../../assets/_@astro-renderers-DH1ypLgn.js';

const $$Astro = createAstro();
const prerender = false;
const $$Login = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Login;
  let adminToken = "";
  let error = "";
  let redirectTo = "/history";
  try {
    if (!BROWSER) {
      const isBuildTime = true;
      if (!isBuildTime) ;
    }
  } catch (e) {
    console.warn("Error during server-side rendering:", e);
  }
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Admin Login - OGDrip", "data-astro-cid-rf56lckb": true }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<main class="admin-login-container" data-astro-cid-rf56lckb> <div class="admin-login-card" data-astro-cid-rf56lckb> <div class="logo-container" data-astro-cid-rf56lckb> <img src="/images/ogdrip_logo.webp" alt="OG Drip Logo" class="admin-logo" data-astro-cid-rf56lckb> </div> <h1 data-astro-cid-rf56lckb>Admin Login</h1> <p class="subtitle" data-astro-cid-rf56lckb>Please enter your admin token to continue</p> ${error} <form id="admin-login-form" class="login-form" data-astro-cid-rf56lckb> <div class="form-group" data-astro-cid-rf56lckb> <label for="admin-token" data-astro-cid-rf56lckb>Admin Token</label> <input type="password" id="admin-token" name="admin-token" placeholder="Enter your admin token" required autocomplete="off" data-astro-cid-rf56lckb> </div> <input type="hidden" id="redirect-to"${addAttribute(redirectTo, "value")} data-astro-cid-rf56lckb> <button type="submit" class="login-button" data-astro-cid-rf56lckb>Login</button> <div class="form-footer" data-astro-cid-rf56lckb> <a href="/" class="back-link" data-astro-cid-rf56lckb>← Back to Home</a> </div> </form> </div> </main> ` })} ${renderScript($$result, "/Users/johnferguson/Github/ogdrip/frontend/src/pages/admin/login.astro?astro&type=script&index=0&lang.ts")} `;
}, "/Users/johnferguson/Github/ogdrip/frontend/src/pages/admin/login.astro", void 0);
const $$file = "/Users/johnferguson/Github/ogdrip/frontend/src/pages/admin/login.astro";
const $$url = "/admin/login";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Login,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
