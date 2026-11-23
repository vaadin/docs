import { readFileSync } from 'fs';
import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';
import { normalizePath, type UserConfig } from 'vite';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const dspConfig = JSON.parse(
  readFileSync(resolve(__dirname, 'dspublisher/config/default.json'), 'utf-8')
);
const docsPort = dspConfig.docsPort;

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
// The file extension is needed, because packages such as
// @vaadin/hilla-react-i18n import the alias from JavaScript files
const reactSignals = resolve(__dirname, 'frontend', 'demo', 'services', 'react-signals.ts');

const pdfViewerWorker = normalizePath(
  resolve(__dirname, 'node_modules', '@vaadin', 'pdf-viewer', 'src', 'pdf-viewer-worker.js')
);

// Use newer target to support top-level await in Hilla dependencies
const target = ['safari15', 'es2022'];

const config: UserConfig = {
  define: {
    // True only for preview deployments, which set DOCS_PREVIEW_DIFF=true when
    // building. Lets preview-only behaviour — the diff overlay in
    // dspublisher/theme/preview-diff.ts, and suppressing the cookie dialog in
    // dspublisher/theme/init-browser.ts — detect a preview without relying on
    // the hostname.
    __DOCS_PREVIEW_DIFF__: JSON.stringify(process.env.DOCS_PREVIEW_DIFF === 'true'),
  },
  plugins: [
    {
      // PDF Viewer creates its worker with `new URL('./pdf-viewer-worker.js', import.meta.url)`.
      // In the dev server, pre-bundling moves the viewer into .vite/deps, where the worker file
      // is missing. Resolve the worker to the file in the package instead.
      name: 'pdf-viewer-worker',
      apply: 'serve',
      configureServer(server) {
        server.middlewares.use((req, _res, next) => {
          const match = /\/\.vite\/deps\/pdf-viewer-worker\.js(\?.*)?$/u.exec(req.url ?? '');
          if (match) {
            req.url = `/@fs/${pdfViewerWorker.replace(/^\//u, '')}${match[1] ?? ''}`;
          }
          next();
        });
      },
    },
  ],
  resolve: {
    alias: {
      'Frontend/generated/endpoints': endpointMocks,
      ...vaadin.resolve?.alias,
      'all-flow-imports-or-empty':
        process.env.DOCS_IMPORT_EXAMPLE_RESOURCES === 'true' ? allFlowImportsPath : 'lit',
      // Workaround https://github.com/preactjs/signals/issues/414
      '@vaadin/hilla-react-signals': reactSignals,
    },
  },
  server: {
    /* dev-mode proxy config */
    proxy: {
      '/vaadin': {
        target: `http://localhost:${docsPort}`,
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
};

export default config;
