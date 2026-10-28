# Repository

This repository holds the content of [vaadin.com/docs](https://vaadin.com/docs)
and the code examples it shows. It does not generate the website itself; that is
done by Vaadin Design System Publisher (dspublisher).

## Layout

| Path                                  | Contents                                                                         |
| ------------------------------------- | -------------------------------------------------------------------------------- |
| `articles/`                           | The documentation pages, written in AsciiDoc.                                     |
| `articles/_vaadin-version.adoc`       | Version attributes (`{vaadin-version}`, `{spring-boot-version}`, …) used in pages. |
| `src/main/java/com/vaadin/demo/`      | Java (Flow) examples that pages include, compiled by `mvn compile`.              |
| `frontend/demo/`                      | TypeScript examples: Lit under `component/<name>/`, React under `component/<name>/react/`. |
| `dspublisher/`                        | Publisher configuration and theme, including `config/default.json` with the redirects. |
| `scripts/`                            | Repository checks and their tests (`*.test.mjs`).                                |
| `.github/styles/`                     | The Vale styles (`Vaadin`) and vocabulary (`config/vocabularies/Docs`).          |
| `.vale.ini`, `.vale-pr.ini`           | Vale configuration for local authoring and for pull requests. Keep the two in sync. |
| `versions.json`                       | The documentation versions offered on the website. Only relevant on `latest`.    |

## Pages and URLs

A page's URL is its path under `articles/` without the extension and without a
trailing `/index`: `articles/flow/forms/data-binding.adoc` is served at
`/flow/forms/data-binding/`. A directory with sub-pages has an `index.adoc`.

A file is rendered as a page when it has a `title` in its front matter. Files
whose name starts with an underscore (`_shared.adoc`, `_styling-section-intros.adoc`,
…) are partials: they have no front matter and are only pulled into other pages
with `include::`.

The order of pages in the navigation comes from the `order` front matter
attribute, not from the file name.

## Branches

`main` holds the documentation for the next unreleased Vaadin version. Released
versions have their own branches (`v24`, `v25.3`, …), and a fix that only
applies to a released version is made there. `latest` is a tag, not a branch;
never target it.

## Checks on a Pull Request

Every pull request runs these workflows. Run the local equivalent before opening
one.

| Workflow            | What it checks                                                                 | Run locally                                   |
| ------------------- | ------------------------------------------------------------------------------ | --------------------------------------------- |
| lint (Vale)         | Writing style of `articles/`, reported as review annotations.                 | `vale articles/path/to/page.adoc`             |
| Maven Compile       | The Java examples compile.                                                    | `mvn compile`                                 |
| Format Check        | The Java examples are formatted with the Vaadin Java conventions.             | `mvn spotless:apply`                          |
| Check Redirects     | A moved or removed page leaves a redirect behind, and every redirect resolves. | `npm run check-redirects`                     |
| Check Versions      | `articles/_vaadin-version.adoc` matches `pom.xml`; fixed automatically on the PR branch. | `npm run sync-versions -- --fix`    |
| Check Feature Flags | Every feature flag in Flow and Flow Components is documented, and no stale ones are. | `node scripts/check-feature-flags.js`  |
| Test                | The tests of the scripts under `scripts/`.                                    | `npm test`                                    |
| Preview Deploy      | Deploys a preview of the site and comments its URL on the pull request.       | `npm run dspublisher:start`                   |

Frontend examples are linted with ESLint (`npm run lint`) and formatted with
Prettier (`.prettierrc`).

## Previewing

`npm run dspublisher:start` serves the site with live reload on
`http://localhost:8000`; it needs a commercial Vaadin subscription. GitHub's own AsciiDoc rendering does not show the
publisher's extensions, so check anything beyond plain text — rendered examples,
tabs, badges, admonitions — in the local preview or the pull request preview.
