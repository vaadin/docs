# Versions & Lifecycle

The documentation on `main` describes the next Vaadin version, and readers of a
released version see the branch for it. Pages therefore say which version a
feature appeared in with a badge, not in prose, and keep working links when
they move.

## Version References

Avoid explicit Vaadin version numbers in text. Instead, use a `since` badge. The badge attaches to a
section heading or to a phrase in body text, and it is written differently in each case.

**Section headings (`==`, `===`, …): use the role attribute.** Put `[role="since:..."]` on its own
line directly above the heading. This is the preferred form for section headings — keep them
consistent rather than mixing both styles.

```asciidoc
// Correct — section heading:
[role="since:com.vaadin:vaadin@V25.2"]
== Hierarchical Data

// The heading text can still carry other badges:
[role="since:com.vaadin:vaadin@V25.2"]
== Focus Selected Item [badge-flow]#Flow#
```

**Top-level heading (`=`) and body text: use a formatted span.** The role attribute is not allowed on
the page title (`=`), so there — and when wrapping a phrase in running text — write the badge as an
inline role **immediately followed (no space) by a formatted text span** that holds the text the badge
applies to. This is usually `#...#`, but any inline formatting works (e.g. `*...*`). Without a
following span the badge shows up as literal `[since:...]` brackets or is dropped entirely.

```asciidoc
// Correct — page title (top-level heading):
= [since:com.vaadin:vaadin@V25.1]#Slider#

// Correct — wrapping a phrase in body text:
The component can also [since:com.vaadin:vaadin@V25.2]#do the sanitization itself#.
```

```asciidoc
// WRONG — badge after the heading text, with no span (renders literal brackets):
== Hierarchical Data [since:com.vaadin:vaadin@V25.2]

// WRONG — bare inline badge alone on its own line; use the quoted role attribute instead:
[since:com.vaadin:vaadin@V25.2]
```

This keeps documentation version-agnostic and maintainable.

The upgrading pages (`articles/upgrading/`) are the exception: they are about
specific versions, and Vale's version rule is disabled for them.

When a page needs the current version of Vaadin or of a dependency, use the
attributes in `articles/_vaadin-version.adoc` (`{vaadin-version}`,
`{spring-boot-version}`, …). Most of them are derived from `pom.xml` by
`scripts/sync-versions.mjs`; do not edit those by hand.

## Feature Flags

Every feature flag that Flow and Flow Components declare is listed on
`articles/flow/configuration/feature-flags.adoc`, under Experimental, Legacy or
Hilla feature flags, with a one-line description. The Check Feature Flags
workflow fails when a flag is missing from the page or when the page lists a
flag that no longer exists.

A page documenting a feature behind a flag names the flag, shows the line to
add to `src/main/resources/vaadin-featureflags.properties`, and links to the
feature flags page. When the flag is removed because the feature became
stable, remove that part of the page and the entry on the feature flags page in
the same change.

## Commercial Features

Pages about a commercial component or tool include the commercial banner right
after the page title, with the product named in the `commercial-feature`
attribute:

```asciidoc
:commercial-feature: Grid Pro
include::{articles}/_commercial-banner.adoc[opts=optional]
```

## Moving or Removing Pages

A page's URL is its path under `articles/` without the extension and without a trailing `/index`. When a change moves or removes a page, add a redirect from the old URL to `redirects` in `dspublisher/config/default.json`, pointing at the page that replaces it. Write both paths without the path prefix, and keep the entries sorted by source path. The Check Redirects workflow fails a pull request that leaves an old URL without one; run `npm run check-redirects` to check locally against `origin/main`.

Update the cross references that point at the old page as well, rather than
relying on the redirect.

## Hilla with Lit

The `articles/hilla/lit` sub-tree documents Hilla with Lit, which is deprecated and is removed in Vaadin 26. Every page in it carries the deprecation banner in its front matter (`banner`, `banner-id: hilla-lit-deprecated`, `banner-style: caution`), so any page added there needs one too. The banner goes in front matter rather than on the page title because a shared page's title sits inside the content tag, where a badge would render on the React page as well. Index pages are served without a trailing slash, so their banner link needs one level less than a sibling page's.

Content that is shared between the Lit and React versions of a page lives in `articles/hilla/_shared` as underscore-prefixed partials, which both pages include, so that removing `articles/hilla/lit` does not break the React pages. A partial keeps the directory depth of the page it was extracted from, so `{root}{root-fix}` includes and page-relative xrefs resolve identically from both wrappers. Nothing outside `articles/hilla/lit` may include it, and every link into it has to go when the tree does. There are two: the one from a partial to the Lit-only Web Component field strategy page, guarded with `ifdef::hilla-lit[]` so it disappears with the tree, and the note in `articles/hilla/guides/event-handling.adoc` pointing React readers at the Lit binding syntax, which has to be removed with it.

Pages whose content does not depend on the frontend framework exist only in the main section; the Lit section does not repeat them, and its section index pages link to them instead. A shared partial that links to such a page uses an absolute `{articles}/hilla/...` xref, so the link resolves to the main page from both wrappers. When a topic is otherwise framework-independent but has a few Lit-specific details, the main page carries them as short notes instead of a separate Lit page. The reference documentation is entirely in the main section; `articles/hilla/lit` has no reference pages.
