#!/bin/bash

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

scripts/pr_file_pull.sh $1 $2 >&2

compgen -G *.new *.old > /dev/null || echo '{"choices":[{"message":{"content":""}}]}' && exit 0

SYSTEM_PROMPT=$(cat scripts/system_prompt.txt)

scripts/multi_file_chat.sh "$SYSPROMPT" "Please provide a short review of the differences between the provided files. *Only* list things that need improvement. Do *not* repeat or review unchanged text. Rate the quality of all the changes on a s
cale from 1 to 10. Write the lowest score out of ten in the last line but do not refer to it as 'lowest score' just 'score'." *.old *.new

