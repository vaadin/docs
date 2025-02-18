package com.vaadin.demo.component.verticallayout;

import com.vaadin.demo.DemoExporter; // hidden-source-line
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.orderedlayout.FlexComponent;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.router.Route;

@Route("vertical-layout-vertical-alignment")
public class VerticalLayoutVerticalAlignment extends Div {

    public VerticalLayoutVerticalAlignment() {
        // tag::layout[]
        VerticalLayout layout = new VerticalLayout();
        layout.setJustifyContentMode(FlexComponent.JustifyContentMode.CENTER);

        Div item1 = new Div("Item 1");
        item1.setClassName("example-item");

        Div item2 = new Div("Item 2");
        item2.setClassName("example-item");

        Div item3 = new Div("Item 3");
        item3.setClassName("example-item");

        layout.add(item1, item2, item3);
        // end::layout[]

        this.setClassName("basic-layouts-example");
        layout.setClassName("height-4xl");
        this.add(layout);
    }

    public static class Exporter extends // hidden-source-line
            DemoExporter<VerticalLayoutVerticalAlignment> { // hidden-source-line
    } // hidden-source-line
}
