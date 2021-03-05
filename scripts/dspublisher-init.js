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
  }
  // {
  //   type: 'confirm',
  //   name: 'createDesignSystemProject',
  //   message: `Do you want to create an empty design system project for your theme and custom components?`,
  //   default: true
  // }
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
!/dspublisher/theme
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

    const relativeThemePath = `dspublisher/docs-theme`;

    // Create the env file for dspublisher
    const envVariables = [
      `DOCS_ARTICLES_PATH="articles/ds"`,
      `DOCS_THEME_PATH="${relativeThemePath}"`
    ];
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

    // Create a custom docs theme
    const themePath = path.resolve(ROOT, relativeThemePath);
    fs.mkdirSync(themePath);
    fs.writeFileSync(path.resolve(themePath, 'init.js'), '');
    fs.writeFileSync(path.resolve(themePath, 'header.ts'), '');
    fs.writeFileSync(
      path.resolve(themePath, 'global.css'),
      `
header h3 a {
  display: flex;
  align-items: center;
  font-size: 25px;
}

header h3 a::before {
  display: inline-block;
  content: "";
  height: 50px;
  width: 50px;
  background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAIAAACRXR/mAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYwIDYxLjEzNDc3NywgMjAxMC8wMi8xMi0xNzozMjowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNSBNYWNpbnRvc2giIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6RDUxRjY0ODgyQTkxMTFFMjk0RkU5NjI5MEVDQTI2QzUiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6RDUxRjY0ODkyQTkxMTFFMjk0RkU5NjI5MEVDQTI2QzUiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpENTFGNjQ4NjJBOTExMUUyOTRGRTk2MjkwRUNBMjZDNSIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpENTFGNjQ4NzJBOTExMUUyOTRGRTk2MjkwRUNBMjZDNSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PuT868wAAABESURBVHja7M4xEQAwDAOxuPw5uwi6ZeigB/CntJ2lkmytznwZFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYW1qsrwABYuwNkimqm3gAAAABJRU5ErkJggg==");
  margin-right: 20px;
}
    `.trim()
    );

    // Update working directory
    execShellCommand('git read-tree -m -u HEAD');
  }
}

run();
