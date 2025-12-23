package com.vaadin.demo.component.gridlayout;

import com.vaadin.demo.DemoExporter; // hidden-source-line
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.orderedlayout.GridLayout;
import com.vaadin.flow.component.orderedlayout.GridLayoutVariant;
import com.vaadin.flow.router.Route;

@Route("grid-layout-padding")
public class GridLayoutPadding extends Div {

    public GridLayoutPadding() {
        // tag::snippet[]
        GridLayout layout = new GridLayout();
        layout.setColumns(3);
        layout.addThemeVariants(GridLayoutVariant.LUMO_PADDING,
                GridLayoutVariant.LUMO_SPACING);

        for (int i = 1; i <= 6; i++) {
            Div item = new Div("Item " + i);
            item.setClassName("example-item");
            layout.add(item);
        }
        // end::snippet[]

        layout.getStyle().set("border", "1px dashed var(--lumo-contrast-30pct)");
        this.setClassName("basic-layouts-example");
        this.add(layout);
    }

    public static class Exporter extends // hidden-source-line
            DemoExporter<GridLayoutPadding> { // hidden-source-line
    } // hidden-source-line
}
