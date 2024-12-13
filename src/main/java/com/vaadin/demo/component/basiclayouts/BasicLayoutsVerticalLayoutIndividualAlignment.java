package com.vaadin.demo.component.basiclayouts;

import com.vaadin.demo.DemoExporter; // hidden-source-line
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.orderedlayout.FlexComponent;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.component.orderedlayout.FlexComponent.Alignment;
import com.vaadin.flow.router.Route;

@Route("basic-layouts/vertical-layout-individual-alignment")
public class BasicLayoutsVerticalLayoutIndividualAlignment extends Div {

    public BasicLayoutsVerticalLayoutIndividualAlignment() {
        // tag::layout[]
        VerticalLayout layout = new VerticalLayout();
        layout.setAlignItems(FlexComponent.Alignment.START);

        Div item1 = new Div("Item 1");
        item1.setClassName("layout-item");
        layout.add(item1);
        layout.setAlignSelf(Alignment.END, item1);

        Div item2 = new Div("Item 2");
        item2.setClassName("layout-item");
        layout.add(item2);
        layout.setAlignSelf(Alignment.CENTER, item2);

        Div item3 = new Div("Item 3");
        item3.setClassName("layout-item");
        layout.add(item3);
        // end::layout[]

        this.setClassName("basic-layouts-example");

        this.add(layout);
    }

    public static class Exporter extends // hidden-source-line
            DemoExporter<BasicLayoutsVerticalLayoutIndividualAlignment> { // hidden-source-line
    } // hidden-source-line
}
