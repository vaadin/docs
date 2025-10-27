package com.vaadin.demo.component.flexlayout;

import com.vaadin.demo.DemoExporter;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.orderedlayout.FlexLayout;
import com.vaadin.flow.router.Route;

@Route("flex-layout-content-alignment")
public class FlexLayoutItemAlignment extends Div {

    public FlexLayoutItemAlignment() {
        // tag::snippet[]
        FlexLayout layout = new FlexLayout();
        layout.setAlignContent(FlexLayout.ContentAlignment.CENTER);
        // end::snippet[]

        Div item1 = new Div("Item 1");
        item1.setClassName("example-item");

        Div item2 = new Div("Item 2");
        item2.setClassName("example-item");

        Div item3 = new Div("Item 3");
        item3.setClassName("example-item");

        layout.add(item1, item2, item3);

        layout.setWidthFull();
        layout.getStyle().setGap("5px");
        layout.setClassName("height-4xl");

        this.setClassName("basic-layouts-example");
        this.add(layout);
    }

    public static class Exporter extends // hidden-source-line
            DemoExporter<FlexLayoutItemAlignment> { // hidden-source-line
    } // hidden-source-line
}
