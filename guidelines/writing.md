# Writing

The [Documentation Style Guide](../articles/contributing/docs/styleguide.adoc)
and the [Word List](../articles/contributing/docs/word-list.adoc) define the
writing style, and Vale checks much of it automatically. This chapter
summarizes the essentials and adds what reviewers keep asking for that no
linter can check.

## General Guidelines

- Use present tense (avoid "will")
- American English spelling (customize, color, behavior)
- Professional, friendly tone
- Title case for headings
- Use Oxford comma in lists (a, b, and c)

Run Vale on the pages you change before opening a pull request. The local
configuration in `.vale.ini` reports suggestions too; the pull request runs
`.vale-pr.ini`. See [Vale](../articles/contributing/docs/vale.adoc) for the
setup.

## Be Precise

Use the term that means exactly one thing. "Component" can mean a UI component,
a Spring component or a Java component; say "UI component" when that is what
is meant. Say "Vaadin views" rather than "Flow and React views" when the
statement holds for both.

Do not use something that reads like an identifier — a Maven artifact ID, a
class name — as a plain word in prose. `vaadin-platform` looks like an artifact
ID to a reader, even when the text means "the Vaadin platform".

State what is true, not what is usually true. When a statement has exceptions
or limitations, name them, or narrow the statement until it holds. A sentence
that a careful reader can find a counterexample to is a bug.

Verify behavior against the code before documenting it. Read the Flow, Flow
Components or Hilla source, or run the example, rather than describing what an
API is expected to do.

## Avoid Content That Goes Stale

Do not write facts into a page that change independently of it:

- Vaadin version numbers — use a `since` badge, see [Versions & Lifecycle](versions-and-lifecycle.md).
- Prices, subscription models and the list of commercial products — describe the general principle and link to [vaadin.com/pricing](https://vaadin.com/pricing).
- Versions of third-party dependencies — use the attributes in `articles/_vaadin-version.adoc` (`{spring-boot-version}`, …), which are kept in sync with `pom.xml`.
- Lists that enumerate everything of a kind when the reader only needs the rule that covers them.

## Stay on Topic

Each section answers the question its heading asks. Leave out what the reader
does not need for that task, even when it is true and interesting: an example
that shows how to reveal matching items in a filtered tree does not also explain
what the method does with root items.

Do not point out what something is not, or what a reader does not need to do,
unless readers commonly get it wrong.

Write for the reader of the documentation, not for the reviewer of the change.
Describe the feature as it is today; what changed, and why, belongs in the
commit message and the release notes.
