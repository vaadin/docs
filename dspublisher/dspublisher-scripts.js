/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */
const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');
const http = require('http');

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
            new Error('Maven is not installed. Plase make sure it is installed and in your PATH.')
          );
        }
      });

      ps.on('error', () => {
        new Error('Maven is not installed. Plase make sure it is installed and in your PATH.');
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

const DSP_VERSION = '2.0.0-alpha.6';

const firstLaunch = !fs.existsSync(path.resolve(__dirname, '..', 'node_modules'));
const firstLaunchMessage = firstLaunch ? ' (first launch may take a while)' : '';

// License check helper command
const LICENSE_CHECK = {
  shell: 'mvn -C -P dspublisher-license-check',
  phases: [
    {
      text: `Checking license${firstLaunchMessage}`,
      readySignal: 'BUILD SUCCESS',
      doneText: 'License check passed',
      weight: 10,
    },
  ],
};

const SCRIPTS = {
  clean: {
    name: `dsp@${DSP_VERSION}:clean`,
    commands: [
      {
        shell: `npx @vaadin/dspublisher@${DSP_VERSION} --clean`,
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
            doneText: 'Ready. Caches cleaned up',
            weight: 5,
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
          'concurrently',
          '--kill-others',
          '--raw',
          `"npx @vaadin/dspublisher@${DSP_VERSION} --develop"`,
          '"mvn -C"',
        ],
        phases: [
          {
            text: `Initializing${firstLaunchMessage}`,
            readySignal: 'success building schema',
            weight: 30,
          },
          {
            text: `Creating pages${firstLaunchMessage}`,
            readySignal: 'success createPages',
            weight: 15,
          },
          {
            text: 'Building development bundle',
            readySignal: 'You can now view',
            doneText: 'Ready at http://localhost:8000. Stop the server with Ctrl+C',
            weight: 95,
            lastPhase: true,
          },
        ],
        ignoredLogSignals: ['ERR_REQUIRE_ESM'],
      },
    ],
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
        shell: `npx @vaadin/dspublisher@${DSP_VERSION} --build`,
        phases: [
          {
            text: 'Building static pages',
            readySignal: 'success createPages',
            weight: 35,
          },
          {
            text: 'Building production JavaScript and CSS bundles',
            readySignal: 'success Building production JavaScript and CSS bundles',
            weight: 180,
          },
          {
            text: 'Generating image thumbnails',
            readySignal: 'Done building',
            weight: 60,
          },
        ],
        ignoredLogSignals: ['ERR_REQUIRE_ESM'],
      },
      {
        func: () => {
          // Copy the jar file from ../target/*.jar to ../dspublisher/out/docs.jar
          const jarFile = fs
            .readdirSync(path.resolve(__dirname, '..', 'target'))
            .find((fn) => fn.endsWith('.jar'));

          fs.copyFileSync(
            path.resolve(__dirname, '..', 'target', jarFile),
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
    ],
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
    process.stdout.moveCursor(0, y);
    process.stdout.clearLine(i);
    process.stdout.line;
  }
  process.stdout.cursorTo(0);
}

/**
 * Logs to console and renders the progress bar.
 */
function logProgress(state, output) {
  if (this.progressLogged && !process.env.NO_PROGRESS_LOG) {
    // Clear the progress bar
    clearLines(2);
  }
  this.progressLogged = true;

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
      const phase = phases.find((p) => data.includes(p.readySignal));

      if (phase && !phase.done) {
        // A phase was found and it wasn't marked as done yet

        if (phase.lastPhase) {
          // This is the last phase of the script
          finish();
        } else {
          // Update the progress
          progressState.progress += phase.weight;

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
