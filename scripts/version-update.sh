#!/bin/bash
set -o pipefail

# Script for updating the Vaadin version documented in the docs branch of the
# current release train.
# Usage:  bash ./scripts/version-update.sh <update-version> <currentLatestReleaseMajor>

# sed usage: sed -i "s/<replacing-string>/<replaced-string>/g" "<file>"
#            use -i to edit files in-place
#            use /g for matching the replacing-string globally
updateLatestBranch() {
  #https://github.com/vaadin/docs/blob/latest/articles/_vaadin-version.adoc
  sed -i "s/vaadin-version\:.*/vaadin-version: $1/g" "articles/_vaadin-version.adoc" || exit 1
}

# return the major numbers of a version
getMajorVersion() {
  echo $1 | tr - . | cut -d . -f1;
}

# get platform version
version=$1
currentMajorRelease=$2
major=`getMajorVersion $1`

# Pre-releases are documented too: the docs for a pre-release describe that
# pre-release, so the version attributes follow it.
if [ "$major" = "$currentMajorRelease" ]
then
  echo "Updating files in the latest branch"
  updateLatestBranch "$version"
fi
