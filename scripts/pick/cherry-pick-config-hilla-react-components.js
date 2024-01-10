// Cherry-pick config for hilla react components
// Run with `node ./scripts/pick/cherry-pick.js -t hilla -c ./scripts/pick/cherry-pick-config-hilla-react-components.js`

const config = {
  source: {
    // paths in 'latest' to copy, they should be relative to the root folder
    // All their content are copied unless exceptions in the "ignore" section
    // they are copied in the same path unless exceptions in "rename" section
    copy: [
      // folders
      'articles',
      'src',
      'frontend',
      // files
    ],
    // paths in 'latest' to ignore (since they shouldn't be copied to 'hilla')
    ignore: [
      // Ignore Spreadsheet
      'articles/flow/components/spreadsheet',

      // Ignore Map
      'articles/flow/components/map',

      // Ignore basic layouts
      'articles/flow/components/basic-layouts',

      // Ignore Charts (for now)
      'articles/flow/components/charts',

      // Ignore flow-specific articles
      /articles\/components\/.*\/flow.asciidoc/,

      // Regex to ignore everything but "components" under articles
      /articles\/(?!components).*/,

      // Ignore all Java examples
      /src\/main\/java\/com\/vaadin\/demo\/component\/.*/,

      // Ignore all TypeScript examples (not react nor icons)
      /frontend\/demo\/component\/(?!icons)[a-z-]+\/(?!react).*/,

      'frontend/demo/component/spreadsheet',
      'frontend/demo/component/map',
      'frontend/demo/fusion',
      'frontend/demo/upgrade-tool',
      'frontend/demo/tools',
      'frontend/demo/flow',
      'frontend/demo/init.ts',
      'frontend/demo/init-flow-components.ts',
      'frontend/demo/foundation/material-tokens.ts',

      'src/main/java/com/vaadin/demo/ui',
      'src/main/java/com/vaadin/demo/flow',
      'src/main/java/com/vaadin/demo/sso',
      'src/main/java/com/vaadin/demo/collaboration',
      'src/main/java/com/vaadin/demo/observability',
      'src/main/java/com/vaadin/demo/DemoExporter.java',
      'src/main/resources/testsheets',
      'src/main/resources/META-INF/resources/icons/icon.png',
      'src/main/resources/application.properties',
    ],
  },
  rename: {
    // paths in 'latest' to copy to different paths in 'hilla'
    'articles/flow/components': 'articles/flow/react/components',
  },
  target: {
    // paths in 'hilla' to keep (since they shouldn't be removed, even if they don't exist in latest)
    keep: [
      'articles/flow/lit',
      'articles/flow/react',
      'articles/flow/404.asciidoc',
      'articles/flow/index.adoc',
      'articles/flow/_commercial-banner.asciidoc',
      'src/main/java/com/vaadin/demo/fusion',
      'src/main/java/com/vaadin/demo/DemoExporter.java',
      'src/main/resources/application.properties',
      'frontend/demo/fusion',
      'frontend/demo/component/auto-grid',
      'frontend/themes',
      'frontend/demo/init.ts',
    ],
  },
  // callbacks for changing the content of certain files
  callback: [
    {
      // Regex to match all asciidoc files under articles/flow/components
      path: /articles\/components\/.*\.[asciidoc|adoc]/,
      callback: (content) => {
        // replace all instances of "{articles}/components" with "{articles}/react/components"
        content = content.replace(/{articles}\/components/g, '{articles}/react/components');

        // replace all instances of "{articles}/styling/lumo" and "/styling/lumo" with "https://vaadin.com/docs/styling/lumo"
        content = content.replace(/{articles}\/styling\/lumo/g, 'https://vaadin.com/docs/styling/lumo');
        content = content.replace(/\/styling\/lumo/g, 'https://vaadin.com/docs/styling/lumo');

        // Remove discussion ids
        content = content.replace(/\[discussion-id\].*/g, '');

        // Remove page links (components/index and individual component pages)
        if (content.includes('page-links')) {
          const lines = content.split('\n');
          const start = lines.findIndex((line) => line.includes('page-links'));
          const end = lines.findIndex((line, index) => index > start && !line.startsWith('  - ')) - 1;
          content = lines
            .filter((_line, index) => index < start || index > end)
            .join('\n');
        }

        // Add :react: at the top of the file before the title ("= ").
        if (content.includes('ifdef::react[]')) {
          content = content.replace(/= .*/, ':react:\n\n$&');
        }

        // Add section-nav: flat components to components index
        if (content.includes('title: Components')) {
          content = content.replace('title: Components', 'title: Components\nsection-nav: flat components');
        }

        return content;
      },
    },
  ],
};

exports.config = config;
