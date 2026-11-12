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
`articles/flow` is the Reference Guide, the reference documentation of the
framework for both Flow views and React views.

Search for the topic before adding a page or a section. When it is already
covered, extend that page or link to it instead of explaining it again.

Keep a reference page complete on its own. Only the overview page of a
reference section, its `index.adoc`, links into Building Apps, to point to the
guides for the area. No other reference page does, not even for a worked
example. Add a missing detail to the reference instead, or link to the
reference section that covers it. A component's `index.adoc` is the component
page, not a section overview, so it does not link into Building Apps either.

Link to the section that holds the answer, with its anchor, rather than to a
page that only links on again.

## Page Structure

Title a page or a section after what the reader gets from it, not after the
class that implements it: "Security Configuration", not
`VaadinSecurityConfigurer`.

Keep the `index.adoc` of a section to a short introduction of the area and a
list of its topics. Put setup instructions on a page of their own. Put
configuration that applies to one kind of application, such as a Spring or a
plain servlet application, in the section for that kind. A component's
`index.adoc` is the component page, not a section overview: it documents the
component's features, as `guidelines/component-pages.md` describes.

Show the common path on a getting-started or setup page: the standard entry
points and the defaults. Give optional and advanced APIs sections of their own,
and document the basic utilities that the setup needs on the setup page itself.

See `guidelines/information-architecture.md` and `guidelines/writing.md`.

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

Update the cross references to the old page in the same change. When you move,
split or rename a section, update the path, the anchor and the label of every
cross reference to it. A heading without an explicit `[[id]]` takes its anchor
from its text.

## Writing

Run Vale on every page you change. Fix the errors and warnings that it reports
on the lines you add or change, unless the finding is a false positive. The
pull request check reports only these lines. A line that you move within a page
or to another page counts as added. The lines of a page that you only rename
do not. Leave findings on other lines for a separate change.

When a sentence that you add or change is too long, split it. Give an aside or
an example its own sentence. When a list of three or more items makes the
sentence long, turn it into a bulleted list. Keep every fact. A local run of
Vale reports long sentences as suggestions.

Use the term that means exactly one thing: "UI component" rather than
"component" when other kinds of component could be meant, and "Vaadin views"
rather than "Flow and React views" when a statement holds for both.

Write "React views" and "browser-callable services" rather than "Hilla", the
former name of that part of Vaadin. Keep the name where it is part of an
identifier, such as `hilla-spring-boot-starter` or the `@vaadin/hilla-*`
packages.

Verify every statement about behavior against the code or by running it.
Document the API as it is in the released code, with the exact class and
method names.

Keep each section to the question its heading asks. Leave out details the
reader does not need for that task.

Do not end the items of a bulleted or numbered list with a semicolon. Turn a
list whose items each start with inline code, such as class or method names
with a short description, into a table.

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

A pull request to a release branch is labeled `target/main` automatically, so
that the bot also cherry-picks it to `main`. Remove the label when the change
applies only to that release.

When a change also applies to the latest stable release — the version the
published documentation shows by default — add that release's
`target/v<version>` label to the pull request (for example `target/v25.3`). This
covers fixes and changes to features the release already has; leave the label
off for features that are new in a later version. A bot then cherry-picks the
merged change to the `v<version>` branch, and labels the pull request
`need to pick manually v<version>` when the cherry-pick does not apply cleanly.
Do not add labels for older releases.

Write the commit subject and the pull request title as `<type>: <summary>`,
starting with an imperative verb and under 72 characters. Use `docs` for
documentation changes, and `feat`, `fix`, `chore` or `ci` for the publisher
theme, the build, the scripts and the workflows.

Keep a pull request to one concern. A fix to a neighboring page, a restyle of
old content, or an unrelated example goes in a pull request of its own. See
[Creating Pull Requests](articles/contributing/pr.adoc).
