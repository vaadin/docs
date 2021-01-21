const { execSync } = require('child_process');

const execShellCommand = cmd => {
  console.log(cmd);
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

  // Create the env files for docbuilder TODO: Enable once docbuilder is available
  const envFileContent = `DOCS_ARTICLES_PATH="articles/ds"`;
  execShellCommand(`echo '${envFileContent}' > docbuilder/build/.env`);
  execShellCommand(`echo '${envFileContent}' > docbuilder/develop/.env`);

  // Create a root index file under ds
  const dsIndexFileContent = `
---
title: Design System
order: 40
layout: index
---
= Design System
  `.trim();
  execShellCommand(`echo '${dsIndexFileContent}' > articles/ds/index.asciidoc`);

} else {
  execShellCommand('git sparse-checkout disable');
  execShellCommand('rm -f .git/info/sparse-checkout');
  execShellCommand('git read-tree -m -u HEAD');
}
