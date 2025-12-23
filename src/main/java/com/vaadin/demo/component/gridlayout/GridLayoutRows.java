package com.vaadin.demo.component.gridlayout;

import com.vaadin.demo.DemoExporter; // hidden-source-line
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.orderedlayout.GridLayout;
import com.vaadin.flow.component.orderedlayout.GridLayoutVariant;
import com.vaadin.flow.router.Route;

@Route("grid-layout-rows")
public class GridLayoutRows extends Div {

    public GridLayoutRows() {
        // tag::snippet[]
        GridLayout layout = new GridLayout();
        layout.setColumns(1);
        // Three rows: auto header, flexible content, auto footer
        layout.setRows("auto 1fr auto");
        layout.addThemeVariants(GridLayoutVariant.LUMO_SPACING,
                GridLayoutVariant.LUMO_PADDING);

        Div header = new Div("Header (auto height)");
        header.setClassName("example-item");

        Div content = new Div("Content (flexible height)");
        content.setClassName("example-item");

        Div footer = new Div("Footer (auto height)");
        footer.setClassName("example-item");

        layout.add(header, content, footer);
        // end::snippet[]

        layout.setHeight("300px");
        this.setClassName("basic-layouts-example");
        this.add(layout);
    }

    public static class Exporter extends // hidden-source-line
            DemoExporter<GridLayoutRows> { // hidden-source-line
    } // hidden-source-line
}
