/**
 * A helper function for removing lines from the given content.
 * The argument startIdentifier is string that identifies the start of the block to be removed
 * whereas endIdentifier identifies the end of the block to be removed.
 * StartOffset and endOffset are used to adjust the start and end of the block to be removed.
 */
function removeLines(content, startIdentifier, endIdentifier = startIdentifier, startOffset = 0, endOffset = 0) {
  while (content.includes(startIdentifier) && content.includes(endIdentifier)) {
    const lines = content.split('\n');
    const start = lines.findIndex((line) => line.includes(startIdentifier));
    const end = lines.findIndex((line, index) => index >= start && line.includes(endIdentifier));
    content = lines.filter((_line, index) => index < start + startOffset || index > end + endOffset).join('\n');
  }
  return content;
}

const config = {
  source: {
    // paths in 'latest' to copy, they should be relative to the root folder
    // All their content are copied unless exceptions in the "ignore" section
    // they are copied in the same path unless exceptions in "rename" section
    copy: [
      // folders
      'articles',
      'articles/react/components',
      'src',
      'frontend',
      // files
    ],
    // paths in 'latest' to ignore (since they shouldn't be copied to 'hilla')
    ignore: [
      // /(^|\/)\..+/, // hidden files

      /* Ignore temporarily until Vaadin version update */
      'articles/components/map',
      'articles/components/menubar',
      'articles/components/notification',
      'articles/components/sidenav',
      'articles/components/splitlayout',
      'articles/components/tabs',
      'articles/components/grid',
      'articles/components/button',
      'articles/components/applayout',
      'articles/components/datetimepicker',
      'articles/components/login',
      'articles/components/avatar',
      'articles/components/cookieconsent',

      'src/main/java/com/vaadin/demo/component/map',
      'src/main/java/com/vaadin/demo/component/menubar',
      'src/main/java/com/vaadin/demo/component/notification',
      'src/main/java/com/vaadin/demo/component/sidenav',
      'src/main/java/com/vaadin/demo/component/splitlayout',
      'src/main/java/com/vaadin/demo/component/tabs',
      'src/main/java/com/vaadin/demo/component/grid',
      'src/main/java/com/vaadin/demo/component/button',
      'src/main/java/com/vaadin/demo/component/applayout',
      'src/main/java/com/vaadin/demo/component/datetimepicker',
      'src/main/java/com/vaadin/demo/component/login',
      'src/main/java/com/vaadin/demo/component/avatar',
      'src/main/java/com/vaadin/demo/component/cookieconsent',

      'frontend/demo/component/datetimepicker',
      'frontend/demo/component/login',
      'frontend/demo/component/avatar',
      'frontend/demo/component/grid',
      'frontend/demo/component/cookieconsent',
      /* END Ignore */

      'articles/components/spreadsheet',
      'articles/guide',
      'articles/advanced',
      'articles/configuration',
      'articles/tutorial',
      'articles/tools',
      'articles/api.adoc',
      'articles/security',
      'articles/contributing',
      'articles/create-ui',
      'articles/binding-data',
      'articles/integrations',
      'articles/testing',
      'articles/styling',
      'articles/kb',

      'articles/index.asciidoc',
      'articles/compatibility.adoc',
      'articles/overview.asciidoc',
      'articles/contributing-docs',
      'articles/upgrading',
      'articles/application',
      'articles/routing',
      'articles/production',
      'articles/_images',
      'articles/_vaadin-version.adoc',
      'articles/_commercial-banner.asciidoc',
      'articles/_terminal.asciidoc',
      'articles/404.asciidoc',
      'articles/_figma-banner.adoc',

      'frontend/demo/component/spreadsheet',
      'frontend/demo/fusion',
      'frontend/demo/upgrade-tool',
      'frontend/demo/tools',
      'frontend/demo/flow',
      'frontend/demo/init.ts',
      'frontend/demo/init-flow-components.ts',

      'src/main/java/com/vaadin/demo/ui',
      'src/main/java/com/vaadin/demo/component/spreadsheet',

      'src/main/java/com/vaadin/demo/flow',
      'src/main/java/com/vaadin/demo/sso',
      'src/main/java/com/vaadin/demo/collaboration',
      'src/main/java/com/vaadin/demo/observability',
      'frontend/themes',
      'src/main/java/com/vaadin/demo/DemoExporter.java',
    ],
  },
  rename: {
    // paths in 'latest' to copy to different paths in 'hilla'
    'articles/components': 'articles/react/components',
  },
  target: {
    // paths in 'hilla' to keep (since they shouldn't be removed, even if they don't exist in latest)
    keep: [
      'articles/lit',
      'articles/react',
      'articles/404.asciidoc',
      'articles/index.adoc',
      'articles/_commercial-banner.asciidoc',
      'src/main/java/com/vaadin/demo/fusion',
      'src/main/java/com/vaadin/demo/DemoExporter.java',
      'frontend/demo/fusion',
      'frontend/themes',
      'frontend/demo/init.ts',
    ],
  },
  // callbacks for changing the content of certain files
  callback: [
    {
      // Regex to match all asciidoc files under articles/components
      path: /articles\/components\/.*\.asciidoc/,
      callback: (content) => {
        // replace all instances of "{articles}/components" with "{articles}/react/components"
        content = content.replace(/{articles}\/components/g, '{articles}/react/components');

        // Remove Spreadsheet from the components index page
        if (content.includes('=== Spreadsheet')) {
          content = removeLines(content, '=== Spreadsheet', '[.component-card', -1, -1);
        }

        // Remove the "Didn't Find What You Need?" section on the index page
        if (content.includes('== Didn\'t Find What You Need?') && content.includes('++++')) {
          content = removeLines(content, '== Didn\'t Find What You Need?', '++++', -1, -1);
        }

        // Remove all Flow-specific content
        content = removeLines(content, 'ifdef::flow[]', 'endif::');

        // Remove all Lit-specific content
        content = removeLines(content, 'ifdef::lit[]', 'endif::');

        return content;
      }
        
    },
  ],
};

exports.config = config;
