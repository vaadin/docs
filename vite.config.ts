import type { UserConfigFn } from 'vite';
import { overrideVaadinConfig } from './vite.generated';

const customConfig: UserConfigFn = (env) => ({
  // Here you can add custom Vite parameters
  // https://vitejs.dev/config/
  plugins: [
    {
      name: 'filter-out-external-deps',
      transform(code, id) {
        if (id.endsWith('frontend/generated/flow/generated-flow-webcomponent-imports.js')) {
          return code
            .split('\n')
            .filter((row) => {
              // Filter out all imports that are not exported web components.
              // Vaadin components and Flow resources such as connectors are already included in the
              // DSP bundle, so they don't need to be imported again here.
              if (!row.startsWith('import')) return false;
              if (row.includes('@vaadin')) return false;
              if (row.includes('generated/jar-resources')) return false;
              return true;
            })
            .join('\n');
        }
      },
    },
    {
      name: 'apply-docs-theme',
      transform(_code, id) {
        // This module is imported by web components exported from Flow to inject styles into their
        // shadow root. Instead of importing the docs styles from the Flow bundle again, for example
        // by adding @CssImport to DemoExporter, we provide a global from the docs
        // (example-resources.ts) that runs the same applyTheme function that is also used in the
        // docs to inject styles into Lit / React examples. This way the styles are only loaded
        // once, through the DSP bundle.
        if (id.endsWith('generated/css.generated.js')) {
          return 'export const applyCss = window.__applyTheme.applyTheme;';
        }
      },
    },
  ],
});

export default overrideVaadinConfig(customConfig);
