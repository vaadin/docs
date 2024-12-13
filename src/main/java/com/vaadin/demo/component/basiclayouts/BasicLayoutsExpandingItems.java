package com.vaadin.demo.component.basiclayouts;

import com.vaadin.demo.DemoExporter; // hidden-source-line
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.orderedlayout.HorizontalLayout;
import com.vaadin.flow.router.Route;

@Route("basic-layouts/expanding-items")
public class BasicLayoutsExpandingItems extends Div {

    public BasicLayoutsExpandingItems() {
        // tag::snippet[]
        Div item1 = new Div("Item 1");
        item1.setClassName("layout-item");
        HorizontalLayout layout = new HorizontalLayout();
        layout.setFlexGrow(1, item1);
        // end::snippet[]
        layout.setPadding(true);
        layout.add(item1);
        
        Div item2 = new Div("Item 2");
        item2.setClassName("layout-item");
        layout.add(item2);
        
        Div item3 = new Div("Item 3");
        item3.setClassName("layout-item");
        layout.add(item3);
        
        this.add(layout);
        this.setClassName("basic-layouts-example");
    }

    public static class Exporter extends // hidden-source-line
            DemoExporter<BasicLayoutsExpandingItems> { // hidden-source-line
    } // hidden-source-line
}
