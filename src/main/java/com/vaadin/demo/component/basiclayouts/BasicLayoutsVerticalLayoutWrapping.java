package com.vaadin.demo.component.basiclayouts;

import com.vaadin.demo.DemoExporter; // hidden-source-line
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.html.Paragraph;
import com.vaadin.flow.component.orderedlayout.FlexComponent;
import com.vaadin.flow.component.orderedlayout.HorizontalLayout;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.router.Route;

@Route("basic-layouts/vertical-layout-wrapping")
public class BasicLayoutsVerticalLayoutWrapping extends Div {

    public BasicLayoutsVerticalLayoutWrapping() {
        HorizontalLayout parent = new HorizontalLayout();
        parent.setSpacing(true);
        parent.setMargin(true);
        parent.getElement().getStyle().setBorder("0");

        Div wrapper = new Div();
        wrapper.setWidthFull();
        wrapper.add(new Paragraph("Vertical layout without wrapping:"));

        VerticalLayout layoutWithoutWrap = new VerticalLayout();
        layoutWithoutWrap.setPadding(true);
        layoutWithoutWrap.setSpacing(true);
        layoutWithoutWrap.setAlignItems(FlexComponent.Alignment.STRETCH);
        layoutWithoutWrap.setHeight("200px");

        Div item1 = new Div("Item 1");
        item1.setClassName("example-item");
        Div item2 = new Div("Item 2");
        item2.setClassName("example-item");
        Div item3 = new Div("Item 3");
        item3.setClassName("example-item");
        Div item4 = new Div("Item 4");
        item4.setClassName("example-item");

        layoutWithoutWrap.add(item1, item2, item3, item4);
        wrapper.add(layoutWithoutWrap);
        parent.add(wrapper);

        wrapper = new Div();
        wrapper.setWidthFull();
        wrapper.add(new Paragraph("Vertical layout with wrapping:"));

        // tag::snippet[]
        VerticalLayout layoutWithWrap = new VerticalLayout();
        layoutWithWrap.setWrap(true);
        // end::snippet[]
        layoutWithWrap.setPadding(true);
        layoutWithWrap.setSpacing(true);
        layoutWithWrap.setAlignItems(FlexComponent.Alignment.STRETCH);
        layoutWithWrap.setHeight("200px");

        Div wrapItem1 = new Div("Item 1");
        wrapItem1.setClassName("example-item");
        Div wrapItem2 = new Div("Item 2");
        wrapItem2.setClassName("example-item");
        Div wrapItem3 = new Div("Item 3");
        wrapItem3.setClassName("example-item");
        Div wrapItem4 = new Div("Item 4");
        wrapItem4.setClassName("example-item");

        layoutWithWrap.add(wrapItem1, wrapItem2, wrapItem3, wrapItem4);
        wrapper.add(layoutWithWrap);
        parent.add(wrapper);
        this.setClassName("basic-layouts-example");
        this.add(parent);
    }

    public static class Exporter // hidden-source-line
            extends DemoExporter<BasicLayoutsVerticalLayoutWrapping> { // hidden-source-line
    } // hidden-source-line
}
