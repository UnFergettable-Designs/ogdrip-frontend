;!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:{},n=(new e.Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="ec182828-5729-46bb-839a-d229d2a832ae",e._sentryDebugIdIdentifier="sentry-dbid-ec182828-5729-46bb-839a-d229d2a832ae")}catch(e){}}();import { ad as NOOP_MIDDLEWARE_HEADER } from './astro/server-DWSwO9et.js';

const NOOP_MIDDLEWARE_FN = async (_ctx, next) => {
  const response = await next();
  response.headers.set(NOOP_MIDDLEWARE_HEADER, "true");
  return response;
};

export { NOOP_MIDDLEWARE_FN as N };
