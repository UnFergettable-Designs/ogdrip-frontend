/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly BACKEND_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

declare namespace App {
  interface Locals {
    // Define Astro locals if needed
  }
}

declare module "*.svg" {
  const content: any;
  export default content;
}

// Fix Element | Document | ShadowRoot error
declare module "astro:content" {
  interface AstroGlobal {
    site: string;
  }
}
