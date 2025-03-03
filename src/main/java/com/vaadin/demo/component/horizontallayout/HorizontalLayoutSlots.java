package com.vaadin.demo.component.horizontallayout;

import com.vaadin.demo.DemoExporter; // hidden-source-line
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.orderedlayout.HorizontalLayout;
import com.vaadin.flow.router.Route;

@Route("horizontal-layout-slots")
public class HorizontalLayoutSlots extends Div {
    public HorizontalLayoutSlots() {
        // tag::snippet[]
        HorizontalLayout layout = new HorizontalLayout();
        layout.setPadding(true);

        Div start = new Div("Start");
        start.setClassName("example-item");

        Div middle = new Div("Middle");
        middle.setClassName("example-item");

        Div end = new Div("End");
        end.setClassName("example-item");

        layout.addToStart(start);
        layout.addToMiddle(middle);
        layout.addToEnd(end);
        // end::snippet[]

        this.setClassName("basic-layouts-example");
        this.add(layout);
    }

    public static class Exporter extends // hidden-source-line
            DemoExporter<HorizontalLayoutSlots> { // hidden-source-line
    } // hidden-source-line
}
