const { ApplicationThemePlugin } = require('@vaadin/application-theme-plugin');

const path = require('path');
const fs = require('fs');

// Folders in the project which can contain static assets.
const projectStaticAssetsFolders = [
  path.resolve(__dirname, 'src', 'main', 'resources', 'META-INF', 'resources'),
  path.resolve(__dirname, 'src', 'main', 'resources', 'static'),
  path.resolve(__dirname, 'frontend')
];

const projectStaticAssetsOutputFolder = path.resolve(
  __dirname,
  'target/META-INF/VAADIN/webapp/VAADIN/static'
);

// Folders in the project which can contain application themes
const themeProjectFolders = projectStaticAssetsFolders.map(folder =>
  path.resolve(folder, 'themes')
);

const frontendGeneratedFolder = path.resolve(__dirname, 'frontend/generated');

// Target flow-fronted auto generated to be the actual target folder
const flowFrontendFolder = path.resolve(__dirname, 'target/flow-frontend');

const flowFrontendThemesFolder = path.resolve(flowFrontendFolder, 'themes');

const themeOptions = {
  devMode: false,
  // The following matches folder 'target/flow-frontend/themes/'
  // (not 'frontend/themes') for theme in JAR that is copied there
  themeResourceFolder: flowFrontendThemesFolder,
  themeProjectFolders,
  projectStaticAssetsOutputFolder,
  frontendGeneratedFolder
};

// this matches css files in the theme
const themeCssRegex = /(\\|\/).*frontend(\\|\/)themes\1[\s\S]*?\.css/;

const projectThemePath = path.resolve(__dirname, 'frontend/themes');
const reusableThemesPath = path.resolve(__dirname, 'target/flow-frontend/themes');
const hasReusableThemes = fs.existsSync(reusableThemesPath);

const themesPath = hasReusableThemes ? reusableThemesPath : projectThemePath;
const applyThemePath = path.resolve(
  hasReusableThemes ? frontendGeneratedFolder : projectThemePath,
  'theme.js'
);

module.exports = function(config) {
  config.resolve.alias['themes/theme-generated.js'] = applyThemePath;
  config.resolve.alias['generated/theme'] = applyThemePath;
  config.resolve.alias.themes = themesPath;
  config.plugins.push(new ApplicationThemePlugin(themeOptions));

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

  // Avoid having the docs-app dev server recompile whenever the Java-sources or generated files change
  config.devServer = {
    watchOptions: {
      ignored: [
        path.resolve(__dirname, 'target'),
        path.resolve(__dirname, 'src', 'main', 'java'),
        path.resolve(__dirname, 'frontend', 'themes', 'docs', 'docs.generated.js'),
        path.resolve(__dirname, 'frontend', 'generated')
      ]
    }
  };
};
