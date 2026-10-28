# Conventions

The canonical list of checkable conventions for this repository. Read it in
full when writing or reviewing documentation. The reasoning behind several of
these rules lives in `guidelines/` — see `guidelines/overview.md`. The writing
style is defined by the published
[Documentation Style Guide](articles/contributing/docs/styleguide.adoc), which
these conventions do not repeat.

## Content Placement

Decide the type of documentation — how-to guide, reference manual or deep
dive — before writing, and do not mix types on one page. See
`guidelines/information-architecture.md` for which section each type belongs
in.

Put new how-to content in `articles/building-apps`, not in `articles/flow`.
`articles/flow` is reference documentation. Put new framework content in
`articles/flow`, not in `articles/hilla`.

Search for the topic before adding a page or a section. When it is already
covered, extend that page or link to it instead of explaining it again.

## Front Matter

Each `.adoc` file starts with YAML front matter between `---` delimiters:

```yaml
---
title: Page Title
order: 10
page-title: SEO Title - Vaadin Docs
meta-description: A 150-160 character description for search engines.
---
```

- **title** (required): the page title displayed in navigation and as the main heading.
- **page-title**: browser tab title, 50-60 characters, should include "Vaadin".
- **meta-description**: search engine description, 150-160 characters, should include "Vaadin".
- **description** (optional): subtitle shown below the title.
- **order** (optional): numeric value controlling the page's position in navigation.
- **layout** (optional): page layout template.
- **section-nav** (optional): navigation behavior (e.g., `badge`).
- **page-links** (optional): related links shown on the page.

Give every new page a `page-title` and a `meta-description`. See
[Page Meta Data](articles/contributing/docs/index.adoc) for how to write them.

## Versions

Do not write Vaadin version numbers in text. Mark new features with a `since`
badge instead: the `[role="since:com.vaadin:vaadin@V25.2"]` attribute above a
section heading, and `[since:com.vaadin:vaadin@V25.2]#…#` with a formatted span
on the page title and in body text. See `guidelines/versions-and-lifecycle.md`
for the exact forms and the common mistakes.

Write the version of Vaadin or of a dependency with the attributes in
`articles/_vaadin-version.adoc`, never as a literal. Do not edit the attributes
that `npm run sync-versions` derives from `pom.xml` by hand.

Do not write facts that change independently of the page — prices,
subscription models, the list of commercial products. Describe the principle
and link to the page that is kept up to date, such as vaadin.com/pricing.

## Moving or Removing Pages

When a change moves or removes a page, add a redirect from the old URL to
`redirects` in `dspublisher/config/default.json`, pointing at the page that
replaces it. Write both paths without the path prefix and keep the entries
sorted by source path. Run `npm run check-redirects`.

Update the cross references to the old page in the same change.

## Writing

Run Vale on every page you change. Fix the errors and warnings it reports —
the pull request check reports those — unless the finding is a false positive.

Use the term that means exactly one thing: "UI component" rather than
"component" when other kinds of component could be meant, and "Vaadin views"
rather than "Flow and React views" when a statement holds for both.

Verify every statement about behavior against the code or by running it.
Document the API as it is in the released code, with the exact class and
method names.

Keep each section to the question its heading asks. Leave out details the
reader does not need for that task.

Describe the product as it is. What changed, and why, belongs in the commit
message and the release notes, not on the page.

## AsciiDoc Markup

Write cross references as `<<path#,label>>`: relative for pages in the same
section, and with the `{articles}` attribute (`<<{articles}/flow/configuration/feature-flags#,feature flags>>`)
for pages elsewhere.

Mark up class, interface, method, annotation and file names with the roles in
the style guide's [Formatting](articles/contributing/docs/styleguide.adoc)
section (`[classname]`, `[methodname]`, `[filename]`, …), and write method names
with empty parentheses: `setEnabled()`.

Use admonitions sparingly — no more than about three on a page, and not right
after a heading.

## Code Examples

Show rendered examples, component examples, and examples with several
framework variants from compiled source files under `src/main/java/com/vaadin/demo/`
and `frontend/demo/`, included with `include::{root}/…[render,tags=snippet,indent=0]`.
Use inline code for short, conceptual or configuration snippets. See
`guidelines/code-examples.md`.

Mark the shown part with `tag::snippet[]` and `end::snippet[]`, and hide the
remaining boilerplate with `// hidden-source-line`. Give each rendered Java
example a nested `Exporter extends DemoExporter<…>` class.

Give every framework variant of an example the same behavior and appearance.
Add a variant for each framework the surrounding examples on the page show.

Use the API an application should use today: the built-in feature instead of a
hand-rolled one, and never a deprecated method when a replacement exists.

Comment arguments whose meaning is not obvious from the call, such as `null`
passed for a filter.

Run `mvn spotless:apply` after changing Java examples and `npm run lint` after
changing TypeScript examples. `mvn compile` must pass.

## Component Pages

Include the shared text from `_input-field-common-features.adoc` and the other
partials under `articles/components/` instead of rewriting it. See
`guidelines/component-pages.md`.

Keep the component's opening paragraph inside the `description` tag, so the
components overview can include it.

List a new theme variant in the variant table on the component's
`styling.adoc`, with a `since` badge around its name.

## Feature Flags

Add every new feature flag of Flow and Flow Components to
`articles/flow/configuration/feature-flags.adoc`, and remove the entry when the
flag is removed. A page documenting a flagged feature names the flag and links
to that page.

## Commit & PR Hygiene

Target `main` unless the change only applies to a released version, in which
case target that version's branch (`v25.3`, …). Never target `latest`; it is a
tag.

Add the `target/v25.3` label to every pull request whose change also applies to
Vaadin 25.3 — a fix, or a change to a feature 25.3 already has. A bot then
cherry-picks the merged change to the `v25.3` branch, and labels the pull
request `need to pick manually v25.3` when the cherry-pick does not apply
cleanly. Leave the label off for features that are new in a later version.

Write the commit subject and the pull request title as `<type>: <summary>`,
starting with an imperative verb and under 72 characters. Use `docs` for
documentation changes, and `feat`, `fix`, `chore` or `ci` for the publisher
theme, the build, the scripts and the workflows.

Keep a pull request to one concern. A fix to a neighboring page, a restyle of
old content, or an unrelated example goes in a pull request of its own. See
[Creating Pull Requests](articles/contributing/pr.adoc).
