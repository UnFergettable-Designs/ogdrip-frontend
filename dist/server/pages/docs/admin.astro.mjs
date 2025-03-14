;!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:{},n=(new e.Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="d5d0733b-b3fa-436e-9d70-32b6375d2c68",e._sentryDebugIdIdentifier="sentry-dbid-d5d0733b-b3fa-436e-9d70-32b6375d2c68")}catch(e){}}();import '../../assets/page-ssr-BT8hj9vb.js';
import { c as createComponent, a as createAstro } from '../../assets/astro/server-Dn10uLf2.js';
import 'clsx';
export { r as renderers } from '../../assets/_@astro-renderers-DH1ypLgn.js';

const $$Astro = createAstro();
const $$Index = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Index;
  return Astro2.redirect("/docs/backend/admin-access");
}, "/Users/johnferguson/Github/ogdrip/frontend/src/pages/docs/admin/index.astro", void 0);

const $$file = "/Users/johnferguson/Github/ogdrip/frontend/src/pages/docs/admin/index.astro";
const $$url = "/docs/admin";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$Index,
	file: $$file,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
