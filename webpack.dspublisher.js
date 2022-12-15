const path = require('path');
const fs = require('fs');
const settings = require('./target/vaadin-dev-server-settings.json');

const buildDirectory = path.resolve(__dirname, 'target');
const {
  ApplicationThemePlugin,
  extractThemeName,
  findParentThemes,
} = require(buildDirectory + '/plugins/application-theme-plugin');

const frontendFolder = path.resolve(__dirname, settings.frontendFolder);

// Folders in the project which can contain static assets.
const projectStaticAssetsFolders = [
  path.resolve(__dirname, 'src', 'main', 'resources', 'META-INF', 'resources'),
  path.resolve(__dirname, 'src', 'main', 'resources', 'static'),
  frontendFolder,
];

const projectStaticAssetsOutputFolder = path.resolve(__dirname, settings.staticOutput);

// Folders in the project which can contain application themes
const themeProjectFolders = projectStaticAssetsFolders.map(folder =>
  path.resolve(folder, settings.themeFolder)
);

const frontendGeneratedFolder = path.resolve(frontendFolder, settings.generatedFolder);

const jarResourcesFolder = path.resolve(__dirname, settings.jarResourcesFolder);

const themeResourceFolder = path.resolve(__dirname, settings.themeResourceFolder, settings.themeFolder);

const themeOptions = {
  devMode: false,
  // The following matches folder 'target/flow-frontend/themes/'
  // (not 'frontend/themes') for theme in JAR that is copied there
  themeResourceFolder,
  themeProjectFolders,
  projectStaticAssetsOutputFolder,
  frontendGeneratedFolder,
};

// this matches css files in the theme
const themeCssRegex = /(\\|\/).*frontend(\\|\/)themes\1[\s\S]*?\.css/;
const embeddedWcRegex = /(\\|\/).*target(\\|\/)frontend(\\|\/)[\s\S]*-wc.js/;

const projectThemePath = path.resolve(__dirname, 'frontend/themes');
const reusableThemesPath = path.resolve(__dirname, 'target/flow-frontend/themes');

// List of all the directories under projectThemePath (frontend/themes)
const projectThemeNames = fs.readdirSync(projectThemePath);

// Content of the DemoExporter.java file (has the @Theme annotation)
const demoExporterContent = fs.readFileSync(
  path.resolve(__dirname, 'src/main/java/com/vaadin/demo/DemoExporter.java'),
  'utf-8'
);

// Check if one of the project themes (default = "docs") is in use
const themeLine = demoExporterContent.split('\n').find((line) => line.includes('@Theme'));
const usesProjectTheme = projectThemeNames.some((themeName) =>
  themeLine.includes(`"${themeName}"`)
);

const themesPath = usesProjectTheme ? projectThemePath : reusableThemesPath;
const applyThemePath = path.resolve(frontendGeneratedFolder, 'theme.js');

module.exports = function (config) {
  const allFlowImportsPath = path.resolve(__dirname, 'target/frontend/generated-flow-imports.js');
  config.resolve.alias['all-flow-imports-or-empty'] =
    process.env.DOCS_IMPORT_EXAMPLE_RESOURCES === 'true'
      ? allFlowImportsPath
      : // false not supported in Webpack 4, let's use a resource that would get included anyway
        applyThemePath;

  // Create an alias for each parent theme (if any)
  const themeName = extractThemeName(frontendGeneratedFolder);
  const parentThemePaths = findParentThemes(themeName, themeOptions);
  parentThemePaths.forEach((parentThemePath) => {
    const parentThemeName = parentThemePath.split('/').pop();
    config.resolve.alias[`themes/${parentThemeName}`] = parentThemePath;
  });

  config.resolve.alias['Frontend/generated/theme'] = applyThemePath;
  config.resolve.alias.themes = themesPath;
  const frontendFolder = path.resolve(__dirname, 'frontend');
  config.resolve.alias['Frontend'] = frontendFolder;
  config.plugins.push(new ApplicationThemePlugin(themeOptions));

  config.resolve.alias['@vaadin/flow-frontend'] = jarResourcesFolder;

  // If there are pre-existing rules that affect CSS files,
  // make them exclude files that match the themeCssRegex pattern...
  config.module.rules
    .filter(rule => rule.oneOf && rule.oneOf.some(r => r.test.test('style.css')))
    .forEach(rule => (rule.exclude = themeCssRegex));

  // ...and add a custom rule to handle the CSS files matching the themeCssRegex pattern
  config.module.rules.push({
    test: themeCssRegex,
    use: ['raw-loader', 'extract-loader', 'css-loader']
  });

  // The docs-app bundle should never contain the embedded Vaadin examples
  config.module.rules.push({
    test: embeddedWcRegex,
    use: ['null-loader']
  });

  // Avoid having the docs-app dev server recompile whenever the Java-sources or generated files change
  config.devServer = {
    watchOptions: {
      ignored: [
        path.resolve(__dirname, 'target'),
        path.resolve(__dirname, 'node_modules'),
        path.resolve(__dirname, 'src', 'main', 'java'),
        path.resolve(__dirname, 'frontend', 'generated')
      ]
    }
  };
};
