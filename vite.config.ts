import type { UserConfigFn } from 'vite';
import { overrideVaadinConfig } from './vite.generated';

const customConfig: UserConfigFn = (env) => ({
  // Here you can add custom Vite parameters
  // https://vitejs.dev/config/
  plugins: [
    {
      name: 'filter-out-external-deps',
      transform(code, id) {
        if (id.endsWith('target/frontend/generated-flow-imports.js')) {
          return code
            .split('\n')
            .filter((row) => {
              if (!row.startsWith('import')) return false;
              if (row.includes('@vaadin')) return false;
              if (row.includes('@polymer')) return false;
              if (row.includes('generated/jar-resources')) return false;
              return true;
            })
            .join('\n');
        }
      },
    },
    {
      name: 'apply-theme-fallback',
      transform(_code, id) {
        if (id.endsWith('generated/theme.js')) {
          return 'export const applyTheme = window.__applyTheme.applyTheme;';
        }
      },
    },
  ],
});

export default overrideVaadinConfig(customConfig);
