const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const ROOT = path.resolve(__dirname, '..');

module.exports = async function(config) {
  // Mark the repo to use sparsecheckout
  execSync('git config core.sparsecheckout true', { cwd: ROOT, stdio: 'inherit' });

  // Build the sparse-checkout file
  const sparseCheckoutFileContent = `
/*
!/articles/*/
/articles/ds
!/articles/_images
!/articles/index.asciidoc
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
    `DOCS_ARTICLES_PATH=articles/ds`,
    `DOCS_THEME_PATH=${relativeThemePath}`,
    `DOCS_TITLE=${config.dsName}`,
    'DOCS_IMPORT_EXAMPLE_RESOURCES=true',
    'DOCS_IMPORT_HEADER_IN_DEV=true',
  ];
  fs.writeFileSync(path.resolve(ROOT, 'dspublisher/.env'), envVariables.join('\n'));

  // Create a root index file under ds
  const dsIndexFileContent = fs
    .readFileSync(path.resolve(ROOT, 'articles/ds/overview.asciidoc'), 'utf-8')
    .replace('title: Overview', `title: ${config.dsName || 'Design System'}`);
  fs.writeFileSync(path.resolve(ROOT, 'articles/ds/index.asciidoc'), dsIndexFileContent);

  // Copy 404 page
  const notFoundFileContent = fs.readFileSync(path.resolve(ROOT, 'articles/404.asciidoc'));
  fs.writeFileSync(path.resolve(ROOT, 'articles/ds/404.asciidoc'), notFoundFileContent);

  // Create a custom docs theme
  const themePath = path.resolve(ROOT, relativeThemePath);
  if (!fs.existsSync(themePath)) {
    fs.mkdirSync(themePath);
  }
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
  execSync('git read-tree -m -u HEAD', { cwd: ROOT, stdio: 'inherit' });
};
