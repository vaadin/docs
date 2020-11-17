# Vaadin documentation

> **NOTICE**
>
> This repository is currently work-in-progress, and will eventually replace the existing separate documentation repositories for the different parts of the Vaadin platform.

Documentation and code examples for Vaadin.

## Contents

Files not explicitly listed below are from the standard Vaadin project setup.

### `articles`
A hierarchy of AsciiDoc (either `.asciidoc` or `.adoc`) files, documenting the use of all Vaadin features. The file path defines the resulting URL on the documentation site.

For example:
- `articles/intro/index.asciidoc` → `/intro/`
- `articles/forms/data-binding.asciidoc` → `/forms/data-binding/`

See [Authoring articles](AUTHORING.md) to learn how to write documentation articles.

### `frontend`
Fusion/TypeScript examples, which are included as rendered examples in the documentation. Follow Vaadin best practices when creating code examples.

### `src`
Flow/Java examples, which are included as rendered examples in the documentation. Follow Vaadin best practices when creating code examples.

### `scripts`
Project related scripts (tests, validation builds, preview deployment, etc).

### `.github`
Files related to linting the articles against the writing style guidelines with [Vale](https://docs.errata.ai/vale/about).

## Writing style guidelines (Vale setup)

To run the writing guideline checks locally, you need to install [Asciidoctor](https://asciidoctor.org/#installation) and [Vale](https://docs.errata.ai/vale/install), and install the Vale plugin/extension for your preferred editor:

- VS Code: [vale-vscode](https://github.com/errata-ai/vale-vscode)
- Atom: [atomic-vale](https://github.com/TimKam/atomic-vale)

In order to run all the same checks as are run for pull request, you need to install all the style libraries locally under `.github/styles` (next to the already existing `Vaadin` and `Vocab` folders):

- The `Google` folder from https://github.com/errata-ai/Google
- The `Microsoft` folder from https://github.com/errata-ai/Microsoft
- The `write-good` folder from https://github.com/errata-ai/write-good

To manually check an article, run `vale path/to/article.asciidoc` in the terminal.

If you need to disable certain checks for a piece of content, you can use the following in AsciiDoc:

```asciidoc
pass:[<!-- vale Vale.Terms = NO -->]
This content will not produce errors or warnings for the Vale.Terms checks.
pass:[<!-- vale Vale.Terms = YES -->]
```
