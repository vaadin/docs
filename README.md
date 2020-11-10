# Vaadin documentation

> **NOTICE**
>
> This repository is currently work-in-progress, and will eventually replace the existing separate documentation repositories for the different parts of the Vaadin platform.

Documentation and code examples for Vaadin. Files not explicitly listed below are from the standard Vaadin project setup.

### `articles`
A hierarchy of AsciiDoc (either `.asciidoc` or `.adoc`) files, documenting the use of all Vaadin features.

### `frontend`
Fusion/TypeScript examples, which are included as rendered examples in the documentation.

### `src`
Flow/Java examples, which are included as rendered examples in the documentation.

### `scripts`
Project related scripts (tests, validation builds, preview deployment, etc).


## Content requirements

In order to work with the documentation site generator, the content has certain requirements.

### Articles

All files and folders inside the `articles` folder need to satisfy the following requirements:

#### Folders need an index
Folders need to contain an `index.asciidoc` or `index.adoc` file, which defines the title and optional order of the section

#### Articles need visible content
AsciiDoc files need to have at least some content, for example a heading in order for them to become visible in the documentation

#### Front matter
AsciiDoc files need to have front matter defining the `title` attribute. The `title` attribute defines the text which is shown in the navigation (including breadcrumb). The `order` attribute is optional, but recommended.

#### Example:
```
---
title: Article Title
order: 10
---

= Article Title
```


### Code examples

Follow Vaadin best practices when creating code examples in the `src` and `frontend` folders.


## Section and article ordering

The `order` front matter attribute defines in which order the article/section is shown in the navigation.

Articles/sections without order are shown after ordered ones, in alphabetical order based on the title (or file/folder name if not specified).

### Section ordering

With sections (aka folders), the `order` property in the index file inside the section defines the order of the section in relation to its sibling sections.

For example, with the following, “Folder B” will be shown before “Folder A” in the navigation:

`articles/folder-a/index.asciidoc`
```
---
title: Folder A
order: 20
---
```
`articles/folder-b/index.asciidoc`
```
---
title: Folder B
order: 10
---
```

## URL mapping

The file path defines the resulting URL on the documentation site.

For example:
- `articles/intro/index.asciidoc` → `/intro/`
- `articles/forms/data-binding.asciidoc` → `/forms/data-binding/`
