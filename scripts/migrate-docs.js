const GITHUB_TOKEN = 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx';
const CACHE_DIR = './.cache';

// Repo name, branch and local directory name
const repos = [
  ['vaadin-docs', 'vaadin15'],
  ['designer-internal', 'master', 'designer'],
  ['vaadin-charts-flow', 'master', 'charts'],
  ['testbench', 'master'],
  ['bakery-app-starter-flow-docs', 'master', 'bakeryflow'],
  ['flow-and-components-documentation', 'ccdm', 'flow'],
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
  const clone = NodeGit.Clone(url, localPath, opts);
  clone.catch(() => {
    // Most probably already cloned
    return NodeGit.Repository.open(localPath);
  }).then(() => {
    // console.info(`Finished cloning ${repoName} (${branch})`);
  });
  clones.push(clone);
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

  // Cleanup
  const guideFolder = 'flow';
  const guidePath = path.join(__dirname, '../articles', guideFolder);
  const toolsPath = path.join(__dirname, '../articles/tools');

  fs.rmdirSync(guidePath, { recursive: true });
  fs.rmdirSync(toolsPath, { recursive: true });
  fs.rmdirSync(path.join(__dirname, '../articles/components/ui-components/charts'), { recursive: true });

  // Main index file
  // TODO this should be rewritten more thoroughly because it's missing a lot of styling
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
    if ( src.indexOf('/src') > -1
      || src.indexOf('pom.xml') > -1
      || src.indexOf('.git') > -1
    ) {
      return false;
    }
    return true;
  }

  // Guides
  // flow-and-components-documentation
  fs.mkdirSync(guidePath);
  fs.copySync(
    path.join(__dirname, CACHE_DIR, 'flow/documentation'),
    guidePath,
    { filter }
  );
  // Rename Overview.asciidoc -> index.asciidoc
  const overviewPath = path.join(__dirname, CACHE_DIR, 'flow/documentation/Overview.asciidoc');
  index = fs.readFileSync(overviewPath, 'utf8');
  index = index.replace('---\ntitle: Overview', '---\ntitle: Framework');
  fs.writeFileSync(
    path.join(guidePath, 'index.asciidoc'),
    index
  );
  fs.remove(path.join(guidePath, 'Overview.asciidoc'));
  generateIndexes(sections.flow.subpages, guideFolder);

  // TODO workflow should be added to the menu
  fs.remove(path.join(__dirname, `../articles/${guideFolder}/workflow`));

  // TODO draft content should be in a different branch?
  fs.remove(path.join(__dirname, `../articles/${guideFolder}/portlet-support`));


  // Tools
  fs.mkdirSync(toolsPath);
  fs.writeFileSync(path.join(toolsPath, 'index.asciidoc'), generateAsciidoc('Tools', 3));


  // designer goes under tools
  fs.copySync(
    path.join(__dirname, CACHE_DIR, 'designer/designer-documentation'),
    path.join(toolsPath, 'designer'),
    { filter }
  );
  fs.writeFileSync(path.join(toolsPath, 'designer/index.asciidoc'), generateAsciidoc('Designer', 1));
  generateIndexes(sections.designer.subpages, 'tools/designer');


  // testbench goes under tools
  fs.copySync(
    path.join(__dirname, CACHE_DIR, 'testbench/documentation'),
    path.join(toolsPath, 'testbench'),
    { filter }
  );
  fs.writeFileSync(path.join(toolsPath, 'testbench/index.asciidoc'), generateAsciidoc('TestBench', 2));
  generateIndexes(sections.testbench.subpages, 'tools/testbench');


  // mpr goes under tools
  fs.copySync(
    path.join(__dirname, CACHE_DIR, 'mpr/mpr-documentation/documentation'),
    path.join(toolsPath, 'mpr'),
    { filter }
  );
  fs.writeFileSync(path.join(toolsPath, 'mpr/index.asciidoc'), generateAsciidoc('Multiplatform Runtime', 3));
  generateIndexes(sections.mpr.subpages, 'tools/mpr');


  // business-app goes under tools
  fs.copySync(
    path.join(__dirname, CACHE_DIR, 'business-app'),
    path.join(toolsPath, 'business-app'),
    { filter }
  );
  fs.writeFileSync(path.join(toolsPath, 'business-app/index.asciidoc'), generateAsciidoc('Business App Starter', 4));
  generateIndexes(sections['business-app'].subpages, 'tools/business-app');


  // bakeryflow goes under tools
  fs.copySync(
    path.join(__dirname, CACHE_DIR, 'bakeryflow'),
    path.join(toolsPath, 'bakeryflow'),
    { filter }
  );
  fs.writeFileSync(path.join(toolsPath, 'bakeryflow/index.asciidoc'), generateAsciidoc('Full Stack App Starter', 4));
  generateIndexes(sections.bakeryflow.subpages, 'tools/bakeryflow');


  // charts goes to components
  fs.copySync(
    path.join(__dirname, CACHE_DIR, 'charts/documentation'),
    path.join(__dirname, '../articles/components/ui-components/charts'),
    { filter }
  );
  fs.writeFileSync(path.join(__dirname, '../articles/components/ui-components/charts/index.asciidoc'), generateAsciidoc('Charts', 5));
  generateIndexes(sections.charts.subpages, 'components/ui-components/charts');
}

Promise.all(clones).then(migrateDocs).catch(migrateDocs);


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
function generateAsciidoc(title, order) {
  return `---
title: ${title}
order: ${order}
---

`;
}
