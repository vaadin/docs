# Component Pages

Each component has a directory under `articles/components/` named after it
(`button/`, `text-field/`, …). The pages there are reference documentation:
neutral, factual and complete, with examples in every framework the component
supports.

## Files

| File                                     | Contents                                                                    |
| ---------------------------------------- | --------------------------------------------------------------------------- |
| `index.adoc`                             | The component's features, with a rendered example for each.                 |
| `styling.adoc`                           | Style variants, style properties and CSS selectors.                         |
| `<topic>.adoc`                           | A large feature area of its own, such as Grid's `selection.adoc`.           |
| `recipes.adoc`                           | Solutions for specific use cases that combine features, such as on `dialog` and `tree-grid`. |
| `<name>.png`                             | The component's image for the components overview.                          |

Split a feature area into a page of its own only when `index.adoc` gets too
long to navigate; most components have only `index.adoc` and `styling.adoc`.

## index.adoc

- The front matter has `page-links` to the TypeScript and Java API and source,
  with versions written as `{moduleNpmVersion:…}` and `{moduleMavenVersion:…}`
  attributes. Copy them from a sibling component.
- The opening paragraph sits between `// tag::description[]` and
  `// end::description[]`. The components overview includes it, so it has to
  read well on its own.
- Each feature is a section with a short explanation and a rendered example.
- Common sections, where they apply: Validation, Accessibility,
  Internationalization (i18n), Best Practices, and Related Components last.

## Shared Partials

Features that several components share are written once, in partials under
`articles/components/`, and included with tags:

- `_input-field-common-features.adoc` — label, helper, placeholder, tooltip,
  clear button, prefix and suffix, ARIA labels, read-only and disabled, and
  the validation constraints of input fields.
- `_styling-section-intros.adoc` and `_styling-section-theming-props.adoc` —
  the standard introductions on `styling.adoc` pages.
- `_shared.adoc` and `_shared-code-snippets.adoc` — other text and code used
  on several pages.

Include the tagged section you need
(`include::{articles}/components/_input-field-common-features.adoc[tags=label;helper]`)
instead of writing the text again. Change a partial when the change applies to
every component that includes it; otherwise write the text on the component's
own page.

## styling.adoc

Theme variants are listed in a table with the variant name, what it is for, and
which themes support it (Aura, Lumo). When a variant is new, add it to the
table with a `since` badge around the variant name
(``|[since:com.vaadin:vaadin@V25.4]#`label-aside`#``) rather than writing a
section for it.

## Documenting a New Component Feature

A feature added in Flow Components or the web components usually needs:

- a section on the component's page, with a `since` badge,
- a rendered example in each framework variant the page already shows,
- the API names exactly as they are in the released code,
- an entry in the feature flags page when the feature is behind a flag — see
  [Versions & Lifecycle](versions-and-lifecycle.md#feature-flags).
