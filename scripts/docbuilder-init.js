const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const execShellCommand = cmd => {
  return new Promise((resolve, _) => {
    execSync(cmd, (_, stdout) => resolve(stdout));
  });
};

if (!globalThis.process.env.DOCS_INIT_UNDO) {
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
  `.trim();
  execShellCommand(`echo '${sparseCheckoutFileContent}' > .git/info/sparse-checkout`);

  // Update working directory
  execShellCommand('git read-tree -m -u HEAD');

  // Create the env files for docbuilder
  const envFileContent = `DOCS_ARTICLES_PATH="articles/ds"`;
  execShellCommand(`echo '${envFileContent}' > docbuilder/build/.env`);
  execShellCommand(`echo '${envFileContent}' > docbuilder/develop/.env`);

  // Create a root index file under ds
  const dsIndexFileContent = fs
    .readFileSync(path.resolve('articles/ds/overview.asciidoc'), 'utf-8')
    .replace('title: Overview', 'title: Design System');

  execShellCommand(`echo '${dsIndexFileContent}' > articles/ds/index.asciidoc`);
  execShellCommand(`rm articles/ds/overview.asciidoc`);

  // Replace cross references with links in _shared.asciidoc
  let dsFoundationSharedFileContent = fs.readFileSync(
    path.resolve('articles/ds/foundation/_shared.asciidoc'),
    'utf-8'
  );
  const crRegex = /<<{articles}\/theming\/(.*),(.*)>>/g;
  const matches = dsFoundationSharedFileContent.matchAll(crRegex);

  for (const match of matches) {
    dsFoundationSharedFileContent = dsFoundationSharedFileContent.replace(
      match[0],
      `link:http://vaadin.com/docs-beta/latest/theming/${match[1]}[${match[2]}]`
    );
  }
  execShellCommand(
    `echo '${dsFoundationSharedFileContent}' > articles/ds/foundation/_shared.asciidoc`
  );
} else {
  execShellCommand('git sparse-checkout disable');
  execShellCommand('rm -f .git/info/sparse-checkout');
  execShellCommand('git read-tree -m -u HEAD');
}
