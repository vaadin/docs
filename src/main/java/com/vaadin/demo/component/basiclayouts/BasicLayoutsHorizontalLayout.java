package com.vaadin.demo.component.basiclayouts;

import com.vaadin.demo.DemoExporter; // hidden-source-line
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.orderedlayout.HorizontalLayout;
import com.vaadin.flow.router.Route;

@Route("basic-layouts/horizontal-layout")
public class BasicLayoutsHorizontalLayout extends Div {
    public BasicLayoutsHorizontalLayout() {
        // tag::snippet[]
        HorizontalLayout layout = new HorizontalLayout();
        layout.setPadding(true);
        layout.add(new LayoutItem("Item 1"));
        layout.add(new LayoutItem("Item 2"));
        layout.add(new LayoutItem("Item 3"));
        layout.add(new LayoutItem("Item 4"));
        // end::snippet[]

        this.setClassName("basic-layouts-example");

        this.add(layout);
    }

    public static class Exporter extends // hidden-source-line
            DemoExporter<BasicLayoutsHorizontalLayout> { // hidden-source-line
    } // hidden-source-line
}
