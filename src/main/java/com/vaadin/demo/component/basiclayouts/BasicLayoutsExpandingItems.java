package com.vaadin.demo.component.basiclayouts;

import com.vaadin.demo.DemoExporter; // hidden-source-line
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.button.Button;
import com.vaadin.flow.component.orderedlayout.HorizontalLayout;
import com.vaadin.flow.router.Route;

@Route("basic-layouts/expanding-items")
public class BasicLayoutsExpandingItems extends Div {

    public BasicLayoutsExpandingItems() {
        // tag::snippet[]
        Button button1 = new Button("Button 1");
        HorizontalLayout layout = new HorizontalLayout();
        layout.setFlexGrow(1, button1);
        // end::snippet[]
        layout.setPadding(true);
        layout.add(button1);
        layout.add(new Button("Button 2"));
        layout.add(new Button("Button 3"));
        this.add(layout);

        this.setClassName("basic-layouts-example");
    }

    public static class Exporter extends // hidden-source-line
            DemoExporter<BasicLayoutsExpandingItems> { // hidden-source-line
    } // hidden-source-line
}
