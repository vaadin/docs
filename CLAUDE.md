# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code and documentation in this repository.

## Overview

This is the Vaadin Documentation repository. It contains documentation for all Vaadin products, both open source and commercial.

The main branch is `main`. Always target `main` when creating pull requests, unless explicitly told to target another branch. Do not target `latest` — it is a tag, not a branch.

## Directories

* .github/styles/ - Configuration files for Vale, which define the writing style guide and formatting rules for the documentation.
* articles/ - the actual documentation, written in AsciiDoc.
* src/ - compilable Java source code examples that can be referred to from the documentation articles.
* frontend/ - TypeScript/frontend code examples that can be referred to from the documentation articles.
* dspublisher/ - Configuration files for Vaadin Design System Publisher, which is used to build the documentation website.

See `guidelines/repository.md` for the full layout and the checks that run on a pull request.

## Guidelines & Conventions

Always read `CONVENTIONS.md` in full when **writing** or **reviewing** documentation, and before **committing** or **opening a pull request** — it is the canonical list of checkable conventions.

Writing and structural guidelines live in `guidelines/`. Read the chapters mapped in `guidelines/overview.md` selectively for the topics your work touches.

The published contributor guides under `articles/contributing/docs/` — the style guide, the types of documentation, the Vale setup and the word list — stay the source of truth for writing style. The files above refer to them instead of repeating them.

## Development Workflow

```bash
# Clean
npm run dspublisher:clean

# Start the documentation server
npm run dspublisher:start

# Build the documentation for production
npm run dspublisher:build

# Run ESLint on frontend code
npm run lint

# Compile the Java examples
mvn compile

# Format the Java examples, must be run before committing a Java change
mvn spotless:apply

# Check that moved or removed pages have a redirect (compares with origin/main)
npm run check-redirects

# Check that the version attributes match pom.xml
npm run sync-versions

# Run the tests of the scripts under scripts/
npm test

# Clean Maven build artifacts
mvn clean
```
