package com.vaadin.demo.component.basiclayouts;

import com.vaadin.demo.DemoExporter; // hidden-source-line
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.html.Paragraph;
import com.vaadin.flow.component.orderedlayout.FlexComponent;
import com.vaadin.flow.component.orderedlayout.HorizontalLayout;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.router.Route;

@Route("basic-layouts/margin")
public class BasicLayoutsMargin extends Div {

    public BasicLayoutsMargin() {
        HorizontalLayout parent = new HorizontalLayout();
        parent.getStyle().setBorder("0");
        add(parent);

        Div wrapper = new Div();
        wrapper.setWidthFull();
        wrapper.add(new Paragraph("Vertical layout without margin:"));
        parent.add(wrapper);

        Div container = new Div();
        container.setClassName("container");
        wrapper.add(container);

        VerticalLayout layoutWithoutMargin = new VerticalLayout();
        layoutWithoutMargin.setWidth("auto");
        layoutWithoutMargin.setAlignItems(FlexComponent.Alignment.STRETCH);

        Div item1 = new Div("Item 1");
        item1.setClassName("example-item");
        Div item2 = new Div("Item 2");
        item2.setClassName("example-item");
        Div item3 = new Div("Item 3");
        item3.setClassName("example-item");

        layoutWithoutMargin.add(item1, item2, item3);

        container.add(layoutWithoutMargin);

        wrapper = new Div();
        wrapper.setWidthFull();
        wrapper.add(new Paragraph("Vertical layout with margin:"));
        parent.add(wrapper);

        container = new Div();
        container.setClassName("container");
        wrapper.add(container);

        // tag::snippet[]
        VerticalLayout layoutWithMargin = new VerticalLayout();
        layoutWithMargin.setMargin(true);
        // end::snippet[]
        layoutWithMargin.setWidth("auto");
        layoutWithMargin.setAlignItems(FlexComponent.Alignment.STRETCH);

        Div marginItem1 = new Div("Item 1");
        marginItem1.setClassName("example-item");
        Div marginItem2 = new Div("Item 2");
        marginItem2.setClassName("example-item");
        Div marginItem3 = new Div("Item 3");
        marginItem3.setClassName("example-item");

        layoutWithMargin.add(marginItem1, marginItem2, marginItem3);

        container.add(layoutWithMargin);

        setClassName("basic-layouts-example");
    }

    public static class Exporter // hidden-source-line
            extends DemoExporter<BasicLayoutsMargin> { // hidden-source-line
    } // hidden-source-line
}
