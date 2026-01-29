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

### Choosing Between Source Files and Inline Code

**Use compilable source files** (included via `include::{root}/`) when:
- Code needs to be rendered as a **live, interactive demo** (uses `render` attribute)
- Same example should be shown in **multiple frameworks** (Flow/Lit/React variants)
- Code is **complex or long** (typically 30+ lines) and benefits from compilation testing
- It's a **reusable reference implementation** for a component feature
- Writing **component documentation** (articles/components/)

**Use inline code** when:
- Showing **design patterns or architectural concepts** rather than specific features
- Snippets are **short and illustrative** (typically under 30 lines)
- Examples are **configuration** (properties, XML, CSS, annotations)
- Writing **how-to guides or deep dives** where the focus is education, not live demos
- Code is **pseudo-code or conceptual** - showing intent, not a complete implementation
- Multiple **small variations** are easier to compare side-by-side inline

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

Environment setup and tutorials for new users. After completing these, users should be ready for the Building Apps guides.

### articles/building-apps

Action-oriented, opinionated how-to guides for building business applications. Focus on essentials, common use cases, pitfalls, and practical tips. Include copy-paste ready code snippets at the top when applicable.

Also contains deep dive articles that explore concepts, reasoning behind practices, and alternative approaches.

### articles/flow

Vaadin Framework reference documentation. Technical, code-centric, unopinionated API documentation describing features and usage. Forms the foundation for Building Apps articles.

**Note:** Legacy content exists here from when this contained all framework docs. Old tutorials and how-to content should be migrated to Building Apps.

### articles/hilla

Hilla framework documentation (discontinued). Relevant content should be migrated to articles/flow as features merge into Vaadin.

### articles/components

Component documentation covering capabilities, usage, and styling for each Vaadin component.

### articles/styling

General styling guidance for Vaadin applications.

### articles/tools

Documentation for official Vaadin tools.
