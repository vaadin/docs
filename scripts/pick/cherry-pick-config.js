
const config = {
  source: {
    // paths in 'latest' to copy, they should be relative to the root folder
    // All their content are copied unless exceptions in the "ignore" section
    // they are copied in the same path unless exceptions in "rename" section
    "copy": [
      // folders
      "articles",
      "src",
      "dspublisher",
      "frontend",
      // files
      "pom.xml",
      ".eslintrc.js",
      ".gitignore",
      ".npmrc",
      ".prettierrc",
      "tsconfig.json",
      "types.d.ts",
      "webpack.config.js",
      "webpack.dspublisher.js",
      "package.json"
    ],
    // paths in 'latest' to ignore (since they shouldn't be copied to dsp)
    "ignore": [
      /(^|\/)\..+/, // hidden files

      "articles/guide",
      "articles/kb",
      "articles/advanced",
      "articles/configuration",
      "articles/tutorial",
      "articles/tools",
      "articles/api.adoc",
      "articles/security",
      "articles/contributing",
      "articles/create-ui",
      "articles/binding-data",
      "articles/integrations",
      "articles/testing",

      "articles/index.asciidoc",
      "articles/overview.asciidoc",
      "articles/contributing-docs",
      "articles/upgrading",
      "articles/application",
      "articles/routing",
      "articles/production",
      "articles/_images",
      "articles/_vaadin-version.adoc",
      "articles/_commercial-banner.asciidoc",
      "articles/_terminal.asciidoc",
      "articles/404.asciidoc",
      "articles/_figma-banner.adoc",

      "articles/styling/_images",
      "articles/styling/_shared.adoc",
      "articles/styling/advanced",
      "articles/styling/custom-theme",
      "articles/styling/getting-started.adoc",
      "articles/styling/index.adoc",
      "articles/styling/theme-annotation.adoc",
      "articles/styling/_images/",
      "articles/styling/lumo/_images",
      "articles/styling/lumo/index.adoc",
      "articles/styling/lumo/variants",
      "articles/styling/lumo/design-tokens/styling-using-design-tokens.adoc",
      "articles/styling/lumo/design-tokens/_images",
      "articles/styling/lumo/design-tokens/index.adoc",
      "articles/styling/legacy",
      "articles/styling/styling-components",
      "articles/styling/application-theme.adoc",
      "articles/styling/styling-other-elements.adoc",
      "articles/components/index.asciiidoc",
      "articles/compatibility.adoc",

      "frontend/demo/fusion",
      "frontend/demo/upgrade-tool",
      "frontend/demo/tools",
      "frontend/demo/flow",
      "frontend/demo/pwa",

      "src/main/java/com/vaadin/demo/flow",
      "src/main/java/com/vaadin/demo/pwa",
      "src/main/java/com/vaadin/demo/sso",
      "src/main/java/com/vaadin/demo/collaboration",
      "src/main/java/com/vaadin/demo/observability",
      "src/main/java/com/vaadin/demo/ui/webcomponents/MwcSlider.java",

      "dspublisher/theme",
      "dspublisher/config/default.json",
      "dspublisher/config/production.json",
      
      "PULL_REQUEST_TEMPLATE.md",

      ".gitattributes",

      "frontend/demo/component/upload/upload-demo-mock-files.ts",
      "frontend/demo/react-example.ts",
      "frontend/demo/render-banner.ts",

      // Ignore all React examples
      /frontend\/demo\/component\/.*\/react.*/,
    ],
  },
  rename: {
    // paths in 'latest' to copy to different paths in 'dsp'
    "articles/styling/lumo/design-tokens": "articles/ds/foundation",
    "articles/styling/lumo": "articles/lumo",
  },
  target: {
    // paths in 'dsp' to keep (since they shouldn't be removed, even if they don't exist in latest)
    "keep": [
      "articles/foundation",
      "articles/_images",
      "articles/404.adoc",
      "articles/figma.asciidoc",
      "articles/index.adoc",
      "articles/components/index.adoc",
      "articles/lumo/index.adoc",
      "dspublisher/.env",
      "dspublisher/docs-theme",
      "dspublisher/config/default.json",
      "frontend/demo/component/upload/upload-demo-mock-files.ts",
    ]
  },
  // callbacks for changing the content of certain files
  callback: [
    {
      path: 'articles/components/grid/flow.asciidoc',
      callback: content => content.replace(/.*_items-identities.adoc.*/, '')
    },
    {
      path: 'pom.xml',
      callback: content => content.replace(/\s*<dependency>[\s\S]*?<\/dependency>/g, match => /kit-starter/.test(match) ? '' : match)
    },
    {
      path: 'package.json',
      callback: content => content.replace(/.*@opentelemetry\/.*\n/g, '').replace(/,(\s*?})/sg, '$1')
    },
    {
      path: /articles\/.*\.[asciidoc|adoc]/,
      callback: (content) => {

        // Remove discussion ids
        content = content.replace(/\[discussion-id\].*/g, '');

        return content;
      },
    }
  ]
}

exports.config = config;
