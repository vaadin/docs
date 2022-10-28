
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
    ],
    // paths in 'latest' to ignore (since they shouldn't be copied to dsp)
    "ignore": [
      /(^|\/)\..+/, // hidden files

      "articles/guide",
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
      "articles/styling",
      "articles/upgrading",
      "articles/application",
      "articles/routing",
      "articles/_vaadin-version.adoc",
      "articles/_commercial-banner.asciidoc",
      "articles/_terminal.asciidoc",
      "articles/404.asciidoc",

      "frontend/demo/fusion",
      "frontend/demo/upgrade-tool",
      "frontend/demo/tools",
      "frontend/demo/component",
      "frontend/demo/flow",

      "src/main/java/com/vaadin/demo/flow",
      "src/main/java/com/vaadin/demo/pwa",
      "src/main/java/com/vaadin/demo/sso",
      "src/main/java/com/vaadin/demo/collaboration",

      "dspublisher/theme",
    ],
  },
  rename: {
    // paths in 'latest' to copy to different paths in 'dsp'
    "articles/components": "articles/ds/components"
  },
  target: {
    // paths in 'dsp' to keep (since they shouldn't be removed, even if they don't exist in latest)
    "keep": [
      "articles/ds/foundation",
      "articles/ds/_images"
    ]
  },
  // callbacks for changing the content of certain files
  callback: [
    {
      path: /.*\.property$/,
      callback: (content) => content.replace(/foo/, "bar")
    }
  ]
}

exports.config = config;
