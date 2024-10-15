import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';
import MagicString from 'magic-string';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const allFlowImportsPath = resolve(__dirname, 'frontend/generated/flow/generated-flow-imports.js');
const frontendFolder = resolve(__dirname, 'frontend');
const themeFolder = resolve(__dirname, 'frontend/themes/docs');
const generatedDocsThemePath = resolve(__dirname, 'frontend/generated/theme-docs.generated.js');
const applyThemePath = resolve(__dirname, 'frontend/generated/theme.js');

const config = {
  resolve: {
    alias: {
      'all-flow-imports-or-empty':
        process.env.DOCS_IMPORT_EXAMPLE_RESOURCES === 'true' ? allFlowImportsPath : applyThemePath,
      Frontend: frontendFolder,
      'Frontend/generated/theme': applyThemePath,
      'generated/theme-docs.generated.js': generatedDocsThemePath,
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
      name: 'vite-plugin-rewrite-component-css',
      transform(code, id) {
        if (id.includes('theme-docs.generated.js')) {
          // Default and named imports from CSS files are removed since Vite 5.
          // Rewrite the theme file content to use the ?inline query instead.
          return code.replace(/[.]css/g, '.css?inline');
        }
      },
    },
    {
      name: 'vite-plugin-rewrite-polymer-global',
      transform(code, id) {
        // Workaround esbuild issue with chunked code running in wrong order,
        // which causes errors with Polymer legacy components e.g. <iron-icon>.
        // See https://github.com/vitejs/vite/issues/5142
        if (id.includes('.js') && code.includes('JSCompiler_renameProperty')) {
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
