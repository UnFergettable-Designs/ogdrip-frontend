;!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:{},n=(new e.Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="2c60f03c-298a-4ef4-8b91-896bc977d450",e._sentryDebugIdIdentifier="sentry-dbid-2c60f03c-298a-4ef4-8b91-896bc977d450")}catch(e){}}();import '../../assets/page-ssr-DjA3kSal.js';
import { c as createComponent, a as createAstro } from '../../assets/astro/server-DQjbNsKJ.js';
import 'clsx';
export { r as renderers } from '../../assets/_@astro-renderers-DH1ypLgn.js';

const $$Astro = createAstro();
const $$Logout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Logout;
  {
    Astro2.response.headers.append(
      "Set-Cookie",
      "admin_token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Lax"
    );
    return Astro2.redirect("/");
  }
}, "/Users/johnferguson/Github/ogdrip/frontend/src/pages/admin/logout.astro", void 0);

const $$file = "/Users/johnferguson/Github/ogdrip/frontend/src/pages/admin/logout.astro";
const $$url = "/admin/logout";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Logout,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
