package com.vaadin.demo.component.horizontallayout;

import com.vaadin.demo.DemoExporter; // hidden-source-line
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.orderedlayout.HorizontalLayout;
import com.vaadin.flow.router.Route;

@Route("horizontal-layout-expanding-items")
public class HorizontalLayoutExpandingItems extends Div {

    public HorizontalLayoutExpandingItems() {
        // tag::snippet[]
        Div item1 = new Div("Item 1");
        item1.setClassName("example-item");
        HorizontalLayout layout = new HorizontalLayout();
        layout.setFlexGrow(1, item1);
        // end::snippet[]
        layout.setPadding(true);
        layout.add(item1);

        Div item2 = new Div("Item 2");
        item2.setClassName("example-item");
        layout.add(item2);

        Div item3 = new Div("Item 3");
        item3.setClassName("example-item");
        layout.add(item3);

        this.add(layout);
        this.setClassName("basic-layouts-example");
    }

    public static class Exporter extends // hidden-source-line
            DemoExporter<HorizontalLayoutExpandingItems> { // hidden-source-line
    } // hidden-source-line
}
