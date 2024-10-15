import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';
import MagicString from 'magic-string';
import type { UserConfig } from 'vite';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const allFlowImportsPath = resolve(__dirname, 'frontend/generated/flow/generated-flow-imports.js');
const frontendFolder = resolve(__dirname, 'frontend');
const jarResourcesFolder = resolve(__dirname, 'frontend/generated/jar-resources');
const themeFolder = resolve(__dirname, 'frontend/themes/docs');

const config: UserConfig = {
  resolve: {
    alias: {
      'all-flow-imports-or-empty':
        process.env.DOCS_IMPORT_EXAMPLE_RESOURCES === 'true' ? allFlowImportsPath : 'lit',
      Frontend: frontendFolder,
      '@vaadin/flow-frontend': jarResourcesFolder,
      'themes/docs': themeFolder,
    },
  },
  server: {
    /* dev-mode proxy config */
    proxy: {
      '/vaadin': {
        target: 'http://localhost:8080',
      },
    },
  },
  plugins: [
    {
      name: 'vite-plugin-rewrite-polymer-global',
      transform(code, id) {
        // Workaround esbuild issue with chunked code running in wrong order,
        // which causes errors with Polymer legacy components e.g. <iron-icon>.
        // See https://github.com/vitejs/vite/issues/5142
        if (
          id.includes('.js') &&
          code.includes('JSCompiler_renameProperty')
        ) {
          const ms = new MagicString(code);
          ms.replaceAll(/JSCompiler_renameProperty\(([^,]+),[^)]+\)/g, '$1');

          return {
            code: ms.toString(),
            map: ms.generateMap({
              file: id,
              includeContent: true,
            }),
          };
        }
      },
    },
  ],
};

export default config;
