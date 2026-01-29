# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code and documentation in this repository.

## Overview

This is the Vaadin Documentation repository. It contains documentation for all Vaadin products, both open source and commercial.

## Directories

* articles/ - the actual documentation, written in AsciiDoc.
* src/ - compilable Java source code examples that can be referred to from the documentation articles.
* frontend/ - TypeScript/frontend code examples that can be referred to from the documentation articles.
* dspublisher/ - Vaadin's Design System Publisher which is used to publish the documentation

## Development Workflow

```bash
# Clean
npm run dspublisher:clean

# Start the documentation server on http://localhost:8000
npm run dspublisher:start

# Build the documentation for production
npm run dspublisher:build

# Run ESLint on frontend code
npm run lint

# Clean Maven build artifacts
mvn clean
```

## AsciiDoc Front Matter

Each `.adoc` file starts with YAML front matter between `---` delimiters:

```yaml
---
title: Page Title
order: 10
page-title: SEO Title - Vaadin Docs
meta-description: A 150-160 character description for search engines.
---
```

### Required Attributes

- **title**: The page title displayed in navigation and as the main heading

### SEO Attributes

- **page-title**: Browser tab title, 50-60 characters, should include "Vaadin"
- **meta-description**: Search engine description, 150-160 characters

### Optional Attributes

- **description**: Subtitle shown below the title
- **order**: Numeric value controlling the page's position in navigation
- **layout**: Page layout template
- **section-nav**: Navigation behavior (e.g., `badge`)
- **page-links**: Related links shown on the page

## Code Example Patterns

### File Locations

- **Java examples**: `src/main/java/com/vaadin/demo/`
- **TypeScript examples**: `frontend/demo/`

### Snippet Tags

Use tags to mark extractable code sections:

```java
// tag::snippet[]
Button button = new Button("Click me");
button.addClickListener(e -> Notification.show("Clicked!"));
// end::snippet[]
```

### Hidden Lines

Hide boilerplate code that clutters the documentation:

```java
public class Example extends Div {
    public Example() {
        Button button = new Button("Click me"); // hidden-source-line
        add(button);
    }
}
```

Lines with `// hidden-source-line` are not displayed in documentation but are compiled.

### DemoExporter Pattern

For rendered examples, include an inner exporter class:

```java
public class ButtonExample extends Div {
    public ButtonExample() {
        // Example code here
    }

    public static class Exporter extends DemoExporter<ButtonExample> {} // hidden-source-line
}
```

### Including Code in Documentation

Use the `include` directive with the `{root}` attribute for absolute paths:

```asciidoc
[source,java]
----
include::{root}/src/main/java/com/vaadin/demo/component/button/ButtonBasic.java[render,tags=snippet,indent=0]
----
```

Common include options:
- `render` - Renders a live demo
- `tags=snippet` - Includes only tagged sections
- `indent=0` - Removes indentation

## Documentation Types

### How-To Guides (articles/building-apps)

- **Purpose**: Show how to achieve specific goals
- **Tone**: Practical, opinionated, production-ready
- **Focus**: Common use cases, best practices, pitfalls to avoid
- **Code**: Copy-paste ready snippets at the top when applicable

### Reference Manuals (articles/flow, articles/components, articles/tools)

- **Purpose**: Document features, APIs, and capabilities
- **Tone**: Neutral, factual, complete
- **Focus**: What features exist, what they do, how to use them
- **Code**: Technical, API-focused examples

### Deep Dives (articles/building-apps)

- **Purpose**: Explore concepts and reasoning
- **Tone**: Conceptual, insightful, opinionated
- **Focus**: Why certain practices exist, alternative approaches
- **Code**: Illustrative examples supporting concepts

## Writing Style

### General Guidelines

- Use present tense (avoid "will")
- American English spelling (customize, color, behavior)
- Professional, friendly tone
- Title case for headings
- Use Oxford comma in lists (a, b, and c)

### Style Linting

The repository uses Vale for automated style checking. Configuration is in `.vale.ini`.

### Version References

Avoid explicit Vaadin version numbers in text. Instead, use version badges:

```asciidoc
[since:com.vaadin:vaadin@V24]
```

This keeps documentation version-agnostic and maintainable.

## Documentation Sections

### articles/getting-started

This is the Getting Started section of the documentation. It consists of articles that help new users set up their development environments and offers tutorials that teach new users the basics of Vaadin. After completing the tutorials, users should know enough to start reading and utilizing the Building Apps guides.

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

This directory contains documentation about styling Vaadin applications on a more general level.

### articles/tools

This directory contains the documentation for the official Vaadin tools.
