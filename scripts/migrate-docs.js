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
  const chartsPath = path.join(__dirname, '../articles/components/ui-components/charts');

  // Cleanup
  fs.rmdirSync(flowPath, { recursive: true });
  fs.rmdirSync(themesPath, { recursive: true });
  fs.rmdirSync(designerPath, { recursive: true });
  fs.rmdirSync(testbenchPath, { recursive: true });
  fs.rmdirSync(mprPath, { recursive: true });
  fs.rmdirSync(bakeryPath, { recursive: true });
  fs.rmdirSync(basPath, { recursive: true });
  fs.rmdirSync(chartsPath, { recursive: true });

  // Main index file
  // TODO the page should be rewritten entirely
  let index = fs.readFileSync(path.join(__dirname, CACHE_DIR, 'vaadin-docs/website/index.html'), 'utf8');
  index = index.replace('---', '---\nroot: true');
  // Remove redirect script
  index = index.replace(/<script\b[^>]*>([\s\S]*?)<\/script>/gm, '\n++++\n') + '\n++++';
  fs.writeFileSync(
    path.join(__dirname, '../articles/index.asciidoc'),
    index
  );

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
  // Rename Overview.asciidoc -> index.asciidoc
  let overviewPath = path.join(__dirname, CACHE_DIR, 'flow/documentation/Overview.asciidoc');
  index = fs.readFileSync(overviewPath, 'utf8');
  index = index.replace('---\ntitle: Overview', '---\ntitle: Framework');
  fs.writeFileSync(
    path.join(flowPath, 'index.asciidoc'),
    index
  );
  fs.remove(path.join(flowPath, 'Overview.asciidoc'));
  generateIndexes(sections.flow.subpages, 'flow');

  // TODO draft content should be in a different branch?
  fs.remove(path.join(flowPath, 'portlet-support'));


  // Themes and styling
  fs.mkdirSync(themesPath);
  fs.copySync(
    path.join(__dirname, CACHE_DIR, 'flow/documentation-themes'),
    themesPath,
    { filter }
  );
  // Rename overview.asciidoc -> index.asciidoc
  overviewPath = path.join(__dirname, CACHE_DIR, 'flow/documentation-themes/themes-and-styling-overview.asciidoc');
  index = fs.readFileSync(overviewPath, 'utf8');
  index = index.replace('---\ntitle: Overview\norder: 10', '---\ntitle: Themes and Styling\norder: 3');
  fs.writeFileSync(
    path.join(themesPath, 'index.asciidoc'),
    index
  );
  fs.remove(path.join(themesPath, 'themes-and-styling-overview.asciidoc'));
  generateIndexes(sections.themes.subpages, 'themes');


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
  // Rename overview.asciidoc -> index.asciidoc
  overviewPath = path.join(__dirname, CACHE_DIR, 'testbench/documentation/testbench-overview.asciidoc');
  index = fs.readFileSync(overviewPath, 'utf8');
  index = index.replace('---\ntitle: Overview\norder: 10', '---\ntitle: TestBench\norder: 5');
  fs.writeFileSync(
    path.join(testbenchPath, 'index.asciidoc'),
    index
  );
  fs.remove(path.join(testbenchPath, 'testbench-overview.asciidoc'));
  generateIndexes(sections.testbench.subpages, 'tools/testbench');


  // Bakery/full-stack starter
  fs.copySync(
    path.join(__dirname, CACHE_DIR, 'bakeryflow'),
    bakeryPath,
    { filter }
  );
  // Rename overview.asciidoc -> index.asciidoc
  overviewPath = path.join(__dirname, CACHE_DIR, 'bakeryflow/overview.asciidoc');
  index = fs.readFileSync(overviewPath, 'utf8');
  index = index.replace('---\ntitle: Overview\norder: 100', '---\ntitle: Full Stack App Starter\norder: 6');
  fs.writeFileSync(
    path.join(bakeryPath, 'index.asciidoc'),
    index
  );
  fs.remove(path.join(bakeryPath, 'overview.asciidoc'));
  generateIndexes(sections.bakeryflow.subpages, 'bakeryflow');


  // Business app starter
  fs.copySync(
    path.join(__dirname, CACHE_DIR, 'business-app'),
    basPath,
    { filter }
  );
  // Rename overview.asciidoc -> index.asciidoc
  overviewPath = path.join(__dirname, CACHE_DIR, 'business-app/overview.asciidoc');
  index = fs.readFileSync(overviewPath, 'utf8');
  index = index.replace('---\ntitle: Overview\norder: 1', '---\ntitle: Business App Starter\norder: 7');
  fs.writeFileSync(
    path.join(basPath, 'index.asciidoc'),
    index
  );
  fs.remove(path.join(basPath, 'overview.asciidoc'));
  generateIndexes(sections['business-app'].subpages, 'business-app');


  // MPR
  fs.copySync(
    path.join(__dirname, CACHE_DIR, 'mpr/mpr-documentation/documentation'),
    mprPath,
    { filter }
  );
  // Rename overview.asciidoc -> index.asciidoc
  overviewPath = path.join(__dirname, CACHE_DIR, 'mpr/mpr-documentation/documentation/Overview.asciidoc');
  index = fs.readFileSync(overviewPath, 'utf8');
  index = index.replace('---\ntitle: Overview\norder: 1', '---\ntitle: Multiplatform Runtime\norder: 8');
  fs.writeFileSync(
    path.join(mprPath, 'index.asciidoc'),
    index
  );
  fs.remove(path.join(mprPath, 'Overview.asciidoc'));
  generateIndexes(sections.mpr.subpages, 'mpr');


  // Charts
  fs.copySync(
    path.join(__dirname, CACHE_DIR, 'charts/documentation'),
    chartsPath,
    { filter }
  );
  // Rename overview.asciidoc -> index.asciidoc
  overviewPath = path.join(__dirname, CACHE_DIR, 'charts/documentation/charts-overview.asciidoc');
  index = fs.readFileSync(overviewPath, 'utf8');
  index = index.replace('---\ntitle: Overview\norder: 1', '---\ntitle: Charts');
  index = index.replace('= Overview', '= Charts');
  fs.writeFileSync(
    path.join(chartsPath, 'index.asciidoc'),
    index
  );
  fs.remove(path.join(chartsPath, 'charts-overview.asciidoc'));
  generateIndexes(sections.charts.subpages, 'components/ui-components/charts');
}

Promise.all(clones)
  .then(() => {
    migrateDocs();
  }).catch(e => {
    console.log(e);
    // migrateDocs();
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
