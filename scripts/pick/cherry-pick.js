#!/usr/bin/env node

const asyncExec = require('util').promisify(require('child_process').exec);
const fs = require('fs');
const path = require('path');
const { program } = require('commander');
const { basename } = require('path');

const cfgDefault = `${path.dirname(process.argv[1])}/${path.basename(process.argv[1], '.js')}-config.js`;

const cmd = program
    .option('-d, --debug', 'run in debug mode')
    .option('-T, --tmp <tmp>', 'Temporary folder', './tmp')
    .option('-s, --branchSource <source>', 'source branch', 'latest')
    .option('-t, --branchTarget <target>', 'target branch', 'dsp')
    .option('-c, --config <config>', 'config file', cfgDefault)
    .option('-r, --repo <repository>', 'repository', 'git@github.com:vaadin/docs.git')
    .option('-f, --folders <folders>', 'folders to to process comma-separated', 'src')
    .parse()._optionValues;

async function run(cmd) {
  const {stdout, stderr} = await asyncExec(cmd);
  return stdout.trim();
}

function copyFileSync(source, target, replaceCall) {
  console.log(source + " -> " + target);
  if (!fs.existsSync(path.dirname(target))) {
    fs.mkdirSync(path.dirname(target), {recursive: true});
  }  
  fs.copyFileSync(source, target);
  if (replaceCall) {
    let content = fs.readFileSync(source, 'utf8');
    content = content.replace('\r', ''); // windows
    content = replaceCall(content);
    fs.writeFileSync(target, content, 'utf8')
  }
}

function copyFolderRecursiveSync(source, target, config) {
  if (!fs.existsSync(source) || !fs.lstatSync(source).isDirectory()) {
    return;
  }
  const files = fs.readdirSync(source);
  files.forEach(function (file) {
    if (file.startsWith('.')) {
      return;
    }
    const curSource = path.join(source, file);
    const curCfg = config[curSource];
    const curTarget = (curCfg && curCfg.target) || path.join(target, path.basename(curSource));
    const curFnc = curCfg && curCfg.find && curCfg.replace && ((content) => {
      return content.replace(new RegExp(curCfg.find, "g"), curCfg.replace);
    });
    if (fs.lstatSync(curSource).isDirectory()) {
      copyFolderRecursiveSync(curSource, curTarget, config);
    } else if (!config[curSource] || !config[curSource].ignore) {
      copyFileSync(curSource, curTarget, curFnc);
    }
  });
}

async function cloneBranches() {
  fs.mkdirSync(cmd.tmp, {recursive: true});
  for (const b of [cmd.branchSource, cmd.branchTarget]) {
    const f = `${cmd.tmp}/${b}`;
    if (fs.existsSync(f) && b == await run(`git -C ${f} branch --show`)) {
      console.log(`updating repo=${cmd.repo} branch=${b} folder=${f} ...`);
      await run(`git -C ${f} fetch origin`);
      await run(`git -C ${f} reset --hard origin/${b}`);
      await run(`git -C ${f} clean -fd`);
    } else {
      console.log(`cloning repo=${cmd.repo} branch=${b} folder=${f} ...`)
      await run(`git clone -b ${b} ${cmd.repo} ${f}`);
    }
  };
}

async function commitChanges(folder, message) {
  await run(`git -C ${folder} add -A`);
  await run(`git -C ${folder} commit -m '${message}' -a`);
}

function readConfigFile(source, target) {
  console.log(source, target)
  const {config} = require(path.resolve(cmd.config));
  const ret = {};
  Object.keys(config).forEach(k => {
    if (config[k].target) {
      config[k].target = path.join(target, config[k].target);
    }
    ret[path.join(source, k)] = config[k];
  });
  return ret;
}

async function main() {
  const source = `${cmd.tmp}/${cmd.branchSource}`;
  const target = `${cmd.tmp}/${cmd.branchTarget}`;
  const config = readConfigFile(source, target);
  await cloneBranches();
  copyFolderRecursiveSync(source, target, config);
  commitChanges(target, 'Update DSP branch from latest');
}

main()