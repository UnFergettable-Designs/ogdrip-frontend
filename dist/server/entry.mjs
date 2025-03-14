;!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:{},n=(new e.Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="7609b2df-3303-4a13-b47d-3baf158ae7bb",e._sentryDebugIdIdentifier="sentry-dbid-7609b2df-3303-4a13-b47d-3baf158ae7bb")}catch(e){}}();import { r as renderers } from './assets/_@astro-renderers-DH1ypLgn.js';
import { a as actions } from './assets/_noop-actions-CiuF6a4r.js';
import { c as createExports, s as serverEntrypointModule } from './assets/_@astrojs-ssr-adapter-ChY8-4oa.js';
import { manifest } from './manifest_Cf45yv8h.mjs';

const serverIslandMap = new Map();;

const _page0 = () => import('./pages/_image.astro.mjs');
const _page1 = () => import('./pages/admin/login.astro.mjs');
const _page2 = () => import('./pages/admin/logout.astro.mjs');
const _page3 = () => import('./pages/api-test.astro.mjs');
const _page4 = () => import('./pages/docs/admin.astro.mjs');
const _page5 = () => import('./pages/docs/backend/_---slug_.astro.mjs');
const _page6 = () => import('./pages/docs/frontend/_---slug_.astro.mjs');
const _page7 = () => import('./pages/docs.astro.mjs');
const _page8 = () => import('./pages/documentation.astro.mjs');
const _page9 = () => import('./pages/history.astro.mjs');
const _page10 = () => import('./pages/index.astro.mjs');
const pageMap = new Map([
    ["../node_modules/.pnpm/astro@5.4.3_@types+node@22.13.10_rollup@4.35.0_typescript@5.8.2_yaml@2.7.0/node_modules/astro/dist/assets/endpoint/node.js", _page0],
    ["src/pages/admin/login.astro", _page1],
    ["src/pages/admin/logout.astro", _page2],
    ["src/pages/api-test.astro", _page3],
    ["src/pages/docs/admin/index.astro", _page4],
    ["src/pages/docs/backend/[...slug].astro", _page5],
    ["src/pages/docs/frontend/[...slug].astro", _page6],
    ["src/pages/docs.astro", _page7],
    ["src/pages/documentation.astro", _page8],
    ["src/pages/history.astro", _page9],
    ["src/pages/index.astro", _page10]
]);

const _manifest = Object.assign(manifest, {
    pageMap,
    serverIslandMap,
    renderers,
    actions,
    middleware: () => import('./_astro-internal_middleware.mjs')
});
const _args = {
    "mode": "standalone",
    "client": "file:///Users/johnferguson/Github/ogdrip/frontend/dist/client/",
    "server": "file:///Users/johnferguson/Github/ogdrip/frontend/dist/server/",
    "host": "0.0.0.0",
    "port": 3000,
    "assets": "_astro"
};
const _exports = createExports(_manifest, _args);
const handler = _exports['handler'];
const startServer = _exports['startServer'];
const options = _exports['options'];
const _start = 'start';
if (_start in serverEntrypointModule) {
	serverEntrypointModule[_start](_manifest, _args);
}

export { handler, options, pageMap, startServer };
