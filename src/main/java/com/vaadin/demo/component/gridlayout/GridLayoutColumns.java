package com.vaadin.demo.component.gridlayout;

import com.vaadin.demo.DemoExporter; // hidden-source-line
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.orderedlayout.GridLayout;
import com.vaadin.flow.component.orderedlayout.GridLayoutVariant;
import com.vaadin.flow.router.Route;

@Route("grid-layout-columns")
public class GridLayoutColumns extends Div {

    public GridLayoutColumns() {
        // tag::snippet[]
        GridLayout layout = new GridLayout();
        // Three columns: fixed 100px, flexible center, fixed 100px
        layout.setColumns("100px 1fr 100px");
        layout.addThemeVariants(GridLayoutVariant.LUMO_SPACING,
                GridLayoutVariant.LUMO_PADDING);

        Div left = new Div("100px");
        left.setClassName("example-item");

        Div center = new Div("Flexible");
        center.setClassName("example-item");

        Div right = new Div("100px");
        right.setClassName("example-item");

        layout.add(left, center, right);
        // end::snippet[]

        layout.setWidthFull();
        this.setClassName("basic-layouts-example");
        this.add(layout);
    }

    public static class Exporter extends // hidden-source-line
            DemoExporter<GridLayoutColumns> { // hidden-source-line
    } // hidden-source-line
}
