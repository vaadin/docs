# Vaadin documentation

Official documentation and code examples for Vaadin.

This repository does not generate the [vaadin.com/docs](https://vaadin.com/docs) or [hilla.dev/docs](https://hilla.dev/docs) websites. It only contains the content for them. The builds are done using [Vaadin Design System Publisher](https://vaadin.com/design-system-publisher).

The `latest` branch is for Vaadin documentation and selected by default. Select the `hilla` branch if you wish to contribute to Hilla documentation.
As an exception, any contributions to component documentation (including that related to Hilla) should be done to the `latest` branch.

## Contents

Files not explicitly listed below are from the standard Vaadin project setup.

### `articles`

A hierarchy of AsciiDoc (either `.asciidoc` or `.adoc`) files, documenting the use of all Vaadin features. The file path defines the resulting URL on the documentation site.

For example:

- `articles/flow/intro/index.asciidoc` → `/intro/`
- `articles/flow/forms/data-binding.asciidoc` → `/forms/data-binding/`

See the [contribution guides](https://vaadin.com/docs/latest/contributing-docs/overview) to learn how to write documentation articles.

### `frontend`

TypeScript examples, which are included as rendered examples in the documentation. Follow Vaadin best practices when creating code examples.

### `src`

Flow/Java examples, which are included as rendered examples in the documentation. Follow Vaadin best practices when creating code examples.

### `scripts`

Project related scripts (tests, validation builds, preview deployment, etc).

### `.github`

Files related to linting the articles against the writing style guidelines with [Vale](https://docs.errata.ai/vale/about). See [Vale linter setup instructions](https://vaadin.com/docs/latest/contributing-docs/authoring/editing-tools/#vale).

### `versions.json`

Describes the publicly available documentation versions. These versions will appear in the published website, as options for the users. This file is only relevant in the `latest` branch.
