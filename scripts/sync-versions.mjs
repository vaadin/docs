#!/usr/bin/env node

/**
 * Keeps the version attributes in articles/_vaadin-version.adoc in sync with
 * the versions the code examples are actually built against.
 *
 * pom.xml is the source of truth: it's bumped by Vaadin Bot on every platform
 * release, while articles/_vaadin-version.adoc used to be updated by hand.
 *
 * Usage:
 *   node scripts/sync-versions.mjs              # check only; exits 1 when out of sync
 *   node scripts/sync-versions.mjs --fix        # rewrite the attributes
 *   node scripts/sync-versions.mjs --skip-flow  # skip the attribute that needs Maven
 */

import { execSync } from 'node:child_process';
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const PROJECT_DIR = join(__dirname, '..');
const POM_PATH = join(PROJECT_DIR, 'pom.xml');
const ADOC_PATH = join(PROJECT_DIR, 'articles', '_vaadin-version.adoc');

/**
 * The download links point at a release train rather than an exact version, so
 * `25.3.0-beta3` becomes `v25.3`.
 */
export function toStartPlatformVersion(version) {
  const match = /^(\d+)\.(\d+)(?:[.-]|$)/.exec(version);
  if (!match) {
    throw new Error(`Can't derive a start.vaadin.com version from "${version}".`);
  }
  return `v${match[1]}.${match[2]}`;
}

/**
 * Where each documented version comes from:
 *
 * - `pom` reads an element out of a tagged region of pom.xml. Going through the
 *   tags keeps an unrelated <version> elsewhere in the POM -- there are many --
 *   from ever matching.
 * - `maven` resolves an artifact from the dependency tree. Flow isn't pinned in
 *   pom.xml, and its version isn't always the platform version: the BOM ships
 *   sub-components on their own qualifiers.
 * - `derived` is computed from another attribute, so it needs no lookup.
 */
export const MAPPINGS = [
  {
    label: 'Vaadin',
    attribute: 'vaadin-version',
    source: { kind: 'pom', tag: 'vaadin-version', element: 'vaadin.version' },
  },
  {
    label: 'Spring Boot',
    attribute: 'spring-boot-version',
    source: { kind: 'pom', tag: 'spring-version', element: 'version' },
  },
  {
    label: 'Flow',
    attribute: 'vaadin-flow-version',
    source: { kind: 'maven', artifact: 'com.vaadin:flow-server' },
  },
  {
    label: 'start.vaadin.com',
    attribute: 'vaadin-start-platform-version',
    source: { kind: 'derived', from: 'vaadin-version', derive: toStartPlatformVersion },
  },
];

function escapeRegExp(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/** Returns the content between `<!-- tag::<tag>[] -->` and its end marker. */
export function readTaggedRegion(pom, tag) {
  const region = new RegExp(
    `<!--\\s*tag::${escapeRegExp(tag)}\\[\\]\\s*-->([\\s\\S]*?)<!--\\s*end::${escapeRegExp(tag)}\\[\\]\\s*-->`
  ).exec(pom);
  if (!region) {
    throw new Error(
      `pom.xml has no tag::${tag}[] region. Restore the tag comments around the ` +
        `version, or update the mapping in scripts/sync-versions.mjs.`
    );
  }
  return region[1];
}

/** Reads a single version out of a tagged region of pom.xml. */
export function extractPomVersion(pom, { tag, element }) {
  const region = readTaggedRegion(pom, tag);
  const match = new RegExp(
    `<${escapeRegExp(element)}>\\s*([^<>\\s][^<>]*?)\\s*</${escapeRegExp(element)}>`
  ).exec(region);
  if (!match) {
    throw new Error(`No <${element}> element inside the tag::${tag}[] region of pom.xml.`);
  }
  return match[1];
}

/** Picks an artifact's version out of `mvn dependency:tree -DoutputType=text` output. */
export function extractTreeVersion(tree, artifact) {
  const match = new RegExp(`${escapeRegExp(artifact)}:[^:]+:([^:\\s]+):`).exec(tree);
  if (!match) {
    throw new Error(`${artifact} isn't in the Maven dependency tree.`);
  }
  return match[1];
}

function resolveFromMaven(artifact) {
  let tree;
  try {
    tree = execSync(`mvn -B dependency:tree -DoutputType=text -Dincludes=${artifact}`, {
      encoding: 'utf-8',
      cwd: PROJECT_DIR,
      stdio: ['pipe', 'pipe', 'pipe'],
    });
  } catch (e) {
    throw new Error(
      `Couldn't resolve ${artifact} with Maven: ${e.message.split('\n')[0]}\n` +
        'Pass --skip-flow to check the other versions without Maven.'
    );
  }
  return extractTreeVersion(tree, artifact);
}

function attributePattern(name) {
  return new RegExp(`^:${escapeRegExp(name)}:[ \\t]*(.*?)[ \\t]*$`, 'm');
}

/** Reads an AsciiDoc attribute value, or null when the attribute is missing. */
export function readAdocAttribute(adoc, name) {
  const match = attributePattern(name).exec(adoc);
  return match ? match[1] : null;
}

/** Replaces an AsciiDoc attribute value, leaving every other line untouched. */
export function updateAdocAttribute(adoc, name, value) {
  if (readAdocAttribute(adoc, name) === null) {
    throw new Error(`articles/_vaadin-version.adoc has no :${name}: attribute.`);
  }
  return adoc.replace(attributePattern(name), () => `:${name}: ${value}`);
}

/**
 * Resolves what every mapped attribute should say. `derived` mappings read the
 * already-resolved value of the attribute they're derived from, so the source of
 * a derivation has to come first in MAPPINGS.
 */
export function resolveExpected(mappings, { pom, resolveMaven }) {
  const expected = new Map();
  for (const { attribute, source } of mappings) {
    if (source.kind === 'pom') {
      expected.set(attribute, extractPomVersion(pom, source));
    } else if (source.kind === 'maven') {
      expected.set(attribute, resolveMaven(source.artifact));
    } else if (source.kind === 'derived') {
      const from = expected.get(source.from);
      if (from === undefined) {
        throw new Error(
          `:${attribute}: is derived from :${source.from}:, which isn't resolved yet.`
        );
      }
      expected.set(attribute, source.derive(from));
    } else {
      throw new Error(`Unknown source kind "${source.kind}" for :${attribute}:.`);
    }
  }
  return expected;
}

function main() {
  const fix = process.argv.includes('--fix');
  const skipFlow = process.argv.includes('--skip-flow');
  const mappings = MAPPINGS.filter((m) => !(skipFlow && m.source.kind === 'maven'));

  const pom = readFileSync(POM_PATH, 'utf-8');
  let adoc = readFileSync(ADOC_PATH, 'utf-8');
  const expected = resolveExpected(mappings, { pom, resolveMaven: resolveFromMaven });

  const outdated = [];
  for (const { label, attribute } of mappings) {
    const actual = readAdocAttribute(adoc, attribute);
    if (actual === null) {
      throw new Error(`articles/_vaadin-version.adoc has no :${attribute}: attribute.`);
    }
    if (actual !== expected.get(attribute)) {
      outdated.push({ label, attribute, expected: expected.get(attribute), actual });
    }
  }

  if (skipFlow) {
    console.log('Skipping the Maven-resolved versions.');
  }

  if (outdated.length === 0) {
    console.log('articles/_vaadin-version.adoc is in sync.');
    return;
  }

  for (const { label, attribute, expected: want, actual } of outdated) {
    const line = `  ${label}: expected ${want}, :${attribute}: has ${actual}`;
    if (fix) {
      console.log(line);
    } else {
      console.error(line);
    }
  }

  if (!fix) {
    console.error(
      '\narticles/_vaadin-version.adoc is out of date.' +
        '\nRun `npm run sync-versions -- --fix` and commit the result.'
    );
    process.exit(1);
  }

  for (const { attribute, expected: want } of outdated) {
    adoc = updateAdocAttribute(adoc, attribute, want);
  }
  writeFileSync(ADOC_PATH, adoc);
  console.log('\nUpdated articles/_vaadin-version.adoc.');
}

// Only run when invoked as a script, so that the tests can import the parsing.
if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  main();
}
