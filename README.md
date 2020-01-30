# Vaadin documentation

Documentation and code examples for all Vaadin features.

This repo is a regular Vaadin application project with additional AsciiDoc articles.

## Content structure

## `articles/`
A hierarchy of AsciiDoc files, documenting the use of all Vaadin features.

### Content requirements

All files and folders need to satisfy the following requirements in order for the documentation site to build properly.

#### Foldes need an index

Each folder needs to contain an `index.asciidoc` file.

#### Some content

Each `.asciidoc` file needs to have at least some content, for example a title.

#### Front matter

All `.asciidoc` file needs to have front matter defining the `title` and `order` attributes.

For example:

```
---
title: Article Title
order: 10
---

= Article Title
```

The `title` attribute defines the text which is shown in the navigation.

The `order` defines in which order the page/folder is shown in the navigation. The `index.asciidoc` files are processed differently as with them the `order` property defines the order of the parent folder in relation to its sibling folders.

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

### Filenames map to URLs

The folder path defines the URL for the resulting article on the documentation site.

For example:
- `articles/intro/index.asciidoc` → `/intro/`
- `articles/forms/data-binding.asciidoc` → `/forms/data-binding/`

## `src/`
Contains Java examples. Follow Vaadin best practices.

## `frontend/`
Contains TypeScript examples. Follow Vaadin best practices.

## Setup

1. Install required tools:
   - JDK
   - Maven
   - Node (including npm)
1. Clone this repo:
   ```
   git clone https://github.com/vaadin/docs
   ```
1. Start the server. The examples can be accessed at `http://localhost:8080`:
   ```
   cd docs
   mvn jetty:run
   ```
