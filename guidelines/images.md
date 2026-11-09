# Images & Diagrams

How to add diagrams and other images to a page so that they look like the rest
of the documentation. The palette and the drawing rules below are taken from the
diagrams in `articles/building-apps` — `architecture/images/request-flow.svg`
and `views/images/mvp.svg` are the reference examples. Older diagrams elsewhere (Montserrat text, the cyan and red of an
earlier Vaadin brand, Mermaid defaults) do not follow these rules; do not copy
their style.

The accessibility rules in the
[Documentation Style Guide](../articles/contributing/docs/styleguide.adoc)
apply to every image: the text carries the information, and the image only
illustrates it.

## When to Add a Diagram

Add a diagram when the reader needs to see how several parts relate — where
they run, which calls which, in what order. Do not add one for a single concept
that a sentence explains.

Keep each diagram to one idea. When a diagram needs more than about ten boxes,
or arrows that cross, split it into two diagrams or leave out the parts that
the surrounding text does not discuss.

## Files

Draw diagrams as hand-written SVG and keep the SVG source next to the PNG that
the page shows, with the same base name, in an `images` directory beside the
page:

```
architecture/
├── runtime-model.adoc
└── images/
    ├── request-flow.svg
    └── request-flow.png
```

Reference the PNG from the page, not the SVG:

```asciidoc
image::images/request-flow.png["A diagram of a click traveling from a button in the browser to its listener on the server, and the resulting changes traveling back"]
```

Start the SVG with a comment that holds the command that regenerates the PNG,
and regenerate the PNG with it after every change to the SVG:

```xml
<svg xmlns="http://www.w3.org/2000/svg" width="2000" height="700" viewBox="0 0 2000 700" font-family="Helvetica Neue, Helvetica, Arial, sans-serif">
  <!-- Source of request-flow.png. After editing, regenerate the PNG from this directory with:
       rsvg-convert -w 2000 request-flow.svg -o request-flow.png -->
```

Write the SVG by hand or clean it up after exporting it from a drawing tool:
plain `rect`, `line`, `path`, `circle` and `text` elements with the colors
written as attributes, no editor metadata, no embedded fonts or bitmaps. A
reviewer must be able to read the diff.

## Size

Draw on a canvas about 2,000 pixels wide, and set the `width`, `height` and
`viewBox` of the SVG to the same size. The page shows the image at roughly half
that width, so a 2,000-pixel PNG stays sharp on high-density screens.

All sizes in the rest of this chapter are in pixels of this canvas. Halve them
to get the size the reader sees.

## Text

- **Font**: `font-family="Helvetica Neue, Helvetica, Arial, sans-serif"` on the
  root `svg` element. Use `Menlo, DejaVu Sans Mono, monospace` only for code,
  such as an annotation or a file name.
- **Sizes**: 30 for the title of a region, 28 for the label of a box, 22–25 for
  a second line in a box or an annotation next to an arrow. Do not go below 22.
- **Color**: `#222222` on light fills, `#FFFFFF` on the saturated blue fill, and
  `#555555` for a second, less important line in a box.
- **Wording**: use the same names as the text of the page, with the same
  capitalization. Mark nothing up — no bold, no italics, no quotation marks.

`rsvg-convert` renders the text with the fonts installed on the machine. When
none of Helvetica Neue, Helvetica and Arial is installed, it falls back to
DejaVu Sans, which is wider and looks different from the other diagrams. Render
the PNG on macOS, or install a font that has the metrics of Arial, such as
Liberation Sans (`fonts-liberation` on Debian and Ubuntu), before rendering.
Check that no label overflows its box after rendering.

## Colors

The colors of a diagram tell the reader *where* a part runs and *which layer* it
belongs to. Use the same color for the same role in every diagram, so that a
reader who moves from one page to the next can rely on them. Pick the role of
each box from the table and use its colors exactly.

| Role                                                                           | Fill      | Stroke    | Text      |
| ------------------------------------------------------------------------------ | --------- | --------- | --------- |
| Browser (region)                                                               | `#E6E6E6` | `#C4C4C4` | `#222222` |
| Server (region)                                                                | `#B3B3B3` | `#7F7F7F` | `#222222` |
| UI layer (region), such as a `VaadinSession`                                   | `#C9E3F6` | `#5BC2F7` | `#222222` |
| UI layer, nested region, such as a `UI` or a view                              | `#A6D3F5` | `#2E9BEA` | `#222222` |
| UI part: a UI component, a view, a listener                                    | `#0D96FF` | `#0057B8` | `#FFFFFF` |
| Framework plumbing between UI parts: the client engine, the React library      | `#AAAAAA` | `#7A7A7A` | `#222222` |
| Detail of a UI part: a method, a field, an interface                           | `#FFFFFF` | `#2E9BEA` | `#222222` |
| Application layer (region)                                                     | `#17B05C` | `#0D6B38` | `#0B2E19` |
| Application part: a service, a repository                                      | `#ADF5C8` | `#5EC98A` | `#222222` |
| External system: a database, another application                               | `#FFFFFF` | `#7F7F7F` | `#222222` |
| Build time (region, dashed)                                                    | `#F5F5F5` | `#C4C4C4` | `#222222` |

The colors encode the layer, not who wrote the code. A view is a UI part
whether the application developer wrote it or Vaadin provides it; a service is
an application part whether it is the application's own or comes from a
library. When a diagram needs to show which parts the reader writes, say so in
the label ("Your Java view") rather than with a separate color.

Do not add a hue for a role that the table already covers. When a diagram
needs a role that the table does not cover, use a neutral gray or white box,
and add the role to this table in the same pull request.

### Peers Without a Layer

Some diagrams show parts that are peers rather than layers, such as packages
that depend on each other or separate microservices. Give each peer its own hue
so that the reader can tell them apart, with a light fill and a saturated
stroke of the same hue:

| Hue    | Fill      | Stroke    |
| ------ | --------- | --------- |
| Blue   | `#BDE3FF` | `#22B4FF` |
| Green  | `#AFF4C6` | `#65BF8C` |
| Purple | `#E4CCFF` | `#D577FF` |
| Yellow | `#FFE8A3` | `#DDBC00` |
| Red    | `#FFC7C2` | `#FF735E` |

Use only as many hues as there are peers. An arrow that starts from a peer can
take the stroke color of that peer.

### Color Is Not the Only Cue

Every color-coded part also needs a label that names it. Do not rely on a
legend or on the reader telling green from red. When the colors carry a meaning
the reader needs, explain it in the text of the page.

## Shapes

- **Boxes**: rectangles with rounded corners. Use a radius of 6 for a part,
  8–10 for a nested region, and 14 for an outer region such as the browser or
  the server.
- **Strokes**: 6 wide for parts and outer regions, 5 for nested regions.
- **Nesting**: draw a part inside the region it belongs to. Leave at least
  30 pixels between a box and the edge of its region, and put the title of the
  region at the top center.
- **Dashed regions**: reserve a dashed stroke (`stroke-dasharray="18 12"`) for
  things that do not exist at runtime, such as the build.
- **Background**: leave the background transparent, or fill it with
  `#FFFFFF`. Do not use any other background color.

## Arrows

- Draw an arrow in the direction of the call or of the data.
- Use `#1E96F0` for traffic inside the UI layer, including between the browser
  and the server, and `#222222` for calls from the UI layer to the application
  layer and onward.
- Use a stroke width of 5, straight lines, and right angles when a line has
  to turn. Use an open chevron as the arrowhead, defined once as a `marker`
  per color.
- Use a double-headed arrow only for a two-way exchange, such as the
  synchronization between the client engine and the server.
- Put an arrow label in 22–25 pixel text next to the middle of the arrow, not
  on top of it.

## Numbered Steps

When a diagram shows a sequence, number the steps with a filled circle
(`r="22"`, fill `#222222`) holding the number in bold white text, size 24.
Place each badge next to the arrow it belongs to. Describe the same steps in a
numbered list in the text, with the same numbers.

## Alt Text

Give every image an alt text that names the parts it shows and how they relate.
Start with "A diagram of" for a diagram. Put the alt text in quotation marks
when it contains a comma. The alt text is not a substitute for explaining the
diagram in the text.

## Screenshots

Screenshots and UI mock-ups are not diagrams, and the colors in this chapter do
not apply to them. Crop a screenshot to the part the text discusses, and give it
an alt text by the same rules as a diagram.

## Before You Commit

- The PNG was regenerated from the SVG with the command in the SVG.
- The text renders in Helvetica Neue, Helvetica, Arial or a font with the same
  metrics, not in DejaVu Sans, and no label overflows its box.
- Every color comes from the tables in this chapter.
- The page explains everything that the diagram shows.
- The page reads well in both the light and the dark theme of the documentation
  site.
