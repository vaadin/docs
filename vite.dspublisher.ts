import fs from 'fs';
import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';
import type { UserConfig } from 'vite';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const allFlowImportsPath = resolve(__dirname, 'frontend/generated/flow/generated-flow-imports.js');
const generatedPath = resolve(__dirname, 'vite.generated.ts');

// Read and modify vite.generated.ts to include __dirname if not present
const viteGenerated = fs.readFileSync(generatedPath, 'utf-8');
const dirnameConst = `import { fileURLToPath } from 'node:url';
     const __dirname = path.dirname(fileURLToPath(import.meta.url));`;
if (!viteGenerated.includes('const __dirname')) {
  fs.writeFileSync(generatedPath, `${dirnameConst}\n${viteGenerated}`);
}

const { vaadinConfig } = await import('./vite.generated');

const vaadin = vaadinConfig({
  mode: process.env.NODE_ENV ?? 'development',
  command: 'build',
}) as UserConfig;

// Get the theme plugin from vaadinConfig
const themePlugin = vaadin.plugins?.find((plugin: any) => plugin.name === 'vaadin:theme');

const config: UserConfig = {
  resolve: {
    alias: {
      ...vaadin.resolve?.alias,
      'all-flow-imports-or-empty':
        process.env.DOCS_IMPORT_EXAMPLE_RESOURCES === 'true' ? allFlowImportsPath : 'lit',
      // Workaround https://github.com/preactjs/signals/issues/414
      '@vaadin/hilla-react-signals': '@preact/signals-react',
    },
  },
  server: {
    /* dev-mode proxy config */
    proxy: {
      '/vaadin': {
        target: 'http://localhost:8080',
      },
      '/connect': {
        target: 'http://localhost:8080',
      },
    },
  },
  plugins: [themePlugin],
};

export default config;
