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

The Reference Guide: reference documentation of the Vaadin framework, for both Flow views and React views. Technical, code-centric, unopinionated API documentation describing features and usage. Forms the foundation for Building Apps articles.

**Note:** Legacy content exists here from when this contained all framework docs. Old tutorials and how-to content should be migrated to Building Apps.

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
copying them.

Put a topic on the page a reader would look for it on. A change that only fits
awkwardly under an existing heading is a sign that it belongs on another page,
or on a page of its own (for example a component's `recipes.adoc`).

Link to the section that holds the answer, with its anchor. A link to a page
that only links on again, or to a long page without an anchor, leaves the
reader to search for it.

## The Reference Stands on Its Own

The guides build on the reference, not the other way around. A reference page
covers its whole topic. When it lacks a detail, add the detail to the
reference. When another reference page already covers it, link to that section.

Links from the reference into Building Apps belong on the overview page of a
section, its `index.adoc`, and nowhere else. There, a sentence points to the
guides for the area, for example "For task-oriented guides, see Building Apps >
Security". No other reference page links into Building Apps: not for more
details, not for a worked example, and not for a concept. A link on a single
page is where a guide starts to replace the reference. Once the link exists,
"see the guide" is the cheapest way to fill a gap in the page.

A component's `index.adoc` is the component page, not the overview of a
section, so it follows the rule for the other pages.

The rule is easy to check: a link to `building-apps/` on a reference page other
than the `index.adoc` of a section is a finding.

## Structuring a Section

### Overview Pages

The `index.adoc` of a section gives a short introduction to the area — what it
covers and what Vaadin provides for it — and lists the topics of the section.
Long setup instructions do not belong there. Move them to a page of their own
in the section, such as `setup.adoc`, and list that page with the other topics.
A topic that is already covered elsewhere becomes an entry in the list, not a
section of the overview page. In the reference, the overview page is also the
one place that points to the Building Apps guides for the area. A component's
`index.adoc` is not an overview page in this sense: it is the component page,
and documents the component's features, as described in
[Component Pages](component-pages.md). It still does not link into Building
Apps.

Some features are configured differently for different kinds of applications,
such as Spring applications and plain servlet applications. Give each kind its
own section, and put its configuration there rather than on a page shared by
both. Write each of these sections for its own readers. A section on plain
servlet applications does not mention Spring or point Spring users to another
page: they look in the Spring section to begin with.

### Getting-Started and Setup Pages

A getting-started or setup page shows the common path: the standard entry
points and the defaults that most applications use. A browserless test on such
a page extends the `BrowserlessTest` base class, for example, rather than
creating its own application and UI contexts.

Leave optional APIs, such as the `Locators` interface, and advanced variants,
such as a custom application context, to sections of their own. The setup page
can link to them at the end. It does not send the reader to an advanced page
for a basic utility that every reader of the setup needs. Document that utility
on the setup page.

## Moving Content Between Sections

Migrating legacy how-to content from `articles/flow` to Building Apps moves
pages. Every moved page needs a redirect from its old URL — see [Versions & Lifecycle](versions-and-lifecycle.md#moving-or-removing-pages).

Moving, splitting or renaming a section can break the cross references to it,
and no pull request check reports a cross reference whose anchor no longer
exists. A heading without an explicit `[[id]]` gets its anchor from its text,
and renaming the heading changes the anchor. After such a change, search
`articles/` for the old anchor and the old heading text, and update every cross
reference that pointed at them:

- the path, when the section moved to another page
- the anchor after `#`, when the heading changed
- the label, which often repeats the old heading

Check that the target section still covers what the link promises. A link
whose label names something the section no longer explains is as broken as one
whose anchor no longer exists.
