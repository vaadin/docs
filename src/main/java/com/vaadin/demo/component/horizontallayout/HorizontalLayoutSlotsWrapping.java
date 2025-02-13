package com.vaadin.demo.component.horizontallayout;

import com.vaadin.demo.DemoExporter; // hidden-source-line
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.orderedlayout.HorizontalLayout;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.router.Route;

@Route("horizontal-layout-slots-wrapping")
public class HorizontalLayoutSlotsWrapping extends Div {
    public HorizontalLayoutSlotsWrapping() {
        // tag::snippet[]
        HorizontalLayout layout = new HorizontalLayout();
        layout.setPadding(true);

        VerticalLayout start = new VerticalLayout();
        start.setWidth("auto");
        start.getStyle().set("margin-right", "auto");

        Div item1 = new Div("Start");
        item1.setClassName("example-item");

        Div item2 = new Div("Start");
        item2.setClassName("example-item");

        start.add(item1, item2);

        VerticalLayout middle = new VerticalLayout();
        middle.setWidth("auto");

        Div item3 = new Div("Start");
        item3.setClassName("example-item");

        middle.add(item3);

        VerticalLayout end = new VerticalLayout();
        end.setWidth("auto");
        end.getStyle().set("margin-left", "auto");

        Div item4 = new Div("End");
        item4.setClassName("example-item");

        Div item5 = new Div("End");
        item5.setClassName("example-item");

        end.add(item4, item5);

        layout.add(start, middle, end);
        // end::snippet[]

        this.setClassName("basic-layouts-example");
        this.add(layout);
    }

    public static class Exporter extends // hidden-source-line
            DemoExporter<HorizontalLayoutSlotsWrapping> { // hidden-source-line
    } // hidden-source-line
}
