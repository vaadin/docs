
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

      "articles/flow/guide",
      "articles/flow/kb",
      "articles/flow/advanced",
      "articles/flow/configuration",
      "articles/flow/tutorial",
      "articles/flow/tools",
      "articles/flow/api.adoc",
      "articles/flow/security",
      "articles/flow/contributing",
      "articles/flow/create-ui",
      "articles/flow/binding-data",
      "articles/flow/integrations",
      "articles/flow/testing",

      "articles/flow/index.asciidoc",
      "articles/flow/overview.asciidoc",
      "articles/flow/contributing-docs",
      "articles/flow/upgrading",
      "articles/flow/application",
      "articles/flow/routing",
      "articles/flow/production",
      "articles/flow/_images",
      "articles/flow/_vaadin-version.adoc",
      "articles/flow/_commercial-banner.asciidoc",
      "articles/flow/_terminal.asciidoc",
      "articles/flow/404.asciidoc",
      "articles/flow/_figma-banner.adoc",

      "articles/flow/styling/_images",
      "articles/flow/styling/_shared.adoc",
      "articles/flow/styling/advanced",
      "articles/flow/styling/custom-theme",
      "articles/flow/styling/getting-started.adoc",
      "articles/flow/styling/index.adoc",
      "articles/flow/styling/theme-annotation.adoc",
      "articles/flow/styling/_images/",
      "articles/flow/styling/lumo/_images",
      "articles/flow/styling/lumo/index.adoc",
      "articles/flow/styling/lumo/variants",
      "articles/flow/styling/lumo/design-tokens/styling-using-design-tokens.adoc",
      "articles/flow/styling/lumo/design-tokens/_images",
      "articles/flow/styling/lumo/design-tokens/index.adoc",
      "articles/flow/styling/legacy",
      "articles/flow/styling/styling-components",
      "articles/flow/styling/application-theme.adoc",
      "articles/flow/styling/styling-other-elements.adoc",
      "articles/flow/components/index.asciiidoc",
      "articles/flow/compatibility.adoc",

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
    "articles/flow/styling/lumo/design-tokens": "articles/flow/ds/foundation",
    "articles/flow/styling/lumo": "articles/flow/lumo",
  },
  target: {
    // paths in 'dsp' to keep (since they shouldn't be removed, even if they don't exist in latest)
    "keep": [
      "articles/flow/foundation",
      "articles/flow/_images",
      "articles/flow/404.adoc",
      "articles/flow/figma.asciidoc",
      "articles/flow/index.adoc",
      "articles/flow/components/index.adoc",
      "articles/flow/lumo/index.adoc",
      "dspublisher/.env",
      "dspublisher/docs-theme",
      "dspublisher/config/default.json",
      "frontend/demo/component/upload/upload-demo-mock-files.ts",
    ]
  },
  // callbacks for changing the content of certain files
  callback: [
    {
      path: 'articles/flow/components/grid/flow.asciidoc',
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
