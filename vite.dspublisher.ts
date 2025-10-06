import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';
import MagicString from 'magic-string';
import type { UserConfig } from 'vite';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const allFlowImportsPath = resolve(__dirname, 'frontend/generated/flow/generated-flow-imports.js');

// vite.generated.ts accesses __dirname without declaring it.
// Workaround the error by setting it on the global object.
globalThis.__dirname = __dirname;
const { vaadinConfig } = await import('./vite.generated');

const vaadin = vaadinConfig({
  mode: process.env.NODE_ENV ?? 'development',
  command: 'build',
}) as UserConfig;

const endpointMocks = resolve(__dirname, 'frontend', 'demo', 'services', 'mocks.js');

// Use newer target to support top-level await in Hilla dependencies
const target = ['safari15', 'es2022'];

const config: UserConfig = {
  resolve: {
    alias: {
      'Frontend/generated/endpoints': endpointMocks,
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
    },
  },
  build: {
    target,
  },
  optimizeDeps: {
    esbuildOptions: {
      target,
    },
  },
  plugins: [
    {
      name: 'vite-plugin-rewrite-polymer-global',
      transform(code, id) {
        // Workaround esbuild issue with chunked code running in wrong order
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
