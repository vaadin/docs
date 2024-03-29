const { execSync } = require('child_process');
const path = require('path');
const NodeGit = require('nodegit');
const fs   = require('fs-extra');

if (!process.env.GITHUB_TOKEN) {
  console.error('GITHUB_TOKEN not provided as an environment property');
  return 1;
}

const url = 'https://github.com/vaadin/docs-app.git';
const localPath = path.join(__dirname, 'docs-app');
const opts = {
  checkoutBranch: 'master',
  fetchOpts: {
    callbacks: {
      certificateCheck: function() { return 0; },
      credentials: function(args) {
        return NodeGit.Cred.userpassPlaintextNew(process.env.GITHUB_TOKEN, 'x-oauth-basic');
      }
    }
  }
};

// Cleanup
fs.rmdirSync(localPath, { recursive: true });

console.info('Cloning docs-app...');

const clonePromise = new Promise((resolve, reject) => {
  const clone = NodeGit.Clone(url, localPath, opts);
  clone.catch((e) => {
    reject(e);
  }).then(() => {
    resolve();
  });
});

clonePromise.then(() => {
  console.log('Installing docs-app dependencies...');
  execSync('npm ci --only=production', { cwd: './docs-app', stdio: 'inherit' });

  console.log('Prepare content...');
  execSync('./scripts/mvnw -B --no-transfer-progress compile vaadin:prepare-frontend vaadin:build-frontend', { cwd: '../', stdio: 'inherit' });

  console.log('Run lint...');
  execSync('npm run lint', { cwd: '../', stdio: 'inherit' });

  console.log('Building documentation site...');
  execSync('DOCS_CONTENT_ROOT=../../ npx --unhandled-rejections=strict gatsby build --prefix-paths', { cwd: './docs-app', stdio: 'inherit' });
}).catch(() => {
  process.exit(1);
});
