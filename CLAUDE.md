# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code and documentation in this repository.

## Overview

This is the Vaadin Documentation repository. It contains documentation for all Vaadin products, both open source and commercial.

## Directories

* articles/ - the actual documentation, written in AsciiDoc.
* src/ - compilable Java source code examples that can be referred to from the documentation articles.
* dspublisher/ - Vaadin's Design System Publisher which is used to publish the documentation

## Development Workflow
```bash
# Clean 
npm run dspublisher:clean

# Start the documentation server on http://localhost:8000
npm run dspublisher:start

# Build the documentation for production
npm run dspublisher:build
```

## Documentation Sections

### articles/getting-started

This is the Getting Started section of the documentation. It consists of articles that help new users set up their development environments and offers tutorials that teach new users the basics of Vaadin. After completing the tutorals, users should know enough to start reading and utilizing the Building Apps guides.

### articles/building-apps

This is the Building Apps section of the documentation. It consists of action-oriented, hands-on, opinionated guides that show the reader how to achieve a specific goal while building a business application. Rather than covering every possible aspect of a topic, the guides focus on the essentials and the most common use cases. They also highlight potential pitfalls and offer practical tips to avoid them. When applicable, the Building Apps guides should include code snippets at the top that can be copy-pasted into a project as-is.

It may also contain deep dive articles that take a broader and more conceptual approach to building business applications. Unlike the structured how-to guides, these articles explore the reasoning behind certain practices, provide in-depth knowledge, and offer insights, opinions, and alternative approaches.

### articles/flow

This is the Vaadin Reference section of the documentation. It contains the reference documentation for Vaadin Framework. Articles in this section describe which features Vaadin has, what they do, and how to use them on an API level. The articles are technical, code centric, to-the-point, and unopinionated. They form the basis on which the Building Apps articles are written.

This directory used to contain the full Vaadin framework documentation, including tutorials and how-to guides. You can therefore find old articles that do not fit the criteria of a reference article. These articles should be edited and split into corresponding Building Apps guides and reference articles.

### articles/hilla

This directory contains the documentation for the Hilla framework. It has been discontinued as a standalone product and relevant features are being merged into Vaadin framework. Relevant parts of the documentation in this directory should be migrated to /articles/flow.

### articles/components

This directory contains the documentation for the Vaadin components. Every component has its own section that explains the component's capabilities, how to use it, and how to style it.

### articles/styling

This directory contains documenation about styling Vaadin applications on a more general level.

### articles/tools

This directory contains the documentation for the official Vaadin tools.

