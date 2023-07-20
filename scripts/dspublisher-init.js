const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');

function updateTemplate(targetPath, replacements = {}) {
  const content = fs.readFileSync(targetPath, 'utf-8');

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
  // The config file for dspublisher
  updateTemplate(path.resolve(ROOT, 'dspublisher/config/default.json'), {
    title: config.dsName || 'Design System',
  });

  // Root index file under ds
  updateTemplate(path.resolve(ROOT, 'articles/ds/index.asciidoc'), {
    title: config.dsName || 'Design System',
  });

  // Readme
  updateTemplate(path.resolve(ROOT, 'README.md'), {
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
};
