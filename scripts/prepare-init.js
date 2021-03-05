const { execSync } = require('child_process');

try {
  require('inquirer');
} catch (e) {
  console.log('Installing NPM dependencies...');
  execSync('mvn compile vaadin:prepare-frontend vaadin:build-frontend');
}
