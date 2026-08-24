#!/usr/bin/env node

/*
 * Finds "new in version X" style content that has been carried over from an
 * older major version of the documentation.
 *
 * When a docs branch is forked for a new major version, `since` badges and
 * "New in Vaadin 24.1" style notes come along with it. They were useful in the
 * branch they were written for, but in a newer major they only tell readers
 * that a feature is older than the version they're reading about.
 *
 * The check reports two kinds of leftovers in articles/:
 *
 *   badge  - a `since:<artifact>@<version>` version badge older than the
 *            current major version
 *   prose  - a sentence that dates a feature to an older major version, e.g.
 *            "New in Vaadin 24.1" or "Starting from Vaadin 24.4, ..."
 *
 * Pages whose subject is an older version -- upgrade guides, MPR and
 * Modernization Toolkit, and the contributing guide's badge syntax examples --
 * are exempt. This mirrors the `Vaadin.Versions` Vale rule, which is disabled
 * for upgrading pages in .vale.ini.
 *
 * A single reference that is deliberately historical, such as a compatibility
 * matrix, can be kept by putting `// stale-version-ok` on the line above it.
 */

import { readFileSync } from 'node:fs';
import { globSync } from 'node:fs';
import { dirname, join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const PROJECT_DIR = join(__dirname, '..');
const ARTICLES_DIR = join(PROJECT_DIR, 'articles');
const POM_PATH = join(PROJECT_DIR, 'pom.xml');

// Historical version references are the point of these pages.
const EXEMPT_PATHS = [
  /(^|\/)upgrading(\/|\.adoc$)/,
  /^tools\/mpr\//,
  /^tools\/modernization-toolkit\//,
  /^contributing\//,
];

// Hilla was merged into the Vaadin platform in Vaadin 24, so every Hilla
// version badge predates the current major.
const HILLA_LAST_MAJOR_AS_SEPARATE_PRODUCT = 2;

const IGNORE_MARKER = 'stale-version-ok';

function currentMajor() {
  const pom = readFileSync(POM_PATH, 'utf-8');
  const match = /<vaadin\.version>(\d+)\./.exec(pom);
  if (!match) {
    throw new Error(`Could not read <vaadin.version> from ${POM_PATH}`);
  }
  return Number(match[1]);
}

// Version badges: [role="since:com.vaadin:vaadin@V24.5"], [since:dev.hilla:hilla@v2.4]#...#
const BADGE_REGEX = /since:([\w.]+):([\w-]+)@[vV](\d+)(?:\.\d+)*/g;

// A version number, optionally qualified: "Vaadin 24.1", "V24.6", "version 24.4", "24.7"
const VERSION = String.raw`(?:Vaadin|Hilla|Flow|Vaadin Flow)?\s*(?:versions?\s*)?[vV]?(\d{1,2})(?:\.\d+)*`;

// Phrasings that date a feature to a particular version.
const PROSE_REGEXES = [
  new RegExp(String.raw`\bnew in\s+${VERSION}`, 'gi'),
  new RegExp(
    String.raw`\b(?:added|introduced?|available|supported|deprecated|removed|changed)\s+(?:in|since|as of|from|starting (?:in|with|from))\s+${VERSION}`,
    'gi'
  ),
  new RegExp(String.raw`\b(?:since|as of)\s+${VERSION}`, 'gi'),
  new RegExp(String.raw`\bstarting (?:in|with|from)\s+${VERSION}`, 'gi'),
  new RegExp(String.raw`\b(?:before|prior to|up to and including)\s+${VERSION}`, 'gi'),
];

function isExempt(articlePath) {
  return EXEMPT_PATHS.some((pattern) => pattern.test(articlePath));
}

// AsciiDoc entities and non-breaking spaces would otherwise break the phrase
// patterns, e.g. "Since&nbsp;V24.6".
function normalize(line) {
  return line.replace(/&nbsp;|&#160;|\u00a0/gu, ' ');
}

function findBadges(line, major) {
  const findings = [];
  for (const match of line.matchAll(BADGE_REGEX)) {
    const [text, groupId, artifactId, versionMajor] = match;
    const isHilla = groupId === 'dev.hilla';
    const stale = isHilla
      ? Number(versionMajor) <= HILLA_LAST_MAJOR_AS_SEPARATE_PRODUCT
      : Number(versionMajor) < major;
    if (stale) {
      findings.push({
        type: 'badge',
        text,
        note: isHilla ? `${artifactId} versions predate the merge into Vaadin` : undefined,
      });
    }
  }
  return findings;
}

function findProse(line, major) {
  // Bare version numbers -- "since 1.29.6" about nginx -- are only a Vaadin
  // reference if the sentence they sit in is about Vaadin.
  const aboutVaadin = /\b(?:vaadin|hilla|flow)\b/i.test(line);
  const matches = [];
  for (const regex of PROSE_REGEXES) {
    for (const match of line.matchAll(regex)) {
      const [text, versionMajor] = match;
      const qualified = /\b(?:vaadin|hilla|flow)\b|[vV]\d/.test(text) || aboutVaadin;
      if (qualified && Number(versionMajor) < major) {
        matches.push({ start: match.index, end: match.index + text.length, text: text.trim() });
      }
    }
  }
  // The phrase patterns overlap -- "available since V21" also matches "since
  // V21" -- so report only the longest match for a given piece of text.
  return matches
    .filter(
      (match) =>
        !matches.some(
          (other) =>
            other !== match &&
            other.start <= match.start &&
            other.end >= match.end &&
            other.end - other.start > match.end - match.start
        )
    )
    .map((match) => ({ type: 'prose', text: match.text }));
}

function scanFile(absolutePath, major) {
  const articlePath = relative(ARTICLES_DIR, absolutePath);
  const findings = [];
  const lines = readFileSync(absolutePath, 'utf-8').split('\n');
  lines.forEach((rawLine, index) => {
    const line = normalize(rawLine);
    if (line.includes(IGNORE_MARKER) || lines[index - 1]?.includes(IGNORE_MARKER)) {
      return;
    }
    for (const finding of [...findBadges(line, major), ...findProse(line, major)]) {
      findings.push({ ...finding, file: articlePath, line: index + 1 });
    }
  });
  return findings;
}

function main() {
  const major = currentMajor();
  console.log(`Checking articles/ for version references older than Vaadin ${major}...`);

  const files = globSync('**/*.{adoc,asciidoc}', { cwd: ARTICLES_DIR })
    .filter((articlePath) => !isExempt(articlePath))
    .sort();

  const findings = files.flatMap((articlePath) => scanFile(join(ARTICLES_DIR, articlePath), major));

  if (findings.length === 0) {
    console.log('\nNo stale version references found.');
    return;
  }

  const badges = findings.filter((finding) => finding.type === 'badge');
  const prose = findings.filter((finding) => finding.type === 'prose');

  console.error(`\nStale version references (${findings.length}):`);
  let currentFile = null;
  for (const finding of findings) {
    if (finding.file !== currentFile) {
      currentFile = finding.file;
      console.error(`\n  articles/${currentFile}`);
    }
    const note = finding.note ? ` -- ${finding.note}` : '';
    console.error(`    ${finding.line}: [${finding.type}] ${finding.text}${note}`);
  }
  console.error(`\n  ${badges.length} badge(s), ${prose.length} prose reference(s)`);
  console.error(
    '\nRemove the reference, or move the page under an exempt path if it is about an older version.'
  );
  process.exit(1);
}

main();
