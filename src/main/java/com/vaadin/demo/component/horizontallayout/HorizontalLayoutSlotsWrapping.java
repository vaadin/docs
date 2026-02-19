package com.vaadin.demo.component.horizontallayout;

import com.vaadin.demo.DemoExporter; // hidden-source-line
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.orderedlayout.HorizontalLayout;
import com.vaadin.flow.router.Route;

@Route("horizontal-layout-slots-wrapping")
public class HorizontalLayoutSlotsWrapping extends Div {
    public HorizontalLayoutSlotsWrapping() {
        // tag::snippet[]
        HorizontalLayout layout = new HorizontalLayout();
        layout.setWrap(true);
        layout.setPadding(true);

        HorizontalLayout start = new HorizontalLayout();
        start.setPadding(true);

        Div item1 = new Div("Start");
        item1.setClassName("example-item");

        Div item2 = new Div("Start");
        item2.setClassName("example-item");

        start.add(item1, item2);

        HorizontalLayout middle = new HorizontalLayout();
        middle.setPadding(true);

        Div item3 = new Div("Middle");
        item3.setClassName("example-item");

        Div item4 = new Div("Middle");
        item4.setClassName("example-item");

        Div item5 = new Div("Middle");
        item5.setClassName("example-item");

        middle.add(item3, item4, item5);

        HorizontalLayout end = new HorizontalLayout();
        end.setPadding(true);

        Div item6 = new Div("End");
        item6.setClassName("example-item");

        Div item7 = new Div("End");
        item7.setClassName("example-item");

        end.add(item6, item7);

        layout.addToStart(start);
        layout.addToMiddle(middle);
        layout.addToEnd(end);
        // end::snippet[]

        this.setClassName("basic-layouts-example");
        this.add(layout);
    }

    public static class Exporter extends // hidden-source-line
            DemoExporter<HorizontalLayoutSlotsWrapping> { // hidden-source-line
    } // hidden-source-line
}
