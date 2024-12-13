package com.vaadin.demo.component.basiclayouts;

import com.vaadin.demo.DemoExporter; // hidden-source-line
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.orderedlayout.FlexComponent;
import com.vaadin.flow.component.orderedlayout.HorizontalLayout;
import com.vaadin.flow.router.Route;

@Route("basic-layouts/horizontal-layout-individual-alignment")
public class BasicLayoutsHorizontalLayoutIndividualAlignment extends Div {

    public BasicLayoutsHorizontalLayoutIndividualAlignment() {
        // tag::layout[]
        HorizontalLayout layout = new HorizontalLayout();
        layout.setPadding(true);
        layout.setAlignItems(FlexComponent.Alignment.STRETCH);

        Div item1 = new Div("Item 1");
        item1.setClassName("layout-item");
        layout.add(item1);
        layout.setAlignSelf(FlexComponent.Alignment.START, item1);

        Div item2 = new Div("Item 2");
        item2.setClassName("layout-item");
        layout.add(item2);

        Div item3 = new Div("Item 3");
        item3.setClassName("layout-item");
        layout.add(item3);
        layout.setAlignSelf(FlexComponent.Alignment.END, item3);
        // end::layout[]

        this.setClassName("basic-layouts-example");
        layout.setClassName("height-4xl");

        this.add(layout);
    }

    public static class Exporter extends // hidden-source-line
            DemoExporter<BasicLayoutsHorizontalLayoutIndividualAlignment> { // hidden-source-line
    } // hidden-source-line
}
