# Information Architecture

Where a piece of content goes decides who finds it and what tone it takes.
Decide the section and the type of documentation before writing.

## Types of Documentation

The documentation has three types. Each serves a distinct purpose; do not mix
them on one page. The full description is in
[Types of Documentation](../articles/contributing/docs/types.adoc).

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

Hilla framework documentation (discontinued). Relevant content should be migrated to articles/flow as features merge into Vaadin. The rules for the deprecated `articles/hilla/lit` sub-tree are in [Versions & Lifecycle](versions-and-lifecycle.md#hilla-with-lit).

### articles/components

Component documentation covering capabilities, usage, and styling for each Vaadin component. See [Component Pages](component-pages.md).

### articles/styling

General styling guidance for Vaadin applications.

### articles/tools

Documentation for official Vaadin tools.

### articles/contributing

How to contribute to Vaadin projects, including the documentation style guide.

## One Topic, One Page

Before adding a page or a section, search `articles/` for the topic. When it is
already covered, extend that page or link to it with a cross reference instead
of explaining it a second time. Two explanations of the same thing drift apart,
and the reader cannot tell which one is current.

A how-to guide links to the reference page for the details of an API instead of
copying them, and a reference page links to the guide that shows the API in
use.

Put a topic on the page a reader would look for it on. A change that only fits
awkwardly under an existing heading is a sign that it belongs on another page,
or on a page of its own (for example a component's `recipes.adoc`).

## Moving Content Between Sections

Migrating legacy how-to content from `articles/flow` to Building Apps, or Hilla
content to `articles/flow`, moves pages. Every moved page needs a redirect from
its old URL — see [Versions & Lifecycle](versions-and-lifecycle.md#moving-or-removing-pages).
