const GITHUB_TOKEN = process.argv[process.argv.length - 1];
const CACHE_DIR = './.cache';

// Repo name, branch and local directory name
const repos = [
  ['vaadin-docs', 'vaadin17'],
  ['designer-internal', 'master', 'designer'],
  ['vaadin-charts-flow', 'master', 'charts'],
  ['testbench', 'master'],
  ['bakery-app-starter-flow-docs', 'master', 'bakeryflow'],
  ['flow-and-components-documentation', 'master', 'flow'],
  ['multiplatform-runtime-internal', 'master', 'mpr'],
  ['business-app-starter-flow-docs', 'master', 'business-app']
];


const fs   = require('fs-extra');
const path = require('path');
const yaml = require('js-yaml');
const NodeGit = require('nodegit');
const replace = require('replace-in-file');

// Array for Promises
const clones = [];

repos.forEach(repo => {
  const [repoName, branch, localDir] = repo;
  const url = `https://github.com/vaadin/${repoName}.git`;
  const localPath = path.join(__dirname, CACHE_DIR, localDir || repoName);
  const opts = {
    checkoutBranch: branch,
    fetchOpts: {
      callbacks: {
        certificateCheck: function() { return 0; },
        credentials: function(args) {
          return NodeGit.Cred.userpassPlaintextNew(GITHUB_TOKEN, 'x-oauth-basic');
        }
      }
    }
  };

  console.info(`Cloning ${repoName} (${branch}) into ${localPath}`);

  const clonePromise = new Promise((resolve, reject) => {
    const clone = NodeGit.Clone(url, localPath, opts);
    clone.catch((e) => {
      // Most probably already cloned
      // return NodeGit.Repository.open(localPath);
      resolve();
    }).then(() => {
      // console.info(`Finished cloning ${repoName} (${branch})`);
      resolve();
    });
  });

  clones.push(clonePromise);
});


// Bulk of the work, moving folders around and adding metadata
function migrateDocs() {
  console.log('All clones finished');
  console.log('Migrating content...');

  // Parse the documentation hierarchy metadata
  const docsYml = fs.readFileSync(path.join(__dirname, CACHE_DIR, 'vaadin-docs/website/_data/docs.yml'), 'utf8');
  const sections = yaml.load(docsYml, {
    onWarning: function(w) {
      console.warn(w);
    },
    json: true
  });

  const flowPath = path.join(__dirname, '../articles/flow');
  const themesPath = path.join(__dirname, '../articles/themes');
  const designerPath = path.join(__dirname, '../articles/designer');
  const testbenchPath = path.join(__dirname, '../articles/testbench');
  const mprPath = path.join(__dirname, '../articles/mpr');
  const bakeryPath = path.join(__dirname, '../articles/bakeryflow');
  const basPath = path.join(__dirname, '../articles/business-app');
  const chartsPath = path.join(__dirname, '../articles/design-system/components/charts');

  // Cleanup
  fs.rmdirSync(flowPath, { recursive: true });
  fs.rmdirSync(themesPath, { recursive: true });
  fs.rmdirSync(designerPath, { recursive: true });
  fs.rmdirSync(testbenchPath, { recursive: true });
  fs.rmdirSync(mprPath, { recursive: true });
  fs.rmdirSync(bakeryPath, { recursive: true });
  fs.rmdirSync(basPath, { recursive: true });
  fs.rmdirSync(chartsPath, { recursive: true });

  // Helper function for all copy operations
  function filter(src, dest) {
    if (src.indexOf('.git') > -1 || src.indexOf('.') === 0) {
      return false;
    }
    return true;
  }

  // Flow/framework
  fs.mkdirSync(flowPath);
  fs.copySync(
    path.join(__dirname, CACHE_DIR, 'flow/documentation'),
    flowPath,
    { filter }
  );
  overviewToIndex(path.join(flowPath, 'Overview.asciidoc'), 'Framework', 1);
  generateIndexes(sections.flow.subpages, 'flow');

  // TODO draft content should be in a different branch (portlet support is not yet available)?
  fs.remove(path.join(flowPath, 'portlet-support'));


  // Themes and styling
  fs.mkdirSync(themesPath);
  fs.copySync(
    path.join(__dirname, CACHE_DIR, 'flow/documentation-themes'),
    themesPath,
    { filter }
  );
  overviewToIndex(path.join(themesPath, 'themes-and-styling-overview.asciidoc'), 'Themes and Styling', 3);
  overviewToIndex(path.join(themesPath, 'lumo/lumo-overview.asciidoc'), 'Lumo');
  overviewToIndex(path.join(themesPath, 'material/material-overview.asciidoc'), 'Material');

  // Designer
  fs.copySync(
    path.join(__dirname, CACHE_DIR, 'designer/designer-documentation'),
    designerPath,
    { filter }
  );
  fs.writeFileSync(path.join(designerPath, 'index.asciidoc'), generateAsciidoc('Designer', 4, '= Designer'));
  generateIndexes(sections.designer.subpages, 'designer');


  // TestBench
  fs.copySync(
    path.join(__dirname, CACHE_DIR, 'testbench/documentation'),
    testbenchPath,
    { filter }
  );
  overviewToIndex(path.join(testbenchPath, 'testbench-overview.asciidoc'), 'TestBench', 5);
  generateIndexes(sections.testbench.subpages, 'tools/testbench');


  // Bakery/full-stack starter
  fs.copySync(
    path.join(__dirname, CACHE_DIR, 'bakeryflow'),
    bakeryPath,
    { filter }
  );
  overviewToIndex(path.join(bakeryPath, 'overview.asciidoc'), 'Full Stack App Starter', 6);
  generateIndexes(sections.bakeryflow.subpages, 'bakeryflow');


  // Business app starter
  fs.copySync(
    path.join(__dirname, CACHE_DIR, 'business-app'),
    basPath,
    { filter }
  );
  overviewToIndex(path.join(basPath, 'overview.asciidoc'), 'Business App Starter', 7);
  generateIndexes(sections['business-app'].subpages, 'business-app');


  // MPR
  fs.copySync(
    path.join(__dirname, CACHE_DIR, 'mpr/mpr-documentation/documentation'),
    mprPath,
    { filter }
  );
  overviewToIndex(path.join(mprPath, 'Overview.asciidoc'), 'Multiplatform Runtime', 8);
  generateIndexes(sections.mpr.subpages, 'mpr');


  // Charts
  fs.copySync(
    path.join(__dirname, CACHE_DIR, 'charts/documentation'),
    chartsPath,
    { filter }
  );
  overviewToIndex(path.join(chartsPath, 'charts-overview.asciidoc'), 'Charts');
  generateIndexes(sections.charts.subpages, 'design-system/components/charts');

  // Remove unnecessary github config lines, which cause the TOC element to be rendered before the page heading
  const replaceOptions = {
    files: [
      path.join(__dirname, '../articles/**/*.asciidoc')
    ],
    from: /ifdef::env\-github\[:outfilesuffix: \.asciidoc\]\n/g,
    to: '',
  };

  try {
    let changedFiles = replace.sync(replaceOptions);
  }
  catch (error) {
    console.error('Error occurred:', error);
  }

  console.log('Migration finished successfully');
}

Promise.all(clones)
  .then(() => {
    migrateDocs();
  }).catch(e => {
    console.error(e);
  });


// Helper function for generating index.asciidoc for all sub-folders in a top section
function generateIndexes(subpages, folder) {
  if (!subpages) return;
  Object.keys(subpages).forEach((section, i) => {
    if (fs.existsSync(path.join(__dirname, `../articles/${folder}/${section}`))) {
      const title = subpages[section].title;
      fs.writeFileSync(path.join(__dirname, `../articles/${folder}/${section}/index.asciidoc`), generateAsciidoc(title, i + 2));
    }
  });
}

// Helper function for generating a snippet of asciidoc
function generateAsciidoc(title, order, content) {
  return `---
title: ${title}${order !== undefined ? `\norder: ${order}` : ''}
---
${content !== undefined ? `\n${content}` : ''}
`;
}

// Helper to rename and rewrite overview pages to index pages
function overviewToIndex(overviewPath, title, order) {
  let content = fs.readFileSync(overviewPath, 'utf8')
    .replace(/^title: Overview/m, 'title: ' + title)
    .replace(/^= Overview/m, '= ' + title)
    .replace(/^order: [0-9]+\n/m, order !== undefined ? `order: ${order}\n` : '');

  fs.writeFileSync(
    path.join(overviewPath, '../index.asciidoc'),
    content
  );

  fs.remove(overviewPath);
}
