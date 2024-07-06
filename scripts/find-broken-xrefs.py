#!/usr/bin/python

# This is a very crude script to find broken xrefs.
# Usage: <script name> <directory to search>

import re
import sys
import os
from fnmatch import fnmatch

root = sys.argv[1]
pattern = "*.asciidoc"

def findFiles(root):
    allfiles = []
    for path, subdirs, files in os.walk(root):
        for name in files:
            if fnmatch(name, pattern):
                filename = os.path.join(path, name)
                allfiles.append(filename)
    return allfiles


def inspectFile(filename):
    with open(filename) as fin:
        content = fin.read()

    xrefre = re.compile(r"<<([^#,>]+)#([^,>]*),([^>]+)>>")
    xrefs = xrefre.findall(content)

    path = filename[0:filename.rfind("/")]
    fileHasErrors = False

    for xref in xrefs:
        (target, anchor, caption) = xref
        if target.find("{articles}") != -1:
            trueTarget = target.replace("{articles}", "articles/")
        else:
            trueTarget = path + "/" + target
        trueTarget = trueTarget

        if not os.path.exists(trueTarget + ".asciidoc") and \
            not os.path.exists(trueTarget + "/index.asciidoc"):
            if not fileHasErrors:
                print "--------------\nFile has errors: %s" % (filename)
                fileHasErrors = True
            else:
                print
            print ("INVALID XREF: <<%s#%s,%s>>" % (target,anchor,caption))
            print "File does not exist: %s" % (trueTarget)

    
files = findFiles(root)
for filename in files:
    inspectFile(filename)
