#!/bin/bash
# Safe version: scalable for huge PR diffs
set -euo pipefail

if [ "$#" -lt 3 ]; then
  echo "Usage: $0 \"System prompt\" \"User prompt\" file1 [file2 ...]" >&2
  exit 1
fi

system_prompt="$1"
user_prompt="$2"
shift 2
files=( "$@" )

# Validate files
for f in "${files[@]}"; do
  if [ ! -f "$f" ]; then
    echo "Error: file not found: $f" >&2
    exit 1
  fi
done

# ---- Temp files for safe JSON construction
TMP_DIR=$(mktemp -d)
FILE_BLOCKS="$TMP_DIR/blocks.json"

# Start empty array
echo "[]" > "$FILE_BLOCKS"

# ---- Append each file safely
for f in "${files[@]}"; do
  jq -Rs --arg fn "$f" \
    '{type:"text", filename:$fn, text:.}' \
    "$f" > "$TMP_DIR/block.json"

  # Append to array
  jq \
    --slurpfile new "$TMP_DIR/block.json" \
    '. + $new' \
    "$FILE_BLOCKS" > "$TMP_DIR/tmp.json"

  mv "$TMP_DIR/tmp.json" "$FILE_BLOCKS"
done

# ---- Append user prompt block
jq -n --arg txt "$user_prompt" \
  '{type:"text", text:$txt}' > "$TMP_DIR/user.json"

jq \
  --slurpfile new "$TMP_DIR/user.json" \
  '. + $new' \
  "$FILE_BLOCKS" > "$TMP_DIR/tmp.json"

mv "$TMP_DIR/tmp.json" "$FILE_BLOCKS"

# ---- Build final payload file
PAYLOAD="$TMP_DIR/payload.json"

jq -n \
  --arg model "gpt-4o" \
  --arg sp "$system_prompt" \
  --slurpfile blocks "$FILE_BLOCKS" \
  '{
     model: $model,
     messages: [
       { role:"system", content:$sp },
       { role:"user",   content:$blocks[0] }
     ]
   }' > "$PAYLOAD"

echo "Payload:" >&2
cat "$PAYLOAD" >&2

# ---- Send request (streaming friendly)
curl -s https://api.openai.com/v1/chat/completions \
  -H "Authorization: Bearer $OPENAI_API_KEY" \
  -H "Content-Type: application/json" \
  --data @"$PAYLOAD"

# Cleanup
rm -rf "$TMP_DIR"
