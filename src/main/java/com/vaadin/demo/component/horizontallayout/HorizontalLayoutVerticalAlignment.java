package com.vaadin.demo.component.horizontallayout;

import com.vaadin.demo.DemoExporter; // hidden-source-line
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.orderedlayout.FlexComponent;
import com.vaadin.flow.component.orderedlayout.HorizontalLayout;
import com.vaadin.flow.router.Route;

@Route("horizontal-layout-vertical-alignment")
public class HorizontalLayoutVerticalAlignment extends Div {

    public HorizontalLayoutVerticalAlignment() {
        // tag::layout[]
        HorizontalLayout layout = new HorizontalLayout();
        layout.setPadding(true);
        layout.setAlignItems(FlexComponent.Alignment.CENTER);

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
            DemoExporter<HorizontalLayoutVerticalAlignment> { // hidden-source-line
    } // hidden-source-line
}
