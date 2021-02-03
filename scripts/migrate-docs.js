const GITHUB_TOKEN = process.argv[process.argv.length - 1];
const CACHE_DIR = './.cache';

// Repo name, branch and local directory name
const repos = [
  ['vaadin-docs', 'vaadin10'],
  ['designer-internal', 'v10-maintenance', 'designer'],
  ['vaadin-charts-flow', '6.0', 'charts'],
  ['testbench', 'master'],
  ['bakery-app-starter-flow-docs', 'v10', 'bakeryflow'],
  ['flow-and-components-documentation', 'V10', 'flow'],
  ['multiplatform-runtime-internal', '1.1', 'mpr']
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

  delete sections.elements;

  const flowPath = path.join(__dirname, '../articles/flow');
  const designerPath = path.join(__dirname, '../articles/designer');
  const testbenchPath = path.join(__dirname, '../articles/testbench');
  const mprPath = path.join(__dirname, '../articles/mpr');
  const bakeryPath = path.join(__dirname, '../articles/bakeryflow');
  const chartsPath = path.join(__dirname, '../articles/charts');

  // Cleanup
  fs.rmdirSync(flowPath, { recursive: true });
  fs.rmdirSync(designerPath, { recursive: true });
  fs.rmdirSync(testbenchPath, { recursive: true });
  fs.rmdirSync(mprPath, { recursive: true });
  fs.rmdirSync(bakeryPath, { recursive: true });
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
  generateTopLevelIndex({
    folderPath: flowPath,
    title: 'Flow',
    order: 1,
  });
  generateIndexes(sections.flow.subpages, 'flow');
  generateExternalLinks(sections.flow.external, 'flow');

  // TODO draft content should be in a different branch (portlet support is not yet available)?
  fs.remove(path.join(flowPath, 'portlet-support'));

  // Designer
  fs.copySync(
    path.join(__dirname, CACHE_DIR, 'designer/designer-documentation'),
    designerPath,
    { filter }
  );
  generateTopLevelIndex({
    folderPath: designerPath,
    title: 'Designer',
    order: 4,
  });
  generateIndexes(sections.designer.subpages, 'designer');
  generateExternalLinks(sections.designer.external, 'designer');



  // Charts
  fs.copySync(
    path.join(__dirname, CACHE_DIR, 'charts/documentation'),
    chartsPath,
    { filter }
  );
  // overviewToIndex(path.join(chartsPath, 'charts-overview.asciidoc'), 'Charts');
  generateTopLevelIndex({
    folderPath: chartsPath,
    title: 'Charts',
    order: 5,
  });
  generateIndexes(sections.charts.subpages, 'charts');
  generateExternalLinks(sections.charts.external, 'charts');



  // TestBench
  fs.copySync(
    path.join(__dirname, CACHE_DIR, 'testbench/documentation'),
    testbenchPath,
    { filter }
  );
  generateTopLevelIndex({
    folderPath: testbenchPath,
    title: 'TestBench',
    order: 6,
  });
  generateIndexes(sections.testbench.subpages, 'testbench');
  generateExternalLinks(sections.testbench.external, 'testbench');


  // Bakery/full-stack starter
  fs.copySync(
    path.join(__dirname, CACHE_DIR, 'bakeryflow'),
    bakeryPath,
    { filter }
  );
  generateTopLevelIndex({
    folderPath: bakeryPath,
    title: 'Bakery App Starter',
    order: 7,
  });
  generateIndexes(sections.bakeryflow.subpages, 'bakeryflow');
  generateExternalLinks(sections.bakeryflow.external, 'bakeryflow');


  // MPR
  fs.copySync(
    path.join(__dirname, CACHE_DIR, 'mpr/mpr-documentation/documentation'),
    mprPath,
    { filter }
  );
  generateTopLevelIndex({
    folderPath: mprPath,
    title: 'Multiplatform Runtime',
    order: 8,
  });
  generateIndexes(sections.mpr.subpages, 'mpr');
  generateExternalLinks(sections.mpr.external, 'mpr');


  try {
    // Remove unnecessary github config lines, which cause the TOC element to be rendered before the page heading
    let replaceOptions = {
      files: [
        path.join(__dirname, '../articles/**/*.asciidoc')
      ],
      from: /ifdef::env\-github\[:outfilesuffix: \.asciidoc\]\n/g,
      to: '',
    };
    let changedFiles = replace.sync(replaceOptions);

    // Remove custom TOC elements from themes and styling docs
    replaceOptions = {
      files: [
        path.join(__dirname, '../articles/themes/**/*.asciidoc')
      ],
      from: /^:?toc(::\[\]|: macro|-title:|levels:).*\n/gm,
      to: '',
    };
    changedFiles = replace.sync(replaceOptions);
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
function generateIndexes(subpages, folder, orderBase = 2) {
  if (!subpages) return;
  Object.keys(subpages).forEach((section, i) => {
    if (fs.existsSync(path.join(__dirname, `../articles/${folder}/${section}`))) {
      const title = subpages[section].title;
      fs.writeFileSync(path.join(__dirname, `../articles/${folder}/${section}/index.asciidoc`), generateAsciidoc(title, orderBase + i));
    }
  });
}

// Helper function for generating a snippet of asciidoc
function generateAsciidoc(title, order, icon, content) {
  return `---
title: ${title}${order !== undefined ? `\norder: ${order}` : ''}${icon !== undefined ? `\nicon: image:${icon}[opts=inline]` : ''}
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

function generateTopLevelIndex(props) {
  const {folderPath, title, order, content, icon} = props;
  let adocContent = generateAsciidoc(title, order, icon, content);

  fs.writeFileSync(
    path.join(folderPath, 'index.asciidoc'),
    adocContent
  );
}

function generateExternalLinks(externals, folder) {
  if (externals) {
    Object.keys(externals).forEach((extName, i) => {
      const external = externals[extName];
      fs.writeFileSync(
        path.join(__dirname, `../articles/${folder}/${extName}-external.asciidoc`),
`---
title: ${external.title}
order: ${1000 + i}
url: ${external.url}
---`);
    });
  }
}
