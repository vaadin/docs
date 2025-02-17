package com.vaadin.demo.component.verticallayout;

import com.vaadin.demo.DemoExporter; // hidden-source-line
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.router.Route;

@Route("vertical-layout-basic")
public class VerticalLayoutBasic extends Div {
    public VerticalLayoutBasic() {
        // tag::snippet[]
        VerticalLayout layout = new VerticalLayout();

        Div item1 = new Div("Item 1");
        item1.setClassName("example-item");

        Div item2 = new Div("Item 2");
        item2.setClassName("example-item");

        Div item3 = new Div("Item 3");
        item3.setClassName("example-item");

        layout.add(item1, item2, item3);
        // end::snippet[]

        this.setClassName("basic-layouts-example");

        this.add(layout);
    }

    public static class Exporter extends // hidden-source-line
            DemoExporter<VerticalLayoutBasic> { // hidden-source-line
    } // hidden-source-line
}
