package com.vaadin.demo.component.basiclayouts;

import com.vaadin.demo.DemoExporter; // hidden-source-line
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.router.Route;

@Route("basic-layouts/vertical-layout")
public class BasicLayoutsVerticalLayout extends Div {
    public BasicLayoutsVerticalLayout() {
        // tag::snippet[]
        VerticalLayout layout = new VerticalLayout();

        Div item1 = new Div("Item 1");
        item1.setClassName("layout-item");

        Div item2 = new Div("Item 2");
        item2.setClassName("layout-item");

        Div item3 = new Div("Item 3");
        item3.setClassName("layout-item");

        layout.add(item1, item2, item3);
        // end::snippet[]

        this.setClassName("basic-layouts-example");

        this.add(layout);
    }

    public static class Exporter extends // hidden-source-line
            DemoExporter<BasicLayoutsVerticalLayout> { // hidden-source-line
    } // hidden-source-line
}
