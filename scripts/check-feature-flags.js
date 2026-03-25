#!/usr/bin/env node

import { execSync } from 'node:child_process';
import { mkdtempSync, readFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const REPOS = [
  { name: 'flow', url: 'https://github.com/vaadin/flow.git', artifact: 'com.vaadin:flow-server' },
  {
    name: 'flow-components',
    url: 'https://github.com/vaadin/flow-components.git',
    artifact: 'com.vaadin:vaadin-flow-components-base',
  },
];

// Feature flags to exclude from both undocumented and stale checks
const EXCLUDED_FLAGS = new Set(['copilotExperimentalFeatures']);

const SPI_SERVICE = 'META-INF/services/com.vaadin.experimental.FeatureFlagProvider';

const __dirname = dirname(fileURLToPath(import.meta.url));
const PROJECT_DIR = join(__dirname, '..');
const ARTICLE_PATH = join(
  __dirname,
  '..',
  'articles',
  'flow',
  'configuration',
  'feature-flags.adoc'
);

function resolveVersions() {
  console.log('Resolving dependency versions...');
  const tree = execSync('mvn dependency:tree -DoutputType=text', {
    encoding: 'utf-8',
    cwd: PROJECT_DIR,
    stdio: ['pipe', 'pipe', 'pipe'],
  });
  const versions = {};
  for (const repo of REPOS) {
    const match = new RegExp(
      `${repo.artifact.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}:jar:([^:]+):`
    ).exec(tree);
    if (!match) {
      throw new Error(`Could not resolve version for ${repo.artifact} from Maven dependency tree`);
    }
    // eslint-disable-next-line @typescript-eslint/prefer-destructuring
    versions[repo.name] = match[1];
    console.log(`  ${repo.artifact} -> ${match[1]}`);
  }
  return versions;
}

function cloneRepo(url, tag, dest) {
  try {
    execSync(`git clone --bare --single-branch --branch ${tag} --depth 1 ${url} ${dest}`, {
      stdio: 'pipe',
    });
  } catch (e) {
    throw new Error(`Failed to clone ${url} (tag: ${tag}): ${e.stderr?.toString().trim()}`);
  }
}

function gitShow(repoPath, path) {
  try {
    return execSync(`git --git-dir=${repoPath} show HEAD:${path}`, {
      encoding: 'utf-8',
      stdio: ['pipe', 'pipe', 'pipe'],
    });
  } catch (_e) {
    return null;
  }
}

const treeCache = new Map();

function gitFindFiles(repoPath, pathSuffix) {
  if (!treeCache.has(repoPath)) {
    try {
      const tree = execSync(`git --git-dir=${repoPath} ls-tree -r --name-only HEAD`, {
        encoding: 'utf-8',
        stdio: ['pipe', 'pipe', 'pipe'],
      })
        .split('\n')
        .filter(Boolean);
      treeCache.set(repoPath, tree);
    } catch {
      treeCache.set(repoPath, []);
    }
  }
  return treeCache.get(repoPath).filter((l) => l.endsWith(pathSuffix));
}

// Find all SPI service files and return the provider class names listed in them
function findProviderClasses(repoPath) {
  const spiFiles = gitFindFiles(repoPath, SPI_SERVICE);
  const classes = [];
  for (const spiFile of spiFiles) {
    // Skip test resources
    if (spiFile.includes('src/test/')) continue;
    const content = gitShow(repoPath, spiFile);
    if (!content) continue;
    for (const line of content.split('\n')) {
      const trimmed = line.trim();
      if (trimmed && !trimmed.startsWith('#')) {
        classes.push(trimmed);
      }
    }
  }
  return classes;
}

// Convert a FQCN to a source file path suffix, e.g.
// com.vaadin.experimental.CoreFeatureFlagProvider -> com/vaadin/experimental/CoreFeatureFlagProvider.java
function fqcnToPathSuffix(fqcn) {
  return `${fqcn.replace(/\./g, '/')}.java`;
}

// Find the full path for a Java class in the repo tree
function resolveClassPath(repoPath, fqcn) {
  const suffix = fqcnToPathSuffix(fqcn);
  const matches = gitFindFiles(repoPath, suffix);
  // Prefer src/main/java over test sources
  return matches.find((m) => m.includes('src/main/java')) ?? matches[0];
}

// Extract feature flag IDs from a provider's Java source
function extractFeatureIds(source) {
  // Strip inline comments to avoid interference with parsing
  const cleaned = source.replace(/\/\/.*$/gm, '');
  // Build a map of string constants (e.g. FEATURE_FLAG_ID = "aiComponents")
  const constantsMap = {};
  const constRegex = /static\s+final\s+String\s+(\w+)\s*=\s*"([^"]+)"/g;
  let m;
  while ((m = constRegex.exec(cleaned)) !== null) {
    // eslint-disable-next-line @typescript-eslint/prefer-destructuring
    constantsMap[m[1]] = m[2];
  }

  // Find all new Feature(...) calls and extract the second argument (the ID)
  // Collapse whitespace so multi-line constructors become single-line
  const collapsed = cleaned.replace(/\s+/g, ' ');
  const featureRegex = /new\s+Feature\(\s*"[^"]*"\s*,\s*(?:"([^"]+)"|(\w+))\s*,/g;
  const ids = [];
  while ((m = featureRegex.exec(collapsed)) !== null) {
    if (m[1]) {
      ids.push(m[1]);
    } else if (m[2] && constantsMap[m[2]]) {
      ids.push(constantsMap[m[2]]);
    } else if (m[2]) {
      console.warn(`  Warning: unresolved constant "${m[2]}"`);
    }
  }
  return ids;
}

function extractRepoFeatureFlags(repoPath, repoName) {
  const providerClasses = findProviderClasses(repoPath);
  if (providerClasses.length === 0) {
    console.warn(`  Warning: no SPI service files found in ${repoName}`);
    return [];
  }

  const allIds = [];
  for (const fqcn of providerClasses) {
    const filePath = resolveClassPath(repoPath, fqcn);
    if (!filePath) {
      console.warn(`  Warning: could not find source for ${fqcn}`);
      continue;
    }
    const source = gitShow(repoPath, filePath);
    if (!source) {
      console.warn(`  Warning: could not read ${filePath}`);
      continue;
    }
    const ids = extractFeatureIds(source);
    for (const id of ids) {
      console.log(`    ${fqcn} -> ${id}`);
    }
    allIds.push(...ids);
  }
  return allIds;
}

function parseArticleFlags(adoc) {
  const ids = new Set();
  const regex = /^`([^`]+)`::$/gm;
  let match;
  while ((match = regex.exec(adoc)) !== null) {
    ids.add(match[1]);
  }
  return ids;
}

function readArticle() {
  return readFileSync(ARTICLE_PATH, 'utf-8');
}

function main() {
  const tmpDir = mkdtempSync(join(tmpdir(), 'vaadin-feature-flags-'));
  const cleanup = () => {
    try {
      rmSync(tmpDir, { recursive: true, force: true });
    } catch {}
  };
  process.on('exit', cleanup);
  process.on('SIGINT', () => {
    cleanup();
    process.exit(2);
  });

  // Resolve versions from Maven dependency tree
  const versions = resolveVersions();

  // Clone repos and extract feature flags
  console.log('Cloning repos...');
  const allRepoFlags = [];
  for (const repo of REPOS) {
    const tag = versions[repo.name];
    const dest = join(tmpDir, `${repo.name}.git`);
    cloneRepo(repo.url, tag, dest);
    console.log(`  ${repo.name} (${tag}):`);
    const flags = extractRepoFeatureFlags(dest, repo.name);
    console.log(`  ${repo.name}: found ${flags.length} feature flag(s)`);
    allRepoFlags.push(...flags);
  }

  if (allRepoFlags.length === 0) {
    console.warn('Warning: No feature flags found in repos. This may indicate a parsing issue.');
  }

  // Read and parse article
  console.log(`Reading article from ${ARTICLE_PATH}...`);
  const adoc = readArticle();
  const articleFlags = parseArticleFlags(adoc);
  for (const id of EXCLUDED_FLAGS) {
    articleFlags.delete(id);
  }
  console.log(`  article: found ${articleFlags.size} feature flag(s)`);

  // Compare
  const repoFlagSet = new Set(allRepoFlags);
  const undocumented = allRepoFlags.filter((id) => !articleFlags.has(id));
  const stale = [...articleFlags].filter((id) => !repoFlagSet.has(id));
  let failed = false;

  if (undocumented.length > 0) {
    console.error(`\nUndocumented feature flags (${undocumented.length}):`);
    for (const id of undocumented) {
      console.error(`  - ${id}`);
    }
    failed = true;
  }

  if (stale.length > 0) {
    console.error(`\nStale feature flags in article (${stale.length}):`);
    for (const id of stale) {
      console.error(`  - ${id}`);
    }
    failed = true;
  }

  if (failed) {
    process.exit(1);
  }

  console.log('\nAll feature flags are in sync.');
}

main();
