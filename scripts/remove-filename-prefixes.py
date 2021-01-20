#!/usr/bin/python

# This is a very crude script to find broken xrefs.
# Usage: <script name> <directory to search>

import re
import sys
import os
from fnmatch import fnmatch

pattern = "*.asciidoc"

def findMostCommonPrefix(strings):
    prefixes = {}

    # Find counts for different prefixes
    for s in strings:
        pos = 0
        while pos != -1:
            pos = s.find("-", pos)
            if pos != -1:
                pos += 1
                prefix = s[:pos]
                if prefix in prefixes:
                    prefixes[prefix] += 1
                else:
                    prefixes[prefix] = 1

    # Find the most common prefixes
    commonest = []
    longestLength = 0
    longestPrefix = None
    mostPrefixes = 0
    for prefix in prefixes.keys():
        if prefixes[prefix] > mostPrefixes:
            longestLength = len(prefix)
            longestPrefix = prefix
            commonest = [prefix]
            mostPrefixes = prefixes[prefix]
        elif len(prefix) == longestLength and prefix != longestPrefix:
            commonest.append(prefix)

    #print commonest
    if len(commonest) > 0 and \
        (prefixes[commonest[0]] >= len(strings)/2 and prefixes[commonest[0]] > 1):
        return commonest[0]
    else:
        return None

def renameRecursively(roots):
    allfiles = []
    with open("renamed-files.lst", "w") as namesout:
        for root in roots:
            for path, subdirs, files in os.walk(root):
                if os.path.exists(path + "/index.asciidoc"):
                    prefix = findMostCommonPrefix(files)

                    if prefix:
                        for file in files:
                            if file.startswith(prefix):
                                renamed = file.replace(prefix, "")
                                cmd = "git mv %s/%s %s/%s" % (path, file, path, renamed)
                                print cmd
                                namesout.write("%s/%s %s/%s\n" % (path, file, path, renamed))
                                os.system(cmd)
    return allfiles

# Renaming all except
renameRecursively(["articles/flow", "articles/fusion", "articles/guide",
                   "articles/ce", "articles/designer", "articles/testbench",
                   "articles/theming", "articles/ds"])
