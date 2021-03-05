const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const inquirer = require('inquirer');

const ROOT = path.resolve(__dirname, '..');

const execShellCommand = cmd => {
  return new Promise((resolve, _) => {
    execSync(cmd, (_, stdout) => resolve(stdout));
  });
};

const questions = [
  {
    type: 'input',
    name: 'dsName',
    message: `Enter the full name of your design system (this will be used in the header of your documentation site)`
  },
  {
    type: 'input',
    name: 'dsTechnicalName',
    message: `Enter a short, technical name for your design system (this will be used for your folder and theme names)`,
    default: answers => answers.dsName.toLowerCase().replace(/\s/g, '-')
  },
  {
    type: 'confirm',
    name: 'disableLazyLoading',
    message: `Do you intend to provide Java-only UI samples?
If you answer yes, lazy-loading of example resources will be disabled so you don't need to separatly define JavaScript-resources for Java examples.
The downside is that somewhat larger JavaScript bundle will need to be downloaded initially.
You can revert this by setting the DOCS_IMPORT_EXAMPLE_RESOURCES environment variable to false.`,
    default: false
  },
  {
    type: 'confirm',
    name: 'createDesignSystemProject',
    message: `Do you want to create an empty design system project for your theme and custom components?`,
    default: true
  }
];

async function run() {
  if (globalThis.process.env.DOCS_INIT_UNDO) {
    execShellCommand('git sparse-checkout disable');
    execShellCommand('rm -f .git/info/sparse-checkout');
    execShellCommand('git read-tree -m -u HEAD');
    execShellCommand('git reset --hard HEAD');
    execShellCommand('git clean -f');
  } else if (fs.existsSync(path.resolve(ROOT, 'dspublisher/.env'))) {
    console.log(`Seems that you've already initialized a design system.
You can revert the previous init with "DOCS_INIT_UNDO=true npm run dspublisher:init"
Note that this will reset your Git working directory!`);
  } else {
    const config = await inquirer.prompt(questions);

    // Mark the repo to use sparsecheckout
    execShellCommand('git config core.sparsecheckout true');

    // Build the sparse-checkout file
    const sparseCheckoutFileContent = `
    /*
    !/articles/*/
    /articles/ds
    !/articles/_images
    !/articles/index.asciidoc
    !/articles/vaadin-version.asciidoc
    !/articles/ds/overview.asciidoc
    !/articles/404.asciidoc
    `
      .trim()
      .split('\n')
      .map(row => row.trim())
      .join('\n');
    fs.writeFileSync(
      path.resolve(ROOT, '.git/info/sparse-checkout'),
      sparseCheckoutFileContent,
      'utf-8'
    );

    // Create the env file for dspublisher
    const envVariables = [`DOCS_ARTICLES_PATH="articles/ds"`];
    if (config.disableLazyLoading) {
      envVariables.push('DOCS_IMPORT_EXAMPLE_RESOURCES="true"');
    }
    fs.writeFileSync(path.resolve(ROOT, 'dspublisher/.env'), envVariables.join('\n'));

    // Create a root index file under ds
    const dsIndexFileContent = fs
      .readFileSync(path.resolve('articles/ds/overview.asciidoc'), 'utf-8')
      .replace('title: Overview', `title: ${config.dsName || 'Design System'}`);
    fs.writeFileSync(path.resolve(ROOT, 'articles/ds/index.asciidoc'), dsIndexFileContent);

    // Copy 404 page
    const notFoundFileContent = fs.readFileSync(path.resolve('articles/404.asciidoc'));
    fs.writeFileSync(path.resolve(ROOT, 'articles/ds/404.asciidoc'), notFoundFileContent);

    // Update working directory
    execShellCommand('git read-tree -m -u HEAD');
  }
}

run();
