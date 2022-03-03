# Hilla documentation

Official documentation and code examples for Hilla.

### `articles`

A hierarchy of AsciiDoc (either `.asciidoc` or `.adoc`) files, documenting the use of all Hilla features. The file path defines the resulting URL on the documentation site.

For example:

- `articles/intro/index.asciidoc` → `/intro/`
- `articles/forms/data-binding.asciidoc` → `/forms/data-binding/`

### `frontend`

TypeScript/client-side code examples (views, components, etc), which are included in the documentation. Follow Hilla best practices when creating code examples.

### `src`

Java/server-side code examples (Endpoints, etc), which are included in the documentation. Follow Hilla best practices when creating code examples.

### `scripts`

Project related scripts (tests, validation builds, preview deployment, etc).

### `.github`

Files related to linting the articles against the writing style guidelines with [Vale](https://docs.errata.ai/vale/about). See [Vale linter setup instructions](https://vaadin.com/docs/latest/contributing-docs/editing-tools/#vale).
