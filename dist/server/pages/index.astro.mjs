;!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:{},n=(new e.Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="e2defc14-f1bb-4b33-9f13-3e634290da90",e._sentryDebugIdIdentifier="sentry-dbid-e2defc14-f1bb-4b33-9f13-3e634290da90")}catch(e){}}();import '../assets/page-ssr-BT8hj9vb.js';
import { c as createComponent, r as renderComponent, d as renderTemplate, m as maybeRenderHead } from '../assets/astro/server-Dn10uLf2.js';
import { $ as $$Layout } from '../assets/Layout-CbYzmFfP.js';
import { p as push, b as bind_props, a as pop } from '../assets/_@astro-renderers-DH1ypLgn.js';
export { r as renderers } from '../assets/_@astro-renderers-DH1ypLgn.js';
import '../assets/index.95d291e9-BtU7vSbD.js';
import 'clsx';

const ATTR_REGEX = /[&"<]/g;
const CONTENT_REGEX = /[&<]/g;

/**
 * @template V
 * @param {V} value
 * @param {boolean} [is_attr]
 */
function escape_html(value, is_attr) {
	const str = String(value ?? '');

	const pattern = is_attr ? ATTR_REGEX : CONTENT_REGEX;
	pattern.lastIndex = 0;

	let escaped = '';
	let last = 0;

	while (pattern.test(str)) {
		const i = pattern.lastIndex - 1;
		const ch = str[i];
		escaped += str.substring(last, i) + (ch === '&' ? '&amp;' : ch === '"' ? '&quot;' : '&lt;');
		last = i + 1;
	}

	return escaped + str.substring(last);
}

/**
 * `<div translate={false}>` should be rendered as `<div translate="no">` and _not_
 * `<div translate="false">`, which is equivalent to `<div translate="yes">`. There
 * may be other odd cases that need to be added to this list in future
 * @type {Record<string, Map<any, string>>}
 */
const replacements = {
	translate: new Map([
		[true, 'yes'],
		[false, 'no']
	])
};

/**
 * @template V
 * @param {string} name
 * @param {V} value
 * @param {boolean} [is_boolean]
 * @returns {string}
 */
function attr(name, value, is_boolean = false) {
	if (value == null || (!value && is_boolean)) return '';
	const normalized = (name in replacements && replacements[name].get(value)) || value;
	const assignment = is_boolean ? '' : `="${escape_html(normalized, true)}"`;
	return ` ${name}${assignment}`;
}

// Store the references to globals in case someone tries to monkey patch these, causing the below
// to de-opt (this occurs often when using popular extensions).

/**
 * @template V
 * @param {V} value
 * @param {V | (() => V)} fallback
 * @param {boolean} [lazy]
 * @returns {V}
 */
function fallback(value, fallback, lazy = false) {
	return value === undefined
		? lazy
			? /** @type {() => V} */ (fallback)()
			: /** @type {V} */ (fallback)
		: value;
}

const __vite_import_meta_env__ = {"ASSETS_PREFIX": undefined, "BASE_URL": "/", "DEV": false, "MODE": "production", "PROD": true, "PUBLIC_BACKEND_URL": "http://localhost:8888", "SITE": undefined, "SSR": true};
function OpenGraphForm($$payload, $$props) {
  push();
  let target = fallback($$props["target"], () => typeof document !== "undefined" ? document.body : null, true);
  const API_URL = Object.assign(__vite_import_meta_env__, {}).PUBLIC_BACKEND_URL || // During development, these might be available
  Object.assign(__vite_import_meta_env__, {}).BACKEND_URL || // Fallback for safety
  "http://localhost:8888";
  const isDevelopment = Object.assign(__vite_import_meta_env__, {}).DEV === true;
  if (isDevelopment) {
    console.log("API URL:", API_URL);
    console.log("Environment:", Object.assign(__vite_import_meta_env__, {}));
  }
  let formData = {
    url: "",
    title: "",
    description: "",
    site: "",
    targetUrl: "",
    width: 1200,
    height: 630,
    quality: 90,
    wait: 2e3,
    selector: "body",
    debug: false,
    verbose: false
  };
  let loading = false;
  let apiStatus = "Unknown";
  $$payload.out += `<div class="form-container svelte-n6adk0"><form><div class="form-section svelte-n6adk0"><h2>Source</h2> <div class="form-group svelte-n6adk0"><label for="url" class="svelte-n6adk0">Webpage URL (Optional)</label> <input type="url" id="url" name="url"${attr("value", formData.url)} placeholder="https://example.com" class="svelte-n6adk0"> <p class="helper-text svelte-n6adk0">If provided, metadata will be extracted from this page. Include the
          protocol (http:// or https://).</p></div> <div class="form-group svelte-n6adk0"><label for="title" class="svelte-n6adk0">Title</label> <input type="text" id="title" name="title"${attr("value", formData.title)} placeholder="Your Page Title" class="svelte-n6adk0"></div> <div class="form-group svelte-n6adk0"><label for="description" class="svelte-n6adk0">Description</label> <textarea id="description" name="description" placeholder="A brief description of your content" rows="3" class="svelte-n6adk0">`;
  const $$body = escape_html(formData.description);
  if ($$body) {
    $$payload.out += `${$$body}`;
  }
  $$payload.out += `</textarea></div></div> <div class="form-section svelte-n6adk0"><h2>Open Graph Settings</h2> <div class="form-row svelte-n6adk0"><div class="form-group svelte-n6adk0"><label for="type" class="svelte-n6adk0">Content Type</label> <select id="type" name="type" class="svelte-n6adk0"><option value="website">Website</option><option value="article">Article</option><option value="product">Product</option><option value="profile">Profile</option></select></div> <div class="form-group svelte-n6adk0"><label for="site" class="svelte-n6adk0">Site Name</label> <input type="text" id="site" name="site"${attr("value", formData.site)} placeholder="Your Site Name" class="svelte-n6adk0"></div></div> <div class="form-group svelte-n6adk0"><label for="targetUrl" class="svelte-n6adk0">Target URL</label> <input type="url" id="targetUrl" name="targetUrl"${attr("value", formData.targetUrl)} placeholder="https://example.com/target-page" class="svelte-n6adk0"> <p class="helper-text svelte-n6adk0">URL that will be shared (can be different from source URL)</p></div></div> <div class="form-section svelte-n6adk0"><h2>Image Settings</h2> <div class="form-row svelte-n6adk0"><div class="form-group svelte-n6adk0"><label for="width" class="svelte-n6adk0">Width (px)</label> <input type="number" id="width" name="width"${attr("value", formData.width)} min="600" max="2400" class="svelte-n6adk0"></div> <div class="form-group svelte-n6adk0"><label for="height" class="svelte-n6adk0">Height (px)</label> <input type="number" id="height" name="height"${attr("value", formData.height)} min="300" max="1600" class="svelte-n6adk0"></div> <div class="form-group svelte-n6adk0"><label for="twitterCard" class="svelte-n6adk0">Twitter Card</label> <select id="twitterCard" name="twitterCard" class="svelte-n6adk0"><option value="summary">Summary</option><option value="summary_large_image">Summary Large Image</option></select></div></div> <div class="form-row svelte-n6adk0"><div class="form-group svelte-n6adk0"><label for="quality" class="svelte-n6adk0">Image Quality (1-100)</label> <input type="number" id="quality" name="quality"${attr("value", formData.quality)} min="1" max="100" class="svelte-n6adk0"></div> <div class="form-group svelte-n6adk0"><label for="wait" class="svelte-n6adk0">Wait Time (ms)</label> <input type="number" id="wait" name="wait"${attr("value", formData.wait)} min="0" max="10000" class="svelte-n6adk0"> <p class="helper-text svelte-n6adk0">Time to wait before capturing screenshot</p></div> <div class="form-group svelte-n6adk0"><label for="selector" class="svelte-n6adk0">CSS Selector</label> <input type="text" id="selector" name="selector"${attr("value", formData.selector)} placeholder="body" class="svelte-n6adk0"> <p class="helper-text svelte-n6adk0">Element to wait for before capturing</p></div></div> <div class="form-row svelte-n6adk0"><div class="form-group svelte-n6adk0"><label class="svelte-n6adk0"><input type="checkbox" name="debug"${attr("checked", formData.debug, true)} class="svelte-n6adk0"> Enable Debug Mode</label></div> <div class="form-group svelte-n6adk0"><label class="svelte-n6adk0"><input type="checkbox" name="verbose"${attr("checked", formData.verbose, true)} class="svelte-n6adk0"> Verbose Logging</label></div></div></div> <button type="submit" class="generate-button svelte-n6adk0"${attr("disabled", loading, true)}>${escape_html("Generate Open Graph Content")}</button> <button type="button" class="test-button svelte-n6adk0"${attr("disabled", loading, true)}>Test Direct API Submit</button></form> `;
  if (Object.assign(__vite_import_meta_env__, {}).DEV) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<div class="debug-panel svelte-n6adk0"><h3 class="svelte-n6adk0">Debug Information</h3> <div class="debug-item svelte-n6adk0"><strong>API URL:</strong> ${escape_html(API_URL)}</div> <div class="debug-item svelte-n6adk0"><strong>Development Mode:</strong> ${escape_html(isDevelopment ? "Yes" : "No")}</div> <div class="debug-item svelte-n6adk0"><strong>Browser:</strong> ${escape_html(typeof window !== "undefined" ? window.navigator.userAgent : "SSR mode")}</div> <div class="debug-item svelte-n6adk0"><strong>API Status:</strong> ${escape_html(apiStatus)}</div> `;
    {
      $$payload.out += "<!--[!-->";
    }
    $$payload.out += `<!--]--> <div class="debug-item svelte-n6adk0"><button class="debug-button svelte-n6adk0">Log Form Data</button> <button class="debug-button svelte-n6adk0">Test Health API</button> <button class="debug-button svelte-n6adk0">Test with XHR</button></div></div>`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--> `;
  {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--> `;
  {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--></div>`;
  bind_props($$props, { target });
  pop();
}

const $$Index = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "ogdrip - Social presence that drips with style", "data-astro-cid-j7pv25f6": true }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<h1 class="visually-hidden" data-astro-cid-j7pv25f6>OG Drip</h1> <p class="subtitle" data-astro-cid-j7pv25f6>Social presence that drips with style</p> ${renderComponent($$result2, "OpenGraphForm", OpenGraphForm, { "client:load": true, "target": "body", "client:component-hydration": "load", "client:component-path": "/Users/johnferguson/Github/ogdrip/frontend/src/components/OpenGraphForm.svelte", "client:component-export": "default", "data-astro-cid-j7pv25f6": true })} ` })} `;
}, "/Users/johnferguson/Github/ogdrip/frontend/src/pages/index.astro", void 0);

const $$file = "/Users/johnferguson/Github/ogdrip/frontend/src/pages/index.astro";
const $$url = "";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$Index,
	file: $$file,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
