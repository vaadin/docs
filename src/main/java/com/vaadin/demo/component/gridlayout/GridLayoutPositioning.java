package com.vaadin.demo.component.gridlayout;

import com.vaadin.demo.DemoExporter; // hidden-source-line
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.orderedlayout.GridLayout;
import com.vaadin.flow.component.orderedlayout.GridLayoutVariant;
import com.vaadin.flow.component.orderedlayout.GridPosition;
import com.vaadin.flow.router.Route;

@Route("grid-layout-positioning")
public class GridLayoutPositioning extends Div {

    public GridLayoutPositioning() {
        // tag::snippet[]
        GridLayout layout = new GridLayout();
        layout.setColumns(3);
        layout.setRows(2);
        layout.addThemeVariants(GridLayoutVariant.LUMO_SPACING,
                GridLayoutVariant.LUMO_PADDING);

        // Place items at specific positions (1-based indexing)
        Div item1 = new Div("Row 1, Col 1");
        item1.setClassName("example-item");
        layout.add(item1);
        layout.setPosition(item1, GridPosition.at(1, 1));

        Div item2 = new Div("Row 1, Col 3");
        item2.setClassName("example-item");
        layout.add(item2);
        layout.setPosition(item2, GridPosition.at(3, 1));

        Div item3 = new Div("Row 2, Col 2");
        item3.setClassName("example-item");
        layout.add(item3);
        layout.setPosition(item3, GridPosition.at(2, 2));
        // end::snippet[]

        this.setClassName("basic-layouts-example");
        this.add(layout);
    }

    public static class Exporter extends // hidden-source-line
            DemoExporter<GridLayoutPositioning> { // hidden-source-line
    } // hidden-source-line
}
