package com.vaadin.demo.component.gridlayout;

import com.vaadin.demo.DemoExporter; // hidden-source-line
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.orderedlayout.GridLayout;
import com.vaadin.flow.component.orderedlayout.GridLayout.AutoFlow;
import com.vaadin.flow.component.orderedlayout.GridLayoutVariant;
import com.vaadin.flow.router.Route;

@Route("grid-layout-auto-flow")
public class GridLayoutAutoFlow extends Div {

    public GridLayoutAutoFlow() {
        // tag::snippet[]
        GridLayout layout = new GridLayout();
        layout.setColumns(3);
        layout.setRows(3);
        layout.addThemeVariants(GridLayoutVariant.LUMO_SPACING,
                GridLayoutVariant.LUMO_PADDING);

        // Items flow by column instead of row
        layout.setAutoFlow(AutoFlow.COLUMN);

        for (int i = 1; i <= 6; i++) {
            Div item = new Div("Item " + i);
            item.setClassName("example-item");
            layout.add(item);
        }
        // end::snippet[]

        this.setClassName("basic-layouts-example");
        this.add(layout);
    }

    public static class Exporter extends // hidden-source-line
            DemoExporter<GridLayoutAutoFlow> { // hidden-source-line
    } // hidden-source-line
}
