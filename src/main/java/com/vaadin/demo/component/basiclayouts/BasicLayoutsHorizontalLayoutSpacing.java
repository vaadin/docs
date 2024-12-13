package com.vaadin.demo.component.basiclayouts;

import com.vaadin.demo.DemoExporter; // hidden-source-line
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.html.Paragraph;
import com.vaadin.flow.component.orderedlayout.HorizontalLayout;
import com.vaadin.flow.router.Route;

@Route("basic-layouts/horizontal-layout-spacing")
public class BasicLayoutsHorizontalLayoutSpacing extends Div {

    public BasicLayoutsHorizontalLayoutSpacing() {
        add(new Paragraph("Horizontal layout without spacing:"));
        // tag::snippet[]
        // HorizontalLayout has spacing enabled by default, use setSpacing to disable it
        HorizontalLayout layoutWithoutSpacing = new HorizontalLayout();
        layoutWithoutSpacing.setSpacing(false);
        // end::snippet[]
        layoutWithoutSpacing.setPadding(true);

        Div item1 = new Div("Item 1");
        item1.setClassName("example-item");
        Div item2 = new Div("Item 2");
        item2.setClassName("example-item");
        Div item3 = new Div("Item 3");
        item3.setClassName("example-item");

        layoutWithoutSpacing.add(item1, item2, item3);
        add(layoutWithoutSpacing);

        add(new Paragraph("Horizontal layout with spacing:"));
        HorizontalLayout layoutWithSpacing = new HorizontalLayout();
        layoutWithSpacing.setPadding(true);

        Div spacingItem1 = new Div("Item 1");
        spacingItem1.setClassName("example-item");
        Div spacingItem2 = new Div("Item 2");
        spacingItem2.setClassName("example-item");
        Div spacingItem3 = new Div("Item 3");
        spacingItem3.setClassName("example-item");

        layoutWithSpacing.add(spacingItem1, spacingItem2, spacingItem3);
        add(layoutWithSpacing);

        this.setClassName("basic-layouts-example");
    }

    public static class Exporter // hidden-source-line
            extends DemoExporter<BasicLayoutsHorizontalLayoutSpacing> { // hidden-source-line
    } // hidden-source-line
}
