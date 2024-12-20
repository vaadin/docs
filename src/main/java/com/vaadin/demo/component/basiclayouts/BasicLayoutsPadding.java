package com.vaadin.demo.component.basiclayouts;

import com.vaadin.demo.DemoExporter; // hidden-source-line
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.html.Paragraph;
import com.vaadin.flow.component.orderedlayout.FlexComponent;
import com.vaadin.flow.component.orderedlayout.HorizontalLayout;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.router.Route;

@Route("basic-layouts/padding")
public class BasicLayoutsPadding extends Div {

    public BasicLayoutsPadding() {
        HorizontalLayout parent = new HorizontalLayout();
        parent.getStyle().setBorder("0");
        add(parent);

        Div wrapper = new Div();
        wrapper.setWidthFull();
        wrapper.add(new Paragraph("Vertical layout without padding:"));
        parent.add(wrapper);

        // tag::snippet[]
        // VerticalLayout has padding enabled by default, use setPadding to
        // disable it
        VerticalLayout layoutWithoutPadding = new VerticalLayout();
        layoutWithoutPadding.setPadding(false);
        // end::snippet[]
        layoutWithoutPadding.setAlignItems(FlexComponent.Alignment.STRETCH);

        Div item1 = new Div("Item 1");
        item1.setClassName("example-item");
        Div item2 = new Div("Item 2");
        item2.setClassName("example-item");
        Div item3 = new Div("Item 3");
        item3.setClassName("example-item");

        layoutWithoutPadding.add(item1, item2, item3);
        wrapper.add(layoutWithoutPadding);

        wrapper = new Div();
        wrapper.setWidthFull();
        wrapper.add(new Paragraph("Vertical layout with padding:"));
        parent.add(wrapper);

        VerticalLayout layoutWithPadding = new VerticalLayout();
        layoutWithPadding.setAlignItems(FlexComponent.Alignment.STRETCH);

        Div paddingItem1 = new Div("Item 1");
        paddingItem1.setClassName("example-item");
        Div paddingItem2 = new Div("Item 2");
        paddingItem2.setClassName("example-item");
        Div paddingItem3 = new Div("Item 3");
        paddingItem3.setClassName("example-item");

        layoutWithPadding.add(paddingItem1, paddingItem2, paddingItem3);
        wrapper.add(layoutWithPadding);

        setClassName("basic-layouts-example");
    }

    public static class Exporter // hidden-source-line
            extends DemoExporter<BasicLayoutsPadding> { // hidden-source-line
    } // hidden-source-line
}
