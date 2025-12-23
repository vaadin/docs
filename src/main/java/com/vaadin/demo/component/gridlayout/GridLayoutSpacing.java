package com.vaadin.demo.component.gridlayout;

import com.vaadin.demo.DemoExporter; // hidden-source-line
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.orderedlayout.GridLayout;
import com.vaadin.flow.component.orderedlayout.GridLayoutVariant;
import com.vaadin.flow.router.Route;

@Route("grid-layout-spacing")
public class GridLayoutSpacing extends Div {

    public GridLayoutSpacing() {
        // tag::snippet[]
        GridLayout layout = new GridLayout();
        layout.setColumns(3);
        layout.addThemeVariants(GridLayoutVariant.LUMO_SPACING);

        for (int i = 1; i <= 6; i++) {
            Div item = new Div("Item " + i);
            item.setClassName("example-item");
            layout.add(item);
        }
        // end::snippet[]

        layout.addThemeVariants(GridLayoutVariant.LUMO_PADDING); // hidden-source-line
        this.setClassName("basic-layouts-example");
        this.add(layout);
    }

    public static class Exporter extends // hidden-source-line
            DemoExporter<GridLayoutSpacing> { // hidden-source-line
    } // hidden-source-line
}
