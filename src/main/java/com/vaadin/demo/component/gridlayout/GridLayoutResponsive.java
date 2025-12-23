package com.vaadin.demo.component.gridlayout;

import com.vaadin.demo.DemoExporter; // hidden-source-line
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.orderedlayout.GridLayout;
import com.vaadin.flow.component.orderedlayout.GridLayoutVariant;
import com.vaadin.flow.router.Route;

@Route("grid-layout-responsive")
public class GridLayoutResponsive extends Div {

    public GridLayoutResponsive() {
        // tag::snippet[]
        GridLayout layout = new GridLayout();
        // Creates responsive columns that are at least 150px wide
        // and automatically wrap to new rows
        layout.setColumns("repeat(auto-fill, minmax(150px, 1fr))");
        layout.addThemeVariants(GridLayoutVariant.LUMO_SPACING,
                GridLayoutVariant.LUMO_PADDING);

        for (int i = 1; i <= 8; i++) {
            Div item = new Div("Item " + i);
            item.setClassName("example-item");
            layout.add(item);
        }
        // end::snippet[]

        layout.setWidthFull();
        this.setClassName("basic-layouts-example");
        this.add(layout);
    }

    public static class Exporter extends // hidden-source-line
            DemoExporter<GridLayoutResponsive> { // hidden-source-line
    } // hidden-source-line
}
