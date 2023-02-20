const karmaChromeLauncher = require('karma-chrome-launcher');
const karmaFirefoxLauncher = require('karma-firefox-launcher');
const karmaSafariLauncher = require('karma-safarinative-launcher'); // <1>
const karmaCoverage = require('karma-coverage');
const karmaMocha = require('karma-mocha');
const karmaVite = require('karma-vite');

const isCI = !!process.env.CI; // <2>
const watch = !!process.argv.find((arg) => arg.includes('watch')) && !isCI; // <3>
const coverage = !!process.argv.find((arg) => arg.includes('--coverage')); // <4>

module.exports = (config) => {
  config.set({
    plugins: [
      karmaMocha,
      karmaChromeLauncher,
      karmaFirefoxLauncher,
      karmaSafariLauncher,
      karmaVite,
      karmaCoverage,
    ],

    browsers: ['ChromeHeadlessNoSandbox', 'Firefox', 'SafariNative'],

    customLaunchers: {
      ChromeHeadlessNoSandbox: { // <5>
        base: 'ChromeHeadless',
        flags: ['--no-sandbox', '--disable-setuid-sandbox'],
      },
    },

    frameworks: ['vite', 'mocha'],

    files: [
      {
        pattern: 'test/**/*.test.ts',
        type: 'module',
        watched: false,
        served: false,
      },
    ],

    reporters: ['progress', coverage && 'coverage'].filter(Boolean), // <6>

    autoWatch: watch,
    singleRun: !watch,

    coverageReporter: {
      dir: '.coverage/',
      reporters: [
        !isCI && { type: 'html', subdir: 'html' }, // <7>
        { type: 'lcovonly', subdir: '.' }, // <8>
      ].filter(Boolean),
    },
  });
};
