package com.vaadin.demo.component.basiclayouts;

import com.vaadin.demo.DemoExporter; // hidden-source-line
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.html.Paragraph;
import com.vaadin.flow.component.orderedlayout.HorizontalLayout;
import com.vaadin.flow.router.Route;

@Route("basic-layouts/horizontal-layout-wrapping")
public class BasicLayoutsHorizontalLayoutWrapping extends Div {

    public BasicLayoutsHorizontalLayoutWrapping() {
        add(new Paragraph("Horizontal layout without wrapping:"));
        HorizontalLayout layoutWithoutWrap = new HorizontalLayout();
        layoutWithoutWrap.setPadding(true);
        layoutWithoutWrap.setSpacing(true);
        layoutWithoutWrap.setMargin(true);
        layoutWithoutWrap.setWidth("350px");

        Div item1 = new Div("Item 1");
        item1.setClassName("example-item");
        Div item2 = new Div("Item 2");
        item2.setClassName("example-item");
        Div item3 = new Div("Item 3");
        item3.setClassName("example-item");
        Div item4 = new Div("Item 4");
        item4.setClassName("example-item");
        Div item5 = new Div("Item 5");
        item5.setClassName("example-item");

        layoutWithoutWrap.add(item1, item2, item3, item4, item5);
        this.add(layoutWithoutWrap);

        add(new Paragraph("Horizontal layout with wrapping:"));
        // tag::snippet[]
        HorizontalLayout layoutWithWrap = new HorizontalLayout();
        layoutWithWrap.setWrap(true);
        // end::snippet[]
        layoutWithWrap.setMargin(true);
        layoutWithWrap.setPadding(true);
        layoutWithWrap.setSpacing(true);
        layoutWithWrap.setWidth("350px");

        Div wrapItem1 = new Div("Item 1");
        wrapItem1.setClassName("example-item");
        Div wrapItem2 = new Div("Item 2");
        wrapItem2.setClassName("example-item");
        Div wrapItem3 = new Div("Item 3");
        wrapItem3.setClassName("example-item");
        Div wrapItem4 = new Div("Item 4");
        wrapItem4.setClassName("example-item");
        Div wrapItem5 = new Div("Item 5");
        wrapItem5.setClassName("example-item");

        layoutWithWrap.add(wrapItem1, wrapItem2, wrapItem3, wrapItem4, wrapItem5);

        this.setClassName("basic-layouts-example");
        this.add(layoutWithWrap);
    }

    public static class Exporter // hidden-source-line
            extends DemoExporter<BasicLayoutsHorizontalLayoutWrapping> { // hidden-source-line
    } // hidden-source-line
}
