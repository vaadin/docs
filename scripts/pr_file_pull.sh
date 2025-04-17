#!/bin/bash

# PR info
OWNER="vaadin"
REPO="docs"
PR_NUMBER=4255

# Get changed files in the PR
gh api -H "Authorization: token $GITHUB_TOKEN" \
  repos/$OWNER/$REPO/pulls/$PR_NUMBER/files \
  --paginate \
  -q '.[].filename' |
while read -r file; do
  echo "Processing: $file"

  # URL encode the file path
  encoded_file=$(jq -rn --arg x "$file" '$x|@uri')

  # Get the base and head branch names
  base_ref=$(gh pr view $PR_NUMBER -R $OWNER/$REPO --json baseRefName -q '.baseRefName')
  head_ref=$(gh pr view $PR_NUMBER -R $OWNER/$REPO --json headRefName -q '.headRefName')

  # Get the original content (from base branch)
  gh api -H "Authorization: token $GITHUB_TOKEN" \
    /repos/$OWNER/$REPO/contents/$encoded_file?ref=$base_ref \
    -q '.content' | tr -d '\n' | openssl base64 -d -A > "$(basename "$file").old"

  # Get the new content (from the PR head)
  gh api -H "Authorization: token $GITHUB_TOKEN" \
    /repos/$OWNER/$REPO/contents/$encoded_file?ref=$head_ref \
    -q '.content' | tr -d '\n' | openssl base64 -d -A > "$(basename "$file").new"
done

