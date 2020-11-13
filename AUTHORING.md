# Authoring articles

Articles are written in AsciiDoc. See the [AsciiDoc User Manual](https://asciidoctor.org/docs/user-manual/#basic-document-anatomy) for a comprehensive guide how to format content.

Articles need to define front matter, and some visible content (like a heading) in order for them to become visible in the documentation.

In the front matter:

- The `title` attribute defines the text which is shown in the navigation (including breadcrumb). If not defined, the file name is used as a fallback.
- The `order` attribute defines the order of the article in relation to other articles within the same section

Example:
```
---
title: Article Title
order: 10
---

= Article Title

...
```

## Creating sections

Use folders to create sections and a hierarchy of articles. Folders should contain an `index.asciidoc` or `index.adoc` file, which defines the title and optional order of the section using front matter.

## Article and section order

The `order` front matter attribute defines in which order the article/section is shown in the navigation.

Articles/sections without order are shown after ordered ones, in alphabetical order based on the title (or file/folder name if not specified).

### Section order

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
