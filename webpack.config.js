const fs = require('fs');
const path = require('path');
const merge = require('webpack-merge');
const flowDefaults = require('./webpack.generated.js');

const fileNameOfTheFlowGeneratedMainEntryPoint = require('path').resolve(
  __dirname,
  'target/frontend/generated-flow-imports.js'
);
const filteredFileNameOfTheFlowGeneratedMainEntryPoint =
  fileNameOfTheFlowGeneratedMainEntryPoint + '-filtered.js';

// @ts-ignore
module.exports = merge(flowDefaults, {
  entry: {
    export: filteredFileNameOfTheFlowGeneratedMainEntryPoint
  },
  module: {
    rules: [
      {
        test: /(\\|\/).*example-resources\.ts$/,
        exclude: path.resolve(__dirname, 'frontend', 'example-resources.ts'),
      },
    ],
  },
  externals: {
    // docs-app has its own bundle with all the Vaadin resources.
    // Polymer etc dependencies have purposefully been excluded from the
    // docs project (Vaadin) bundle. However, the embedded Flow examples
    // (like target/frontend/accordion-basic-wc.ts)
    // now import "applyTheme" which has an indirect dependency to Polymer
    // so we need to direct the applyTheme function to use the version
    // bundled with docs-app. Otherwise we'd end up with conflicting imports
    // (Vaadin/Polymer) originating from two separate bundles loaded on the same page.
    // We'll do this by declaring generated/theme as an external,
    // which gets registered to the global namespace by docs-app bundle
    // (in frontend/demo/example-resources.ts).
    'generated/theme': '__applyTheme'
  },
  plugins: [
    function(compiler) {
      compiler.hooks.afterPlugins.tap(
        'Filter out external deps',
        compilation => {
          const original = fs.readFileSync(
            fileNameOfTheFlowGeneratedMainEntryPoint,
            'utf8'
          );

          // Exclude component imports which are included in the "bundle" module
          const filtered = original
            .split('\n')
            .filter(row => {
              if (row.startsWith("import '@vaadin")) return false;
              if (row.startsWith("import '@polymer")) return false;
              if (!row.startsWith('import')) return false;
              return true;
            })
            .join('\n');

          fs.writeFileSync(
            filteredFileNameOfTheFlowGeneratedMainEntryPoint,
            filtered
          );
        }
      );
    }
  ]
});
