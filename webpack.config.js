const fs = require('fs');
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
