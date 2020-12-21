# Vaadin 14 documentation

Documentation and code examples for Vaadin 14 (LTS).

## Contents

Files not explicitly listed below are from the standard Vaadin project setup.

### `articles`
A hierarchy of AsciiDoc (either `.asciidoc` or `.adoc`) files, documenting the use of all Vaadin features. The file path defines the resulting URL on the documentation site.

For example:
- `articles/intro/index.asciidoc` → `/intro/`
- `articles/forms/data-binding.asciidoc` → `/forms/data-binding/`

See [Authoring articles](https://github.com/vaadin/docs/wiki/Authoring-articles) to learn how to write documentation articles.

<!-- ### `frontend`
Fusion/TypeScript examples, which are included as rendered examples in the documentation. Follow Vaadin best practices when creating code examples.

### `src`
Flow/Java examples, which are included as rendered examples in the documentation. Follow Vaadin best practices when creating code examples. -->

### `scripts`
Project related scripts (tests, validation builds, preview deployment, etc).

### `.github`
Files related to linting the articles against the writing style guidelines with [Vale](https://docs.errata.ai/vale/about). See [Vale linter setup instructions](https://github.com/vaadin/docs/wiki/Writing-style-guide-checks).
