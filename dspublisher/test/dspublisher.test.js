const { spawn, execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

function dspClean(projectDirName) {
  console.log(`Cleaning up dspublisher`);
  const projectPath = path.resolve(__dirname, projectDirName);
  execSync('npm run dspublisher:clean', {
    cwd: projectPath,
    stdio: 'inherit',
  });
}

function removeTestProject(projectDirName) {
  const testProjectDir = path.resolve(__dirname, projectDirName);
  if (fs.existsSync(testProjectDir)) {
    console.log(`Removing an existing test project in ${testProjectDir}`);
    fs.rmSync(testProjectDir, { recursive: true });
  }
}

function dspInit(name, techincalName) {
  console.log(`Initializing dspublisher project ${name}`);
  const dspInitProcess = spawn('npx', ['@vaadin/cli', 'dsp-init'], { shell: true });

  let nameGiven = false;
  let technicalNameGiven = false;
  dspInitProcess.stdout.on('data', (data) => {
    if (data.toString().includes('Enter the full name') && !nameGiven) {
      nameGiven = true;
      dspInitProcess.stdin.write(`${name}\n`);
    } else if (data.toString().includes('Provide a short technical name') && !technicalNameGiven) {
      technicalNameGiven = true;
      dspInitProcess.stdin.write(`${techincalName}\n`);
    }
  });

  return new Promise((resolve) => {
    dspInitProcess.on('close', () => {
      resolve();
    });
  });
}

function installCustomTheme(themeName) {
  console.log(`Installing custom theme ${themeName}`);
  const themePath = path.resolve(__dirname, themeName);
  execSync(`mvn install`, { cwd: themePath });
}

function useCustomTheme(projectDirName, themeDir, themeName) {
  console.log(`Modifying the project to use the custom theme ${themeName}`);

  const themePomFilePath = path.resolve(__dirname, themeDir, 'pom.xml');
  const themePomFile = fs.readFileSync(themePomFilePath, 'utf8');
  const themeGroupId = themePomFile.match(/<groupId>([^<]+)<\/groupId>/)[1];
  const themeArtifactId = themePomFile.match(/<artifactId>([^<]+)<\/artifactId>/)[1];
  const themeVersion = themePomFile.match(/<version>([^<]+)<\/version>/)[1];

  const projectPomFilePath = path.resolve(__dirname, projectDirName, 'pom.xml');
  const projectPomFile = fs.readFileSync(projectPomFilePath, 'utf8');
  const projectNewPomFile = projectPomFile.replace(
    '\n    <dependencies>',
    `\n    <dependencies>
             <dependency>
               <groupId>${themeGroupId}</groupId>
               <artifactId>${themeArtifactId}</artifactId>
               <version>${themeVersion}</version>
             </dependency>`
  );
  fs.writeFileSync(projectPomFilePath, projectNewPomFile);

  const projectThemeJsonFilePath = path.resolve(
    __dirname,
    projectDirName,
    'frontend',
    'themes',
    'docs',
    'theme.json'
  );
  const projectThemeJsonFile = fs.readFileSync(projectThemeJsonFilePath, 'utf8');
  const projectThemeJsonFileNew = projectThemeJsonFile.replace(
    '}',
    `,
    "parent": "${themeName}"
  }`
  );
  fs.writeFileSync(projectThemeJsonFilePath, projectThemeJsonFileNew);
}

function buildProject(projectDirName) {
  console.log(`Building the project ${projectDirName}`);
  const projectPath = path.resolve(__dirname, projectDirName);
  execSync('npm run dspublisher:build', {
    cwd: projectPath,
    stdio: 'inherit',
  });
  console.log('\nBuild successful!');
}

function assertOutput(projectDirName) {
  console.log('\nAsserting the build output');

  const buildArtifactsPath = path.resolve(__dirname, projectDirName, 'dspublisher', 'out');
  const jarFileExists = fs.existsSync(path.resolve(buildArtifactsPath, 'docs.jar'));
  if (!jarFileExists) {
    throw new Error(`Jar file does not exist in ${buildArtifactsPath}`);
  }

  const staticFilesPath = path.resolve(buildArtifactsPath, 'public');
  const staticFiles = fs.readdirSync(staticFilesPath);

  const buttonStylesExist = staticFiles.some((file) => {
    if (file.endsWith('.js')) {
      const filePath = path.resolve(staticFilesPath, file);
      const fileContent = fs.readFileSync(filePath, 'utf8');
      return fileContent.includes('outline: var(--acme-button-outline)');
    }
  });

  if (!buttonStylesExist) {
    throw new Error(`Button styles from the custom parent theme do not exist in the static files`);
  }

  const backgroundStyleExists = staticFiles.some((file) => {
    if (file.endsWith('.js')) {
      const filePath = path.resolve(staticFilesPath, file);
      const fileContent = fs.readFileSync(filePath, 'utf8');
      return fileContent.includes('background-color: var(--acme-backround-color)');
    }
  });

  if (!backgroundStyleExists) {
    throw new Error(
      `Background style from the custom parent theme does not exist in the static files`
    );
  }

  console.log(`Tests passed successfully!`);
}

const PROJECT_NAME = 'Acme';
const PROJECT_DIR_NAME = 'acme-docs';
const CUSTOM_THEME_DIR = 'acme-ds';
const CUSTOM_THEME_NAME = 'acme';

async function run() {
  // Remove an existing test project if it exists
  removeTestProject(PROJECT_DIR_NAME);
  // Initilize a new test project
  await dspInit(PROJECT_NAME, PROJECT_DIR_NAME);
  // Install the custom theme
  installCustomTheme(CUSTOM_THEME_DIR);
  // Modify the test project to use the custom theme
  useCustomTheme(PROJECT_DIR_NAME, CUSTOM_THEME_DIR, CUSTOM_THEME_NAME);
  // Cleanup
  dspClean(PROJECT_DIR_NAME);
  // Build the test project
  buildProject(PROJECT_DIR_NAME);
  // Cleanup
  dspClean(PROJECT_DIR_NAME);
  // Assert the output is valid (jar file exists & static html files use the expected theme)
  assertOutput(PROJECT_DIR_NAME);
}

run();
