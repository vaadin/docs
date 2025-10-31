package com.vaadin.demo.component.flexlayout;

import com.vaadin.demo.DemoExporter;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.orderedlayout.FlexComponent;
import com.vaadin.flow.component.orderedlayout.FlexLayout;
import com.vaadin.flow.router.Route;

@Route("flex-layout-item-alignment")
public class FlexLayoutItemAlignment extends Div {

    public FlexLayoutItemAlignment() {
        // tag::snippet[]
        FlexLayout layout = new FlexLayout();
        layout.setAlignItems(FlexComponent.Alignment.CENTER);
        // end::snippet[]

        Div item1 = new Div("Item 1");
        item1.setClassName("example-item");

        Div item2 = new Div("Item 2");
        item2.setClassName("example-item");

        Div item3 = new Div("Item 3");
        item3.setClassName("example-item");

        Div item4 = new Div("Item 4");
        item4.setClassName("example-item");

        // tag::snippet[]
        layout.setAlignSelf(FlexComponent.Alignment.END, item4);
        // end::snippet[]

        layout.add(item1, item2, item3, item4);

        layout.setWidthFull();
        layout.getStyle().setGap("5px").setPadding("5px");
        layout.addClassNames("flex-layout", "height-4xl");

        this.setClassName("basic-layouts-example");
        this.add(layout);
    }

    public static class Exporter extends // hidden-source-line
            DemoExporter<FlexLayoutItemAlignment> { // hidden-source-line
    } // hidden-source-line
}
