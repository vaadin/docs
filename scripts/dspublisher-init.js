import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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

export default async function (config) {
  // The config file for dspublisher
  updateTemplate(path.resolve(ROOT, 'dspublisher/config/default.json'), {
    title: config.dsName || 'Design System',
  });

  // Root index file under ds
  updateTemplate(path.resolve(ROOT, 'articles/index.adoc'), {
    title: config.dsName || 'Design System',
  });

  // Readme
  updateTemplate(path.resolve(ROOT, 'README.md'), {
    title: config.dsName || 'Design System',
  });

  // Have components / lumo expanded by default
  appendFrontMatter(
    path.resolve(ROOT, 'articles/components/index.adoc'),
    'section-nav: expanded\n',
  );
  appendFrontMatter(path.resolve(ROOT, 'articles/lumo/index.adoc'), 'section-nav: expanded\n');
}
