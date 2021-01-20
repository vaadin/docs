#!/usr/bin/python

import re
import sys
import os
from fnmatch import fnmatch

# This is for mass-replacing xrefs to files
# Does not handle path, only the filename

def readAsciidocFiles(root):
    contents = {}
    for path, subdirs, files in os.walk(root):
        for file in files:
            if file.endswith(".asciidoc"):
                fullname = path+"/"+file
                # print fullname
                with open(fullname, "r") as fin:
                    fileContent = fin.read()
                contents[fullname] = fileContent
    print len(contents)
    return contents

def findInAsciidocFiles(contents, string):
    matchingFiles = []
    for file in contents.keys():
        if contents[file].find(string) != -1:
            matchingFiles.append(file)
    return matchingFiles

def renameXrefs(oldname, newname):
    matchingFiles = findInAsciidocFiles(adocFileContents, oldname + "#")

    for file in matchingFiles:
        content = adocFileContents[file]
        replaced = content.replace(oldname+"#", newname+"#")
        with open(file, "w") as fout:
            fout.write(replaced)

def replaceInFiles(listfile):
    with open(listfile, "r") as fin:
        renamings = fin.readlines()
    renamings = map(lambda a: a[:-1], renamings)

    for line in renamings:
        oldname, newname = line.split(" ")
        oldref = oldname[oldname.rfind("/")+1:oldname.rfind(".")]
        newref = newname[newname.rfind("/")+1:newname.rfind(".")]
        # print oldref, newref

        renameXrefs(oldref, newref)

# Read the contents of all Asciidoc files
adocFileContents = readAsciidocFiles("articles")

replaceInFiles(sys.argv[1])
