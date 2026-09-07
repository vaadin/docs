#!/usr/bin/env node

// A crude tool for the Hilla Lit de-duplication effort: it renders each page in
// articles/hilla/lit and its counterpart in articles/hilla far enough to tell
// whether the two URLs produce the same article. Includes are resolved (with
// their tag), page attributes such as :hilla-lit: are collected, and
// ifdef/ifndef/endif blocks are evaluated with them, so a page built from a
// shared partial is compared as the reader sees it.
//
// Usage: node scripts/compare-hilla-lit-pages.mjs [path under articles/hilla/lit ...]
//
// With no arguments, every page in the Lit section is compared. Front matter is
// ignored; only the body counts.

import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve(import.meta.dirname, '..');
const litSection = 'articles/hilla/lit';

function tagged(lines, tag) {
  if (!tag) {
    return lines;
  }
  const start = lines.indexOf(`// tag::${tag}[]`);
  const end = lines.indexOf(`// end::${tag}[]`);
  return start === -1 || end === -1 ? lines : lines.slice(start + 1, end);
}

function stripFrontMatter(lines) {
  if (lines[0] !== '---') {
    return lines;
  }
  return lines.slice(lines.indexOf('---', 1) + 1);
}

function render(file, attributes = new Set()) {
  const lines = fs.readFileSync(path.join(root, file), 'utf8').split('\n');
  const conditions = [];
  const output = [];

  for (const line of lines) {
    let match = /^ifn?def::([\w-]+)\[\]$/.exec(line);
    if (match) {
      conditions.push(line.startsWith('ifndef') !== attributes.has(match[1]));
      continue;
    }
    if (/^endif::[\w-]*\[\]$/.test(line)) {
      conditions.pop();
      continue;
    }
    if (conditions.includes(false)) {
      continue;
    }

    match = /^:([\w-]+):\s*$/.exec(line);
    if (match) {
      attributes.add(match[1]);
      continue;
    }

    match = /^include::\{root\}\/(.+?)\[(?:tag=(\w+))?\]$/.exec(line);
    if (match) {
      const [, included, tag] = match;
      output.push(...tagged(render(included, attributes), tag));
      continue;
    }

    output.push(line);
  }

  return stripFrontMatter(output);
}

function significant(lines) {
  return lines.map((line) => line.trim()).filter(Boolean);
}

function pages(directory) {
  return fs
    .readdirSync(path.join(root, directory), { withFileTypes: true })
    .flatMap((entry) =>
      entry.isDirectory()
        ? pages(path.join(directory, entry.name))
        : entry.name.endsWith('.adoc')
          ? [path.join(directory, entry.name)]
          : []
    );
}

function resolve(argument) {
  const target = path.join(litSection, argument);
  if (!fs.existsSync(path.join(root, target))) {
    console.error(`No such page or directory: ${target}`);
    process.exit(1);
  }
  return fs.statSync(path.join(root, target)).isDirectory() ? pages(target) : [target];
}

const targets =
  process.argv.length > 2 ? process.argv.slice(2).flatMap(resolve) : pages(litSection);

let duplicates = 0;

for (const litPage of targets.sort()) {
  const mainPage = litPage.replace(`${litSection}/`, 'articles/hilla/');
  const name = litPage.replace(`${litSection}/`, '');

  if (!fs.existsSync(path.join(root, mainPage))) {
    console.log(`only in Lit  ${name}`);
    continue;
  }

  const lit = significant(render(litPage));
  const main = significant(render(mainPage));

  if (lit.length === 0 && main.length === 0) {
    console.log(`stub         ${name} (front matter only in both sections)`);
    continue;
  }

  const added = main.filter((line) => !lit.includes(line)).length;
  const removed = lit.filter((line) => !main.includes(line)).length;

  if (lit.join('\n') === main.join('\n')) {
    duplicates += 1;
    console.log(`duplicate    ${name}`);
  } else if (removed === 0) {
    duplicates += 1;
    console.log(
      `subset       ${name} (the main page adds ${added} lines, the Lit page adds nothing)`
    );
  } else {
    console.log(`differs      ${name} (+${added}/-${removed} lines vs the main page)`);
  }
}

console.log(
  `\n${duplicates} of ${targets.length} compared Lit pages render nothing that their main-section counterpart does not.`
);
