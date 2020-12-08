const GITHUB_TOKEN = process.argv[process.argv.length - 1];
const CACHE_DIR = './.cache';

// Repo name, branch and local directory name
const repos = [
  ['vaadin-docs', 'vaadin14'],
  ['designer-internal', 'master', 'designer'],
  ['vaadin-charts-flow', '7.1', 'charts'],
  ['testbench', 'master'],
  ['bakery-app-starter-flow-docs', 'v14', 'bakeryflow'],
  ['flow-and-components-documentation', 'V14.3', 'flow'],
  ['multiplatform-runtime-internal', 'master', 'mpr'],
  ['business-app-starter-flow-docs', 'master', 'business-app'],
  ['collaboration-engine-internal', '2.0', 'ce']
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
  const themesPath = path.join(__dirname, '../articles/themes');
  const designerPath = path.join(__dirname, '../articles/designer');
  const testbenchPath = path.join(__dirname, '../articles/testbench');
  const mprPath = path.join(__dirname, '../articles/mpr');
  const bakeryPath = path.join(__dirname, '../articles/bakeryflow');
  const basPath = path.join(__dirname, '../articles/business-app');
  const chartsPath = path.join(__dirname, '../articles/charts');
  const cePath = path.join(__dirname, '../articles/ce');

  // Cleanup
  fs.rmdirSync(flowPath, { recursive: true });
  fs.rmdirSync(themesPath, { recursive: true });
  fs.rmdirSync(designerPath, { recursive: true });
  fs.rmdirSync(testbenchPath, { recursive: true });
  fs.rmdirSync(mprPath, { recursive: true });
  fs.rmdirSync(bakeryPath, { recursive: true });
  fs.rmdirSync(basPath, { recursive: true });
  fs.rmdirSync(chartsPath, { recursive: true });
  fs.rmdirSync(cePath, { recursive: true });

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
    title: 'Framework',
    order: 10,
    icon: '../_images/flow.svg'
  });
  generateIndexes(sections.flow.subpages, 'flow');
  generateExternalLinks(sections.flow.external, 'flow');

  // TODO draft content should be in a different branch (portlet support is not yet available)?
  fs.remove(path.join(flowPath, 'portlet-support'));


  // Themes and styling
  fs.mkdirSync(themesPath);
  fs.copySync(
    path.join(__dirname, CACHE_DIR, 'flow/documentation-themes'),
    themesPath,
    { filter }
  );
  generateTopLevelIndex({
    folderPath: themesPath,
    title: 'Theming and Styling',
    order: 30,
    icon: '../_images/themes.svg'
  });
  generateIndexes(sections.themes.subpages, 'themes', 110);
  generateExternalLinks(sections.themes.external, 'themes');

  // Designer
  fs.copySync(
    path.join(__dirname, CACHE_DIR, 'designer/designer-documentation'),
    designerPath,
    { filter }
  );
  generateTopLevelIndex({
    folderPath: designerPath,
    title: 'Designer',
    order: 40,
    icon: '../_images/designer.svg'
  });
  generateIndexes(sections.designer.subpages, 'designer');
  generateExternalLinks(sections.designer.external, 'designer');


  // Collaboration Engine
  fs.copySync(
    path.join(__dirname, CACHE_DIR, 'ce/collaboration-engine-documentation'),
    cePath,
    { filter }
  );
  generateTopLevelIndex({
    folderPath: cePath,
    title: 'Collaboration Engine',
    order: 50,
    icon: '../_images/ce.svg'
  });
  generateIndexes(sections.designer.subpages, 'ce');
  generateExternalLinks(sections.designer.external, 'ce');


  // Charts
  fs.copySync(
    path.join(__dirname, CACHE_DIR, 'charts/documentation'),
    chartsPath,
    { filter }
  );
  generateTopLevelIndex({
    folderPath: chartsPath,
    title: 'Charts',
    order: 60,
    icon: '../_images/charts.svg'
  });
  // overviewToIndex(path.join(chartsPath, 'charts-overview.asciidoc'), 'Charts');
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
    order: 70,
    icon: '../_images/testbenchicon.svg'
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
    order: 80,
    icon: '../_images/bakery-starter.svg'
  });
  generateIndexes(sections.bakeryflow.subpages, 'bakeryflow');
  generateExternalLinks(sections.bakeryflow.external, 'bakeryflow');


  // Business app starter
  fs.copySync(
    path.join(__dirname, CACHE_DIR, 'business-app'),
    basPath,
    { filter }
  );
  generateTopLevelIndex({
    folderPath: basPath,
    title: 'Business App Starter',
    order: 90,
    icon: '../_images/business-starter.svg'
  });
  generateIndexes(sections['business-app'].subpages, 'business-app');
  generateExternalLinks(sections['business-app'].external, 'business-app');


  // MPR
  fs.copySync(
    path.join(__dirname, CACHE_DIR, 'mpr/mpr-documentation/documentation'),
    mprPath,
    { filter }
  );
  generateTopLevelIndex({
    folderPath: mprPath,
    title: 'Multiplatform Runtime',
    order: 100,
    icon: '../_images/mpr.svg'
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
