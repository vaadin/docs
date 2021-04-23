const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const ROOT = path.resolve(__dirname, '..');
const TEMPLATES = path.resolve(__dirname, 'dspublisher-init-templates');
const RELATIVE_THEME_PATH = `dspublisher/docs-theme`;

function copyTemplate(templateName, targetPath, replacements = {}) {
  const content = fs.readFileSync(path.resolve(TEMPLATES, templateName), 'utf-8');

  const newContent = Object.keys(replacements).reduce((c, key) => {
    return c.split(`{{${key}}}`).join(replacements[key]);
  }, content);

  fs.writeFileSync(targetPath, newContent);
}

function appendFrontMatter(articlePath, frontMatter) {
  const tokens = fs.readFileSync(articlePath, 'utf-8').split('---');
  tokens[1] = tokens[1] + frontMatter;
  fs.writeFileSync(articlePath, tokens.join('---'));
}

module.exports = async function (config) {
  // Mark the repo to use sparsecheckout
  execSync('git config core.sparsecheckout true', { cwd: ROOT, stdio: 'inherit' });

  // sparse-checkout file
  copyTemplate('dsp-sparse-checkout', path.resolve(ROOT, '.git/info/sparse-checkout'));

  // .env file for dspublisher
  copyTemplate('dsp-env', path.resolve(ROOT, 'dspublisher/.env'), {
    title: config.dsName,
    themePath: RELATIVE_THEME_PATH,
  });

  // Root index file under ds
  copyTemplate('dsp-index.asciidoc', path.resolve(ROOT, 'articles/ds/index.asciidoc'), {
    title: config.dsName || 'Design System',
  });

  // 404 page
  copyTemplate('dsp-404.asciidoc', path.resolve(ROOT, 'articles/ds/404.asciidoc'));

  // custom docs theme
  const absoluteThemePath = path.resolve(ROOT, RELATIVE_THEME_PATH);
  if (!fs.existsSync(absoluteThemePath)) {
    fs.mkdirSync(absoluteThemePath);
  }
  fs.writeFileSync(path.resolve(absoluteThemePath, 'init.js'), '');
  fs.writeFileSync(path.resolve(absoluteThemePath, 'header.ts'), '');
  copyTemplate('dsp-global.css', path.resolve(absoluteThemePath, 'global.css'));

  // CVDL license file
  copyTemplate('dsp-license-cvdl', path.resolve(ROOT, 'LICENSE'));

  // Readme
  copyTemplate('dsp-readme.md', path.resolve(ROOT, 'README.md'), {
    title: config.dsName || 'Design System',
  });

  // Have components / foundation expanded by default
  appendFrontMatter(
    path.resolve(ROOT, 'articles/ds/components/index.asciidoc'),
    'section-nav: expanded\n'
  );
  appendFrontMatter(
    path.resolve(ROOT, 'articles/ds/foundation/index.asciidoc'),
    'section-nav: expanded\n'
  );

  // Update working directory
  execSync('git read-tree -m -u HEAD', { cwd: ROOT, stdio: 'inherit' });
};
