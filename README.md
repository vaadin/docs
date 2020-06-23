# Vaadin documentation

Documentation and code examples for all Vaadin features.

This repo is a regular Vaadin application project with additional AsciiDoc articles.

## Content

- `articles/` – A hierarchy of AsciiDoc files, documenting the use of all Vaadin features

- `frontend/` – TypeScript examples

- `src/` – Java examples


## Content requirements

### Articles

All files and folders need to satisfy the following requirements in order for the [documentation site](https://github.com/vaadin/docs-app) to build properly.

- **Folders need an index** – All folders needs to contain an `index.asciidoc` file.

- **All files need some visible content** – All `.asciidoc` file needs to have at least some content, for example a title.

- **Front matter** – All `.asciidoc` file needs to have front matter defining the `title` and `order` attributes.

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

### Code examples

You should follow Vaadin best practices when creating code examples in the `src` and `frontend` folders.

## Article file names map to URLs

The article path defines the resulting URL on the documentation site.

For example:
- `articles/intro/index.asciidoc` → `/intro/`
- `articles/forms/data-binding.asciidoc` → `/forms/data-binding/`


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
   mvn spring-boot:run
   ```


## Migrating existing documentation content

Run the following script to migrate existing documentation content from separate repos to this repo, restructure them and add missing metadata.

> Before running the script, you need to [create a personal access token](https://help.github.com/en/github/authenticating-to-github/creating-a-personal-access-token-for-the-command-line) in GitHub (with `repo` access) and pass it as a command line argument to the script. It is needed to be able to access private repositories (assuming you have access to all of the documentation repos).

```
cd scripts
node migrate-docs.js [personal-github-access-token]
```

Namely, the following documentation repos are migrated:

- `flow-and-components-documentation/documentation` → `articles/flow`
- `flow-and-components-documentation/documentation-themes` → `articles/themes`
- `designer-internal/designer-documentation` → `articles/designer`
- `testbench/documentation` → `articles/testbench`
- `multiplatform-runtime-internal/mpr-documentation/documentation` → `articles/mpr`
- `business-app-starter-flow-docs` → `articles/business-app`
- `bakery-app-starter-flow-docs` → `articles/bakeryflow`
- `vaadin-charts-flow/documentation` → `articles/design-system/components/charts`
