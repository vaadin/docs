#!/bin/bash
# --------------------------------------
# Usage: $0 \
#          "System prompt here" \
#          "User prompt here" \
#          file1.txt file2.adoc ...
# --------------------------------------

set -euo pipefail

if [ "$#" -lt 3 ]; then
  echo "Usage: $0 \"System prompt\" \"User prompt\" file1 [file2 ...]" >&2
  exit 1
fi

# Extract prompts, and collect the rest as files
system_prompt="$1"
user_prompt="$2"
shift 2
files=( "$@" )

# Validate files exist
for f in "${files[@]}"; do
  if [ ! -f "$f" ]; then
    echo "Error: file not found: $f" >&2
    exit 1
  fi
done

# Build the array of {type:"text",text:...} for each file, then the user prompt
# Use jq -Rs to JSON-escape each file’s contents
file_blocks="[]"
# start with an empty JSON array

for f in "${files[@]}"; do
  # create one block for this file
  json_block=$(jq -Rs --arg fn "$f" '{type:"text",filename:$fn,text:.}' "$f")

  # append it to the existing array
  file_blocks=$(jq -n \
    --argjson blocks "$file_blocks" \
    --argjson block  "$json_block" \
    '$blocks + [$block]'
  )
done

# finally, add the user prompt as one more block
user_block=$(jq -Rn --arg txt "$user_prompt" '{type:"text",text:$txt}')
file_blocks=$(jq -n \
  --argjson blocks "$file_blocks" \
  --argjson block  "$user_block" \
  '$blocks + [$block]'
)


# Assemble the full payload
payload=$(jq -n \
  --arg model "gpt-4o" \
  --arg sp "$system_prompt" \
  --argjson content "$file_blocks" \
  '{model:$model,
    messages:[
      {role:"system", content: $sp},
      {role:"user",   content: $content}
    ]
  }'
)

echo "Payload:" >&2
echo "$payload" >&2

# Fire the request
curl -s https://api.openai.com/v1/chat/completions \
  -H "Authorization: Bearer $OPENAI_API_KEY" \
  -H "Content-Type: application/json" \
  --data "$payload"
