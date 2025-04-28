#!/bin/bash
# --------------------------------------
# Usage: $0 <PR_NUMBER> <ORG/REPO_NAME>
#
# OPENAI_API_KEY and GITHUB_TOKEN must be set in the environment.
# --------------------------------------

DIR=$(dirname "$0")

if [[ -z $OPENAI_API_KEY ]]; then
 echo "Please set the OPENAI_API_KEY environment variable." >&2
 exit 1
fi

if [[ -z $GITHUB_TOKEN ]]; then
 echo "Please set the GITHUB_TOKEN environment variable." >&2
 exit 1
fi

if [ -z "$1" ]; then
  echo "Error: PR number must be provided as the first argument" >&2
  echo "Usage: $0 <PR_NUMBER> <ORG/REPO_NAME>" >&2
  exit 1
fi

if [ -z "$2" ]; then
  echo "Error: Repository must be provided as the second argument" >&2
  echo "Usage: $0 <PR_NUMBER> <ORG/REPO_NAME>" >&2
  exit 1
fi

bash $DIR/get-file-diferences.sh $1 $2 >&2

if compgen -G *.new *.old > /dev/null; then
  SYSTEM_PROMPT=$(cat $DIR/system-prompt.txt)
  USER_PROMPT=$(cat $DIR/user-prompt.txt)
  bash $DIR/send-openai-request.sh "$SYSTEM_PROMPT" "$USER_PROMPT" *.old *.new
else
   echo '{"choices":[{"message":{"content":""}}]}'
fi


