/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */
import { spawn } from 'child_process';
import fs from 'fs';
import path from 'path';
import http from 'http';
import * as readline from 'readline';

import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DSP_VERSION = '3.0.0-alpha.10';

async function checkPreConditions() {
  try {
    // Verify the necessary ports are available on localhost
    const ports = [8000, 8080];
    await Promise.all(
      ports.map((port) => {
        return new Promise((resolve, reject) => {
          http
            .get(`http://localhost:${port}`, () => {
              reject(
                new Error(
                  `Port ${port} is already in use. Please close the application using that port.`
                )
              );
            })
            .on('error', () => resolve());
        });
      })
    );

    // Verify Maven is installed
    await new Promise((resolve, reject) => {
      const ps = spawn('mvn', ['--version'], {
        stdio: 'ignore',
        shell: true,
      });

      ps.on('close', (code) => {
        if (code === 0) {
          resolve();
        } else {
          reject(
            new Error('Maven is not installed. Please make sure it is installed and in your PATH.')
          );
        }
      });

      ps.on('error', () => {
        new Error('Maven is not installed. Please make sure it is installed and in your PATH.');
      });
    });

    // Verify the Node.js version is supported
    const MINIMUM_NODE_VERSION = 14;
    const RECOMMENDED_NODE_VERSION = 16;
    const nodeMajor = process.versions.node.split('.')[0];
    if (nodeMajor < MINIMUM_NODE_VERSION) {
      throw Error(
        `You're running Node.js ${process.versions.node} which is not supported. Node.js ${RECOMMENDED_NODE_VERSION} is recommended.`
      );
    }
  } catch (e) {
    console.error(e.message);
    process.exit(1);
  }
}

const projectRootPath = path.resolve(__dirname, '..');
const nodeModulesPath = path.resolve(projectRootPath, 'node_modules');
const firstLaunch = !fs.existsSync(nodeModulesPath);
const firstLaunchMessage = firstLaunch ? ' (first launch may take a while)' : '';

// License check helper command
const hasLicenseChecker = (() => {
  const pomFilePath = path.resolve(projectRootPath, 'pom.xml');
  const pomFile = fs.readFileSync(pomFilePath, 'utf8');
  return pomFile.includes('dspublisher-license-check');
})();

const LICENSE_CHECK = hasLicenseChecker
  ? {
      shell: 'mvn -C -P dspublisher-license-check',
      phases: [
        {
          text: `Checking license${firstLaunchMessage}`,
          readySignal: 'BUILD SUCCESS',
          doneText: 'License check passed',
          weight: 10,
        },
      ],
    }
  : undefined;

const SCRIPTS = {
  clean: {
    name: `dsp@${DSP_VERSION}:clean`,
    commands: [
      {
        shell: `npx -y @vaadin/dspublisher@${DSP_VERSION} --clean`,
        phases: [
          {
            text: `Cleaning up dspublisher cache${firstLaunchMessage}`,
            readySignal: 'Successfully deleted directories',
            weight: 5,
          },
        ],
      },
      {
        shell: 'mvn -C clean',
        phases: [
          {
            text: `Cleaning up project${firstLaunchMessage}`,
            readySignal: 'BUILD SUCCESS',
            weight: 5,
          },
        ],
      },
      {
        func: () => {
          const generatedPath = path.resolve(projectRootPath, 'frontend', 'generated');
          if (fs.existsSync(generatedPath)) {
            fs.rmSync(generatedPath, { recursive: true });
          }
        },
        phases: [
          {
            text: 'Removing generated frontend files',
            weight: 1,
          },
        ],
      },
      {
        func: () => {
          if (fs.existsSync(nodeModulesPath)) {
            fs.rmSync(nodeModulesPath, { recursive: true });
          }
        },
        phases: [
          {
            text: 'Removing node_modules',
            weight: 3,
            doneText: 'Ready. Caches cleaned up',
          },
        ],
      },
    ],
  },
  develop: {
    name: `dsp@${DSP_VERSION}:start`,
    commands: [
      LICENSE_CHECK,
      // Starts docs-app and docs server (concurrently)
      {
        shell: [
          'npx',
          '-y',
          'concurrently',
          '--kill-others',
          '--raw',
          `"npx -y @vaadin/dspublisher@${DSP_VERSION} --develop"`,
          '"mvn -C"',
        ],
        phases: [
          {
            text: `Initializing${firstLaunchMessage}`,
            readySignal: 'Application running at',
            weight: 30,
          },
          {
            text: 'Starting up DSP',
            readySignal: ['watching for file changes'],
            doneText: 'Ready at http://localhost:8000. Stop the server with Ctrl+C',
            weight: 5,
            lastPhase: true,
          },
        ],
        ignoredLogSignals: ['New version of Astro available'],
      },
    ].filter((p) => !!p),
  },
  build: {
    name: `dsp@${DSP_VERSION}:build`,
    commands: [
      LICENSE_CHECK,
      {
        func: () => {
          const outFolder = path.resolve(__dirname, 'out');
          if (fs.existsSync(outFolder)) {
            fs.rmSync(outFolder, { recursive: true });
          }
        },
        phases: [
          {
            text: 'Removing old build',
            weight: 1,
          },
        ],
      },
      {
        shell: 'mvn -C clean package -DskipTests -Pproduction',
        phases: [
          {
            text: 'Building a deployable jar',
            readySignal: 'BUILD SUCCESS',
            weight: 40,
          },
        ],
      },
      {
        shell: `npx -y @vaadin/dspublisher@${DSP_VERSION} --build`,
        phases: [
          {
            text: 'Initializing build',
            readySignal: 'Getting diagnostics',
            weight: 40,
          },
          {
            text: 'Building production JavaScript and CSS bundles',
            readySignal: 'generating static routes',
            weight: 30,
          },
          {
            text: 'Building static pages',
            readySignal: 'generating optimized images',
            weight: 60,
          },
          {
            text: 'Optimizing images',
            readySignal: 'sitemap-index.xml',
            weight: 70,
          },
          {
            text: 'Building sitemap and search index',
            readySignal: 'Finished in',
            weight: 10,
          },
        ],
        ignoredLogSignals: ['Could not find a declaration file for module'],
      },
      {
        func: () => {
          // Copy the jar file from ../target/*.jar to ../dspublisher/out/docs.jar
          const jarFile = fs
            .readdirSync(path.resolve(projectRootPath, 'target'))
            .find((fn) => fn.endsWith('.jar'));

          fs.copyFileSync(
            path.resolve(projectRootPath, 'target', jarFile),
            path.resolve(__dirname, 'out', 'docs.jar')
          );
        },
        phases: [
          {
            text: 'Copying jar to output',
            doneText: 'Ready. The build artifacts are in dspublisher/out',
            weight: 5,
            lastPhase: true,
          },
        ],
      },
    ].filter((p) => !!p),
  },
};

let activeScript;
if (process.argv.includes('--develop')) {
  activeScript = SCRIPTS.develop;
} else if (process.argv.includes('--clean')) {
  activeScript = SCRIPTS.clean;
} else if (process.argv.includes('--build')) {
  activeScript = SCRIPTS.build;
}

const totalWeight = activeScript.commands.reduce(
  (acc, command) => acc + command.phases.reduce((acc, p) => acc + p.weight, 0),
  0
);

const progressState = {
  name: activeScript.name,
  phase: '',
  spinner: '',
  progress: 0,
};

function clearLines(n) {
  for (let i = 0; i < n; i++) {
    const y = i === 0 ? null : -1;
    readline.moveCursor(process.stdout, 0, y);
    readline.clearLine(process.stdout, i);
    process.stdout.line;
  }
  readline.cursorTo(process.stdout, 0);
}

/**
 * Logs to console and renders the progress bar.
 */
let progressLogged = false;
function logProgress(state, output) {
  if (progressLogged && !process.env.NO_PROGRESS_LOG) {
    // Clear the progress bar
    clearLines(2);
  }
  progressLogged = true;

  // Log the output
  if (output) {
    process.stdout.write(`${output}`);
  }

  if (!process.env.NO_PROGRESS_LOG) {
    // Build the progress bar
    const progressBarWidth = 20;
    const defaultColor = '\x1b[0m';
    const finishedColor = '\x1b[37;1m';
    const unfinishedColor = '\x1b[30;1m';

    const progressBar = `${finishedColor}${'█'.repeat(
      Math.floor((state.progress / totalWeight) * progressBarWidth)
    )}${unfinishedColor}${'█'.repeat(
      progressBarWidth - Math.floor((state.progress / totalWeight) * progressBarWidth)
    )}${defaultColor}`;

    // Render the state
    process.stdout.write(`\n${state.name} ${progressBar} ${state.phase}${state.spinner}`);
  }
}

// Interval for rendering the "spinner"
const spinnerInterval = setInterval(() => {
  progressState.spinner = progressState.spinner.length === 3 ? '' : progressState.spinner + '.';
  logProgress(progressState);
}, 500);

function finish() {
  // Stop the spinner
  clearInterval(spinnerInterval);
  progressState.spinner = '';

  // Make sure the progress bar shows 100%
  progressState.progress = totalWeight;

  // Render doneText of the last phase of the last command
  const lastCommand = activeScript.commands[activeScript.commands.length - 1];
  const lastPhase = lastCommand.phases[lastCommand.phases.length - 1];
  progressState.phase = lastPhase.doneText;

  logProgress(progressState);
}

/**
 * Executes a shell command.
 * Observes the output of the child process and updates the progress bar
 * as defined by the phases of the command.
 */
async function execute(shellCommand, phases, ignoredLogSignals = []) {
  return new Promise((resolve) => {
    const parts = Array.isArray(shellCommand) ? shellCommand : shellCommand.split(' ');
    const ps = spawn(parts[0], [...parts.slice(1)], { shell: true });

    ps.on('close', (code) => {
      if (code !== 0) {
        console.error(`${shellCommand} failed with code ${code}`);
        process.exit(code);
      }

      resolve();
    });

    ps.stdout.on('data', (data) => {
      if (ignoredLogSignals.every((signal) => !data.toString().includes(signal))) {
        logProgress(progressState, data.toString());
      }

      // Find if the output includes the ready signal for one of the phases.
      const phase = phases.find((p) => {
        const readySignals = Array.isArray(p.readySignal) ? p.readySignal : [p.readySignal];
        return readySignals.some((signal) => data.includes(signal));
      });

      if (phase && !phase.done) {
        // A phase was found and it wasn't marked as done yet

        if (phase.lastPhase) {
          // This is the last phase of the script
          finish();
        } else {
          // Update the progress
          progressState.progress += phase.weight;
          // Make sure progress doesn't exceed total weight
          progressState.progress = Math.min(progressState.progress, totalWeight);

          const nextPhase = phases[phases.indexOf(phase) + 1];
          if (nextPhase) {
            // If the next phase exists, render its text
            progressState.phase = nextPhase.text;
          }

          logProgress(progressState);
        }

        phase.done = true;
      }
    });

    ps.stderr.on('data', (data) => {
      if (ignoredLogSignals.every((signal) => !data.toString().includes(signal))) {
        const redColor = '\x1b[31m';
        const defaultColor = '\x1b[0m';
        logProgress(progressState, `${redColor}${data.toString()}${defaultColor}`);
      }
    });
  });
}

(async () => {
  await checkPreConditions();

  // Run each command in the active script sequentially
  for (let command of activeScript.commands) {
    // Render the text from the first phase of the current command
    progressState.phase = command.phases[0].text;
    logProgress(progressState);

    // Run either a shell command or a function associated with the command
    if (command.shell) {
      await execute(command.shell, command.phases, command.ignoredLogSignals);
    } else if (command.func) {
      await command.func();
    }
  }

  finish();
  process.stdout.write('\n');
})();
