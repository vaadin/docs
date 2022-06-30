#!/bin/bash

directory="../articles"

add_uuid_at_end_of_file() {
  fname=$1
  echo "Adding UUID to $fname"
  printf  "\n\n[.discussion-id]\n" >> $fname

  #This is one way to generate a UUID in Windows. There are easier ways if you're on Linux.
  uuid=$(powershell -Command "[guid]::NewGuid().ToString()")
  echo ${uuid^^} >> $fname
  printf  "\n" >> $fname
}

find $directory -type f -regex ".*.\(adoc\|asciidoc\)" | while read fname; do
  if [[ "$fname" == *"index"* || "$fname" = *"/_"* ]]; then
    continue
  fi

  line=$(head -n 1 $fname)
  if [ $line != "---" ]; then
    echo "$fname doesn't start with ---"
  fi
  
  add_uuid_at_end_of_file $fname
done
