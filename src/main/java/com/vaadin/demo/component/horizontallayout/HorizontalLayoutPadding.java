package com.vaadin.demo.component.horizontallayout;

import com.vaadin.demo.DemoExporter; // hidden-source-line
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.html.Paragraph;
import com.vaadin.flow.component.orderedlayout.HorizontalLayout;
import com.vaadin.flow.router.Route;

@Route("horizontal-layout-padding")
public class HorizontalLayoutPadding extends Div {

    public HorizontalLayoutPadding() {
        add(new Paragraph("Horizontal layout without padding:"));
        HorizontalLayout layoutWithoutPadding = new HorizontalLayout();

        Div item1 = new Div("Item 1");
        item1.setClassName("example-item");
        Div item2 = new Div("Item 2");
        item2.setClassName("example-item");
        Div item3 = new Div("Item 3");
        item3.setClassName("example-item");

        layoutWithoutPadding.add(item1, item2, item3);
        this.add(layoutWithoutPadding);

        add(new Paragraph("Horizontal layout with padding:"));
        // tag::snippet[]
        HorizontalLayout layoutWithPadding = new HorizontalLayout();
        layoutWithPadding.setPadding(true);
        // end::snippet[]

        Div paddingItem1 = new Div("Item 1");
        paddingItem1.setClassName("example-item");
        Div paddingItem2 = new Div("Item 2");
        paddingItem2.setClassName("example-item");
        Div paddingItem3 = new Div("Item 3");
        paddingItem3.setClassName("example-item");

        layoutWithPadding.add(paddingItem1, paddingItem2, paddingItem3);
        this.add(layoutWithPadding);

        this.setClassName("basic-layouts-example");
    }

    public static class Exporter // hidden-source-line
            extends DemoExporter<HorizontalLayoutPadding> { // hidden-source-line
    } // hidden-source-line
}
