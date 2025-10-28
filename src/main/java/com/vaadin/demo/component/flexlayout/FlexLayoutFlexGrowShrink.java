package com.vaadin.demo.component.flexlayout;

import com.vaadin.demo.DemoExporter;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.orderedlayout.FlexLayout;
import com.vaadin.flow.router.Route;

@Route("flex-layout-flex-grow-shrink")
public class FlexLayoutFlexGrowShrink extends Div {

    public FlexLayoutFlexGrowShrink() {
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

        layout.setFlexGrow(3, item1);
        layout.setFlexGrow(2, item3);
        layout.setFlexShrink(0, item4);
        layout.setFlexShrink(3, item2);
        // end::snippet[]

        layout.setFlexBasis("50px", item1, item3, item4);
        layout.setWidthFull();
        layout.getStyle().setGap("5px").setPadding("5px");
        layout.addClassNames("flex-layout");

        this.setClassName("basic-layouts-example");
        this.add(layout);
    }

    public static class Exporter extends // hidden-source-line
            DemoExporter<FlexLayoutFlexGrowShrink> { // hidden-source-line
    } // hidden-source-line
}
