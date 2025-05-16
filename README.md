# Vaadin documentation

Official documentation and code examples for Vaadin.

This repository does not generate the [vaadin.com/docs](https://vaadin.com/docs) website. It only contains the content for them. The builds are done using [Vaadin Design System Publisher](https://vaadin.com/design-system-publisher).

If you have a Vaadin subscription that includes a license to use Design System Publisher, you can run the local development build with the following command:

```sh
npm run dspublisher:start
```

## Contents

Files not explicitly listed below are from the standard Vaadin project setup.

### `articles`

A hierarchy of AsciiDoc files (`.adoc`), documenting the use of all Vaadin features. The file path defines the resulting URL on the documentation site.

For example:

- `articles/flow/index.adoc` → `/flow/`
- `articles/flow/forms/data-binding.adoc` → `/flow/forms/data-binding/`

See the [contribution guides](https://vaadin.com/docs/contributing/docs) to learn more.

### `frontend`

TypeScript examples, which are included as rendered examples in the documentation. Follow Vaadin best practices when creating code examples.

### `src`

Flow/Java examples, which are included as rendered examples in the documentation. Follow Vaadin best practices when creating code examples.

### `scripts`

Project-related scripts (tests, validation builds, preview deployment, etc).

### `.github`

Files related to linting the articles against the writing style guidelines with [Vale](https://docs.errata.ai/vale/about). See [Vale linter setup instructions](https://vaadin.com/docs/latest/contributing-docs/authoring/editing-tools/#vale).

### `versions.json`

Describes the publicly available documentation versions. These versions will appear in the published website, as options for the users. This file is only relevant in the `latest` branch.
