#!/bin/bash
# --------------------------------------
# Usage: $0 <PR_NUMBER> <ORG/REPO_NAME>
# --------------------------------------

if [ -z "$1" ]; then
  echo "Error: PR number must be provided as the first argument"
  echo "Usage: $0 <PR_NUMBER> <ORG/REPO_NAME>"
  exit 1
fi

if [ -z "$2" ]; then
  echo "Error: Repository name (org/repo) must be provided as the second argument"
  echo "Usage: $0 <PR_NUMBER> <ORG/REPO_NAME>"
  exit 1
fi

PR_NUMBER=$1
REPO=$2

# Get changed files in the PR
gh api -H "Authorization: token $GITHUB_TOKEN" \
  repos/$REPO/pulls/$PR_NUMBER/files \
  --paginate \
  -q '.[].filename' |
while read -r file; do
  if [[ "$file" =~ \.(tsx|adoc|java|js|ts|css|properties)$ ]]; then
    echo "Processing: $file"

    # URL encode the file path
    encoded_file=$(jq -rn --arg x "$file" '$x|@uri')

    # Get the base and head branch names
    base_ref=$(gh pr view $PR_NUMBER -R $REPO --json baseRefName -q '.baseRefName')
    head_ref=$(gh pr view $PR_NUMBER -R $REPO --json headRefName -q '.headRefName')

    # Get the original content (from base branch)
    gh api -H "Authorization: token $GITHUB_TOKEN" \
      /repos/$REPO/contents/$encoded_file?ref=$base_ref \
      -q '.content' | tr -d '\n' | openssl base64 -d -A > "$(basename "$file").old"

    # Get the new content (from the PR head)
    gh api -H "Authorization: token $GITHUB_TOKEN" \
      /repos/$REPO/contents/$encoded_file?ref=$head_ref \
      -q '.content' | tr -d '\n' | openssl base64 -d -A > "$(basename "$file").new"
  else
     echo "Ignoring: $file"
  fi
done

