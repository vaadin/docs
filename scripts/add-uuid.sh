#!/bin/bash

directory="../articles"

add_uuid_at_end_of_file() {
  fname=$1
  echo "Adding UUID to $fname"

  # UUID generation may differ on other platforms
  uuid=$( uuidgen )
  echo -e "\n\n[discussion-id]\`${uuid}\`\n" >> $fname
}

echo "Processing files in ${directory}"
find $directory -type f \( -name '*.asciidoc' -o -name '*.adoc' \) | while read fname; do
  if [[ "$fname" == *"index"* || "$fname" = *"/_"* ]]; then
    continue
  fi

  line=$(head -n 1 $fname)
  if [ $line != "---" ]; then
    echo "$fname doesn't start with ---"
  fi
  
  add_uuid_at_end_of_file $fname
done
