# Code Examples

Examples are either compiled source files that a page includes, or inline code
blocks written in the page. The syntax of rendered examples and their options is
documented in [Design System Publisher](../articles/contributing/docs/dspublisher/ui-examples.adoc).

## File Locations

- **Java examples**: `src/main/java/com/vaadin/demo/`
- **TypeScript examples**: `frontend/demo/`

Component examples live in a package or directory named after the component:
`src/main/java/com/vaadin/demo/component/button/ButtonBasic.java`,
`frontend/demo/component/button/button-basic.ts` for Lit and
`frontend/demo/component/button/react/button-basic.tsx` for React.

## Choosing Between Source Files and Inline Code

**Use compilable source files** (included via `include::{root}/`) when:
- Code needs to be rendered as a **live, interactive demo** (uses `render` attribute)
- Same example should be shown in **multiple frameworks** (Flow/Lit/React variants)
- Code is **complex or long** (typically 30+ lines) and benefits from compilation testing
- It's a **reusable reference implementation** for a component feature
- Writing **component documentation** (articles/components/)

**Use inline code** when:
- Showing **design patterns or architectural concepts** rather than specific features
- Snippets are **short and illustrative** (typically under 30 lines)
- Examples are **configuration** (properties, XML, CSS, annotations)
- Writing **how-to guides or deep dives** where the focus is education, not live demos
- Code is **pseudo-code or conceptual** - showing intent, not a complete implementation
- Multiple **small variations** are easier to compare side-by-side inline

## Snippet Tags

Use tags to mark extractable code sections:

```java
// tag::snippet[]
Button button = new Button("Click me");
button.addClickListener(e -> Notification.show("Clicked!"));
// end::snippet[]
```

In Lit templates, the tags are HTML comments: `<!-- tag::snippet[] -->`.

## Hidden Lines

Hide boilerplate code that clutters the documentation:

```java
public class Example extends Div {
    public Example() {
        Button button = new Button("Click me"); // hidden-source-line
        add(button);
    }
}
```

Lines with `// hidden-source-line` are not displayed in documentation but are compiled.

## DemoExporter Pattern

For rendered examples, include an inner exporter class:

```java
public class ButtonExample extends Div {
    public ButtonExample() {
        // Example code here
    }

    public static class Exporter extends DemoExporter<ButtonExample> {} // hidden-source-line
}
```

React examples end with `export default reactExample(Example); // hidden-source-line`.

## Including Code in Documentation

Use the `include` directive with the `{root}` attribute for absolute paths:

```asciidoc
[source,java]
----
include::{root}/src/main/java/com/vaadin/demo/component/button/ButtonBasic.java[render,tags=snippet,indent=0]
----
```

Common include options:
- `render` - Renders a live demo
- `tags=snippet` - Includes only tagged sections
- `indent=0` - Removes indentation
- `group=Flow` / `group=Lit` / `group=React` - The tab the variant is shown in

When an example has several framework variants, wrap them in one
`[.example]` block and guard each with `ifdef::flow[]`, `ifdef::lit[]` or
`ifdef::react[]`, as the existing component pages do. Match the block
attributes (`themes="lumo,aura"`, `.show-code`, …) of the examples around it.

## What Makes a Good Example

Keep the snippet to the point the surrounding text makes. Setup that the reader
does not need to see goes outside the snippet tags or behind
`hidden-source-line`.

Use the API a reader should use today: the built-in feature rather than a
hand-rolled one (for example the clipboard support instead of custom
JavaScript), signals where the framework offers them, and the current
replacement of a deprecated method. Check the method in the Flow or Flow
Components source; an example is copied into applications as it is.

When a page shows the same example in several frameworks, every variant does
the same thing and looks the same, in both the light and the dark theme. A Flow
variant of a Charts example, for example, uses styled mode like the client-side
ones.

Explain non-obvious arguments in the example itself. A call such as
`new HierarchicalQuery<>(null, null)` needs a comment saying which `null` is the
filter and which is the parent.

Java examples follow the Vaadin Java conventions; run `mvn spotless:apply`
before committing. TypeScript examples follow ESLint (`npm run lint`) and
Prettier.
