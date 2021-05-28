#!/bin/bash
set -o pipefail

# Script for updating vaadin versions used in docs
# Usage:  bash ./scripts/version-update.sh <update-version> <currentLatestReleaseMajor>

# update versions in v14 branch
# sed usage: sed -i "s/<replacing-string>/<replaced-string>/g" "<file>"
#            use -i to edit files in-place
#            use /g for matching the replacing-string globally
updateV14Branch() {
  #https://github.com/vaadin/docs/blob/v14/articles/guide/start/maven.asciidoc
  sed -i "s/-DarchetypeVersion.*/-DarchetypeVersion=[replaceable]#$1# \\\/g" "articles/guide/start/maven.asciidoc" || exit 1
  
  #https://github.com/vaadin/docs/blob/v14/articles/guide/upgrading/v10-13/index.asciidoc
  sed -i "s/vaadin.version>.*/vaadin.version>$1<\/vaadin.version>/g" "articles/guide/upgrading/v10-13/index.asciidoc" || exit 1
  
  #https://github.com/vaadin/docs/blob/v14/articles/tools/mpr/configuration/mpr-cdi-tutorial.asciidoc
  sed -i "s/version>14.*/version>$1<\/version>/g" "articles/tools/mpr/configuration/mpr-cdi-tutorial.asciidoc" || exit 1
  
  #https://github.com/vaadin/docs/blob/v14/articles/tools/mpr/introduction/step-1-maven-v7.asciidoc
  sed -i "s/version>14.*/version>$1<\/version>/g" "articles/tools/mpr/introduction/step-1-maven-v7.asciidoc" || exit 1

  #https://github.com/vaadin/docs/blob/v14/articles/tools/mpr/introduction/step-1-maven-v8.asciidoc 
  sed -i "s/version>14.*/version>$1<\/version>/g" "articles/tools/mpr/introduction/step-1-maven-v8.asciidoc" || exit 1
}
 
# update versions in latest branch
updateLatestBranch() {
  #https://github.com/vaadin/docs/blob/latest/articles/ds/customization/custom-theme-packaging.asciidoc
  sed -i "s/vaadin.version>.*/vaadin.version>$1<\/vaadin.version>/g" "articles/ds/customization/custom-theme-packaging.asciidoc" || exit 1
}

# return the major numbers of a version
getMajorVersion() {
  echo $1 | tr - . | cut -d . -f1;
}

# get platform version
version=$1
currentMajorRelease=$2
major=`getMajorVersion $1`
[[ $version =~ (alpha|beta|rc) ]] && prerelease=true || prerelease=false

if [ !$prerelease ] && [ "$major" = 14 ]
then
  echo "Updating files in the V14 branch"
  `updateV14Branch $version`
fi

echo $currentMajorRelease
echo $major

if [ !$prerelease ] && [ $major = $currentMajorRelease ]
then
  echo "updating files in the Latest branch"
  `updateLatestBranch $version`
fi
