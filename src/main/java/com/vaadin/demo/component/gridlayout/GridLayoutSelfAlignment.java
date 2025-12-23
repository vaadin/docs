package com.vaadin.demo.component.gridlayout;

import com.vaadin.demo.DemoExporter; // hidden-source-line
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.orderedlayout.GridLayout;
import com.vaadin.flow.component.orderedlayout.GridLayout.SelfAlignment;
import com.vaadin.flow.component.orderedlayout.GridLayoutVariant;
import com.vaadin.flow.router.Route;

@Route("grid-layout-self-alignment")
public class GridLayoutSelfAlignment extends Div {

    public GridLayoutSelfAlignment() {
        // tag::snippet[]
        GridLayout layout = new GridLayout();
        layout.setColumns(3);
        layout.addThemeVariants(GridLayoutVariant.LUMO_SPACING,
                GridLayoutVariant.LUMO_PADDING);

        Div start = new Div("Start");
        start.setClassName("example-item");
        layout.add(start);
        layout.setJustifySelf(SelfAlignment.START, start);

        Div center = new Div("Center");
        center.setClassName("example-item");
        layout.add(center);
        layout.setJustifySelf(SelfAlignment.CENTER, center);

        Div end = new Div("End");
        end.setClassName("example-item");
        layout.add(end);
        layout.setJustifySelf(SelfAlignment.END, end);
        // end::snippet[]

        this.setClassName("basic-layouts-example");
        this.add(layout);
    }

    public static class Exporter extends // hidden-source-line
            DemoExporter<GridLayoutSelfAlignment> { // hidden-source-line
    } // hidden-source-line
}
