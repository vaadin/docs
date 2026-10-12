/* eslint-disable no-undef */
// vite.generated.ts imports Vite plugins that the Vaadin dev server installs into target/.
// DSP only waits for frontend/generated, which can exist before the plugins do, or survive
// a `mvn clean`. Wait until every target/ import exists before DSP loads the Vite config.
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const projectRootPath = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const viteGeneratedPath = path.resolve(projectRootPath, 'vite.generated.ts');

function isReady() {
  if (!fs.existsSync(viteGeneratedPath)) {
    return false;
  }
  const source = fs.readFileSync(viteGeneratedPath, 'utf-8');
  return [...source.matchAll(/from '\.\/(target\/[^']+)'/g)].every(([, importPath]) =>
    fs.existsSync(path.resolve(projectRootPath, importPath))
  );
}

while (!isReady()) {
  await new Promise((resolve) => setTimeout(resolve, 1000));
}
