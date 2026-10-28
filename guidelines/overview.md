# Documentation Guidelines

These guidelines describe how the Vaadin documentation in the `docs`
repository should be structured, written and illustrated with examples.
Chapters can be read selectively for the topics your work touches.

Treat these as guidelines, not hard rules. They are best practices that should
be followed by default, but can be deviated from when a page needs it.

For the canonical list of checkable conventions see [`CONVENTIONS.md`](../CONVENTIONS.md).
For repository-level commands (build, preview, lint) see [`CLAUDE.md`](../CLAUDE.md).

The writing style itself is defined by the published contributor guides, which
remain the source of truth and are not repeated here:

- [Contributing to Documentation](../articles/contributing/docs/index.adoc) — editing locally, page metadata.
- [Documentation Style Guide](../articles/contributing/docs/styleguide.adoc) — voice and tone, audience, punctuation, capitalization, product names, formatting.
- [Types of Documentation](../articles/contributing/docs/types.adoc) — how-to guides, reference manuals, deep dives.
- [Word List](../articles/contributing/docs/word-list.adoc) — spelling and usage of individual terms.
- [Vale](../articles/contributing/docs/vale.adoc) — the style linter and how to run it.
- [Design System Publisher](../articles/contributing/docs/dspublisher/editing.adoc) — the AsciiDoc extensions, front matter and example syntax.
- [Creating Pull Requests](../articles/contributing/pr.adoc) — describing and separating changes.

## Chapters

| Chapter                                                   | Topic                                                                       |
| --------------------------------------------------------- | --------------------------------------------------------------------------- |
| [Repository](repository.md)                               | Layout, how files map to URLs, branches, and the checks a pull request runs. |
| [Information Architecture](information-architecture.md)   | The documentation sections, the types of documentation, where content goes. |
| [Writing](writing.md)                                     | What reviewers ask for beyond the style guide: precision, staleness, scope. |
| [Code Examples](code-examples.md)                         | Compiled versus inline examples, snippet tags, hidden lines, rendering.      |
| [Component Pages](component-pages.md)                     | The structure of a page under `articles/components`.                        |
| [Versions & Lifecycle](versions-and-lifecycle.md)         | `since` badges, feature flags, moving and removing pages, Hilla with Lit.    |
