
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
      "src/main/frontend",
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

      "articles/flow/index.adoc",
      "articles/flow/contributing-docs",
      "articles/upgrading",
      "articles/flow/application",
      "articles/flow/routing",
      "articles/flow/production",
      "articles/flow/_images",
      "articles/flow/_vaadin-version.adoc",
      "articles/flow/_commercial-banner.adoc",
      "articles/flow/_terminal.adoc",
      "articles/flow/404.adoc",
      "articles/flow/_figma-banner.adoc",

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
      "articles/flow/components/index.asciiidoc",
      "articles/flow/compatibility.adoc",

      "src/main/frontend/demo/fusion",
      "src/main/frontend/demo/upgrade-tool",
      "src/main/frontend/demo/tools",
      "src/main/frontend/demo/flow",
      "src/main/frontend/demo/pwa",

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

      "src/main/frontend/demo/component/upload/upload-demo-mock-files.ts",
      "src/main/frontend/demo/react-example.ts",
      "src/main/frontend/demo/render-banner.ts",

      // Ignore all React examples
      /src\/main\/frontend\/demo\/component\/.*\/react.*/,
    ],
  },
  rename: {
    // paths in 'latest' to copy to different paths in 'dsp'
    "articles/styling/lumo/design-tokens": "articles/flow/ds/foundation",
    "articles/styling/lumo": "articles/flow/lumo",
  },
  target: {
    // paths in 'dsp' to keep (since they shouldn't be removed, even if they don't exist in latest)
    "keep": [
      "articles/flow/foundation",
      "articles/flow/_images",
      "articles/flow/404.adoc",
      "articles/flow/figma.adoc",
      "articles/flow/index.adoc",
      "articles/flow/components/index.adoc",
      "articles/flow/lumo/index.adoc",
      "dspublisher/.env",
      "dspublisher/docs-theme",
      "dspublisher/config/default.json",
      "src/main/frontend/demo/component/upload/upload-demo-mock-files.ts",
    ]
  },
  // callbacks for changing the content of certain files
  callback: [
    {
      path: 'articles/flow/components/grid/flow.adoc',
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
