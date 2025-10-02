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
              // Exclude web components, which are already in the docs bundle
              if (row.includes('@vaadin')) return false;
              // Include theme utils so that @CssImport works on DemoExporter
              if (row.includes('Frontend/generated/jar-resources/theme-util.js')) return true;
              // Exclude imports from JARs like connectors, which are already in the docs bundle
              if (row.includes('Frontend/generated/jar-resources')) return false;
              // Keep other statements such as injecting styles into exported web components
              return true;
            })
            .join('\n');
        }
      },
    },
  ],
});

export default overrideVaadinConfig(customConfig);
