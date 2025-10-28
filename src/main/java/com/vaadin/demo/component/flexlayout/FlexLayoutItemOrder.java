package com.vaadin.demo.component.flexlayout;

import com.vaadin.demo.DemoExporter;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.orderedlayout.FlexLayout;
import com.vaadin.flow.router.Route;

@Route("flex-layout-item-order")
public class FlexLayoutItemOrder extends Div {

    public FlexLayoutItemOrder() {
        Div item1 = new Div("Item 1");
        item1.setClassName("example-item");

        Div item2 = new Div("Item 2");
        item2.setClassName("example-item");

        Div item3 = new Div("Item 3");
        item3.setClassName("example-item");

        Div item4 = new Div("Item 4");
        item4.setClassName("example-item");

        // tag::snippet[]
        FlexLayout layout = new FlexLayout();
        layout.add(item1, item2, item3, item4);

        layout.setOrder(3, item2);
        layout.setOrder(1, item3);
        // end::snippet[]

        layout.setWidthFull();
        layout.getStyle().setGap("5px");
        layout.setClassName("height-4xl");

        this.setClassName("basic-layouts-example");
        this.add(layout);
    }

    public static class Exporter extends // hidden-source-line
            DemoExporter<FlexLayoutItemOrder> { // hidden-source-line
    } // hidden-source-line
}
