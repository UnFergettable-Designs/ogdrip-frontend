import { walk } from "https://deno.land/std@0.204.0/fs/walk.ts";

const errors = [];

// Check for Svelte imports without extension
for await (const entry of walk("./src", { exts: [".astro"] })) {
  const content = await Deno.readTextFile(entry.path);
  const svelteImports = content.match(/import .* from ["'].*\/.*OpenGraph.*["']/g);
  
  if (svelteImports) {
    for (const importStr of svelteImports) {
      if (importStr.includes("OpenGraphForm") && !importStr.includes(".svelte")) {
        errors.push(`${entry.path}: Missing .svelte extension in import: ${importStr}`);
      }
    }
  }
}

// Output results
if (errors.length > 0) {
  console.error("❌ Found import issues:");
  errors.forEach(e => console.error(e));
  Deno.exit(1);
} else {
  console.log("✅ All imports look good!");
}
