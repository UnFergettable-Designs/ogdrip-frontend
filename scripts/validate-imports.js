#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

/** @type {string[]} */
const errors = [];

/**
 * Walks through directories recursively and applies callback to matching files
 * @param {string} dir - Directory to walk
 * @param {string[]} fileExtFilter - Array of file extensions to match
 * @param {function(string):void} callback - Function to call for each matching file
 */
function walkDir(dir, fileExtFilter, callback) {
  const files = fs.readdirSync(dir);
  
  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      walkDir(filePath, fileExtFilter, callback);
    } else if (fileExtFilter.includes(path.extname(filePath))) {
      callback(filePath);
    }
  }
}

// Check for Svelte imports without extension
walkDir('./src', ['.astro'], (filePath) => {
  const content = fs.readFileSync(filePath, 'utf-8');
  const svelteImports = content.match(/import .* from ["'].*\/.*OpenGraph.*["']/g);
  
  if (svelteImports) {
    for (const importStr of svelteImports) {
      if (importStr.includes("OpenGraphForm") && !importStr.includes(".svelte")) {
        errors.push(`${filePath}: Missing .svelte extension in import: ${importStr}`);
      }
    }
  }
});

// Output results
if (errors.length > 0) {
  console.error("❌ Found import issues:");
  errors.forEach(e => console.error(e));
  process.exit(1);
} else {
  console.log("✅ All imports look good!");
}
