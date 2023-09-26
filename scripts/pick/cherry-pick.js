#!/usr/bin/env node

const asyncExec = require('util').promisify(require('child_process').exec);
const fs = require('fs');
const path = require('path');
const { program } = require('commander');

const cfgDefault = `${path.dirname(process.argv[1])}/${path.basename(process.argv[1], '.js')}-config.js`;

let tmpSource, tmpTarget, debug;

const cmd = program
    .option('-d, --debug', 'run in debug mode')
    .option('-T, --tmp <tmp>', 'Temporary folder', './tmp')
    .option('-s, --branchSource <source>', 'source branch', 'latest')
    .option('-s, --tagSource <tag|hash>', 'Tag or Hash in the source branch that should be used for picking changes', 'HEAD')
    .option('-t, --branchTarget <target>', 'target branch', 'dsp')
    .option('-c, --config <config>', 'config file', cfgDefault)
    .option('-r, --repo <repository>', 'repository', 'git@github.com:vaadin/docs.git')
    .parse()._optionValues;

function log(...args) {
  console.log(...args);
}
function dbg(...args) {
  cmd.debug && log(...args);
}
async function run(cmd) {
  dbg(cmd);
  const {stdout, stderr} = await asyncExec(cmd);
  return stdout.trim();
}

function isPathKept(path, config) {
  for (const k of config.target.keep) {
    if (k instanceof RegExp && k.test(path) || typeof path === 'string' && path.startsWith(k)) {
      return true;
    }
  }
  return false;
}
function isPathIncluded(path, config) {
  for (const k of config.source.copy) {
    if (k instanceof RegExp && k.test(path) || typeof path === 'string' && path.startsWith(k)) {
      return true;
    }
  }
  return false;
}
function isPathIgnored(path, config) {
  for (const k of config.source.copy) {
    if (path === k) {
      return false;
    }
  }
  for (const k of config.source.ignore) {
    if (k instanceof RegExp && k.test(path) || typeof k === 'string' && path.startsWith(k)) {
      return true;
    }
  }
  return false;
}
function computeTarget(path, config) {
  for (const k of Object.keys(config.rename)) {
    if (path === k) {
      return config.rename[k];
    }
  }
}
function computeCallback(path, config) {
  for (const o of config.callback) {
    if (o.path instanceof RegExp && o.path.test(path) || typeof o.path === 'string' && path.startsWith(o.path)) {
      return o.callback;
    }
  }
}

function copyFile(source, target, replaceCall) {
  if (!fs.existsSync(path.dirname(target))) {
    fs.mkdirSync(path.dirname(target), {recursive: true});
  }
  dbg(`Copy ${source} ${target}`);
  fs.copyFileSync(source, target);
  if (replaceCall) {
    dbg(`Modify: ${target}`);
    let content = fs.readFileSync(source, 'utf8');
    content = content.replace('\r', ''); // windows
    content = replaceCall(content);
    fs.writeFileSync(target, content, 'utf8')
  }
}

function copyFolderRecursive(source, target, config) {
  target = computeTarget(source, config) || target;
  const folderSource = path.join(tmpSource, source);
  const folderTarget = path.join(tmpTarget, target);
  if (!fs.existsSync(folderSource) || !fs.lstatSync(folderSource).isDirectory()) {
    return;
  }
  const files = fs.readdirSync(folderSource);
  files.forEach(function (file) {
    const sourcePath = path.join(source, file);
    const targetPath = path.join(target, file);
    if (isPathIncluded(sourcePath, config) && !isPathIgnored(sourcePath, config)) {
      const fullPath = path.join(folderSource, file);
      if (fs.lstatSync(fullPath).isDirectory()) {
        cleanTargetFolder(targetPath, config);
        copyFolderRecursive(sourcePath, targetPath, config);
      } else {
        copyFile(path.join(tmpSource, sourcePath), path.join(tmpTarget, targetPath), computeCallback(sourcePath, config));
      }
    }
  });
}

function cleanTargetFolder(target, config) {
  const folderTarget = path.join(tmpTarget, target);
  if (!fs.existsSync(folderTarget) || !fs.lstatSync(folderTarget).isDirectory()) {
    return;
  }
  const files = fs.readdirSync(folderTarget);
  files.forEach(function (file) {
    const targetPath = path.join(target, file);
    if (!isPathKept(targetPath, config)) {
      const fullPath = path.join(folderTarget, file);
      if (fs.lstatSync(fullPath).isDirectory()) {
        cleanTargetFolder(targetPath, config);
      } else if (fs.existsSync(fullPath)) {
        fs.unlinkSync(fullPath);
      }
    } else {
      dbg(`Keeping ${target}`);
    }
  });
}

async function cloneBranches() {
  fs.mkdirSync(cmd.tmp, {recursive: true});
  for (const b of [cmd.branchSource, cmd.branchTarget]) {
    const f = `${cmd.tmp}/${b}`;
    if (fs.existsSync(f)) {
      log(`updating repo=${cmd.repo} branch=${b} folder=${f} ...`);
      await run(`git -C ${f} fetch origin`);
      await run(`git -C ${f} reset --hard origin/${b}`);
      await run(`git -C ${f} clean -fd`);
      await run(`git -C ${f} checkout ${b}`);
    } else {
      log(`cloning repo=${cmd.repo} branch=${b} folder=${f} ...`)
      await run(`git clone -b ${b} ${cmd.repo} ${f}`);
    }
    if (b == cmd.branchSource) {
      await run (`git -C ${f} checkout ${cmd.tagSource}`)
    }
  };
}
async function createPrBranch(folder, name) {
  log(`Creating branch ${name} for the changes`);
  const a = await run(`git -C ${folder} branch -l ${name}`);
  if (a.length) {
    await run(`git -C ${folder} branch -D '${name}'`);
  }
  await run(`git -C ${folder} checkout -b '${name}'`);
}
async function commitChanges(folder, message) {
  const a = await run(`git -C ${folder} status --porcelain`);
  if (a.length) {
    log(`Commiting changes '${message}' in ${folder}`);
    await run(`git -C ${folder} add -A`);
    await run(`git -C ${folder} commit -m '${message}' -a`);
  } else {
    log(`Nothing to commit in ${folder}`);
  }
}
async function compileProject(folder) {
  log(`Compiling project for production in ${folder} ...`);
  await run(`mvn ${cmd.debug ? '' : '-q'} -f ${folder}/pom.xml clean package -Pproduction`);
}

async function main() {
  tmpSource = `${cmd.tmp}/${cmd.branchSource}`;
  tmpTarget = `${cmd.tmp}/${cmd.branchTarget}`;
  const {config} = require(path.resolve(cmd.config));
  const prBranch = `update-${cmd.branchTarget}-${(new Date()).toISOString().replace(/T.*/, '')}`;
  await cloneBranches();
  await createPrBranch(tmpTarget, prBranch);
  log("Updating files")
  copyFolderRecursive("", "", config);
  await compileProject(tmpTarget);
  commitChanges(tmpTarget, 'Update DSP branch from latest');
}

main()
