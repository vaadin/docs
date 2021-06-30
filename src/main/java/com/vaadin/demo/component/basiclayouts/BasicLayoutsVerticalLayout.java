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
        layout.add(new LayoutItem("Item 1"));
        layout.add(new LayoutItem("Item 2"));
        layout.add(new LayoutItem("Item 3"));
        layout.add(new LayoutItem("Item 4"));
        // end::snippet[]

        this.setClassName("basic-layouts-example");

        this.add(layout);
    }

    public static class Exporter extends DemoExporter<BasicLayoutsVerticalLayout> { // hidden-source-line
    } // hidden-source-line
}
