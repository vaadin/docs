package com.vaadin.demo.component.gridlayout;

import com.vaadin.demo.DemoExporter; // hidden-source-line
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.orderedlayout.GridLayout;
import com.vaadin.flow.component.orderedlayout.GridLayoutVariant;
import com.vaadin.flow.component.orderedlayout.GridPosition;
import com.vaadin.flow.router.Route;

@Route("grid-layout-spanning")
public class GridLayoutSpanning extends Div {

    public GridLayoutSpanning() {
        // tag::snippet[]
        GridLayout layout = new GridLayout();
        layout.setColumns(3);
        layout.setRows("auto auto auto");
        layout.addThemeVariants(GridLayoutVariant.LUMO_SPACING,
                GridLayoutVariant.LUMO_PADDING);

        // Header spanning all 3 columns
        Div header = new Div("Header (spans 3 columns)");
        header.setClassName("example-item");
        layout.add(header);
        layout.setPosition(header, GridPosition.spanning(1, 1, 3, 1));

        // Sidebar spanning 2 rows
        Div sidebar = new Div("Sidebar (spans 2 rows)");
        sidebar.setClassName("example-item");
        layout.add(sidebar);
        layout.setPosition(sidebar, GridPosition.spanning(1, 2, 1, 2));

        // Main content
        Div main = new Div("Main");
        main.setClassName("example-item");
        layout.add(main);
        layout.setPosition(main, GridPosition.spanning(2, 2, 2, 1));

        // Footer in bottom right
        Div footer = new Div("Footer");
        footer.setClassName("example-item");
        layout.add(footer);
        layout.setPosition(footer, GridPosition.spanning(2, 3, 2, 1));
        // end::snippet[]

        this.setClassName("basic-layouts-example");
        this.add(layout);
    }

    public static class Exporter extends // hidden-source-line
            DemoExporter<GridLayoutSpanning> { // hidden-source-line
    } // hidden-source-line
}
