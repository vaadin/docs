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

// Target flow-fronted auto generated to be the actual target folder
const flowFrontendFolder = path.resolve(__dirname, 'target/flow-frontend');

const flowFrontendThemesFolder = path.resolve(flowFrontendFolder, 'themes');

const themeOptions = {
  // The following matches target/flow-frontend/themes/theme-generated.js
  // and for theme in JAR that is copied to target/flow-frontend/themes/
  // and not frontend/themes
  themeResourceFolder: flowFrontendThemesFolder,
  themeProjectFolders,
  projectStaticAssetsOutputFolder
};

// this matches css files in the theme
const themeCssRegex = /(\\|\/).*frontend(\\|\/)themes\1[\s\S]*?\.css/;

const projectThemePath = path.resolve(__dirname, 'frontend/themes');
const reusableThemesPath = path.resolve(__dirname, 'target/flow-frontend/themes');
const hasReusableThemes = fs
  .readdirSync(reusableThemesPath)
  .some(file => !file.includes('theme-generated.js'));

const themesPath = hasReusableThemes ? reusableThemesPath : projectThemePath;

module.exports = function(config) {
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
};
