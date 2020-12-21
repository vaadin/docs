# Vaadin documentation

Official documentation and code examples for Vaadin.

> **NOTICE**
>
> This repository is work-in-progress, and will eventually replace the existing separate documentation repositories for the different parts of the Vaadin platform.

## Branches

All official documentation version branches (listed below) can and should contain documentation for pre-release features once they are available in a Vaadin pre-release. Remember to indicate new features with a “since version” indicator in Asciidoc, for example, `[role="since:com.vaadin:vaadin@V18"]`.

### `master`

Documentation for the latest major Vaadin version, including all previous major versions since the latest LTS version. If in doubt, make documentation updates against this branch.

### `v14`

Documentation Vaadin 14, the latest long-term supported version (LTS).

## Contents

Files not explicitly listed below are from the standard Vaadin project setup.

### `articles`

A hierarchy of AsciiDoc (either `.asciidoc` or `.adoc`) files, documenting the use of all Vaadin features. The file path defines the resulting URL on the documentation site.

For example:

- `articles/intro/index.asciidoc` → `/intro/`
- `articles/forms/data-binding.asciidoc` → `/forms/data-binding/`

See [Authoring articles](https://github.com/vaadin/docs/wiki/Authoring-articles) to learn how to write documentation articles.

### `frontend`

Fusion/TypeScript examples, which are included as rendered examples in the documentation. Follow Vaadin best practices when creating code examples.

### `src`

Flow/Java examples, which are included as rendered examples in the documentation. Follow Vaadin best practices when creating code examples.

### `scripts`

Project related scripts (tests, validation builds, preview deployment, etc).

### `.github`

Files related to linting the articles against the writing style guidelines with [Vale](https://docs.errata.ai/vale/about). See [Vale linter setup instructions](<https://github.com/vaadin/docs/wiki/Writing-style-guide-checks>).

### `versions.json`

Describes the publicly available documentation versions. These versions will appear in the published website, as options for the users. This file is only relevant in the `master` branch.
