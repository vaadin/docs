package com.vaadin.demo.component.basiclayouts;

import com.vaadin.demo.DemoExporter; // hidden-source-line
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.button.Button;
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
        layoutWithoutMargin.add(new Button("Button 1"));
        layoutWithoutMargin.add(new Button("Button 2"));
        layoutWithoutMargin.add(new Button("Button 3"));
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
        layoutWithMargin.add(new Button("Button 1"));
        layoutWithMargin.add(new Button("Button 2"));
        layoutWithMargin.add(new Button("Button 3"));
        container.add(layoutWithMargin);

        setClassName("basic-layouts-example");
    }

    public static class Exporter // hidden-source-line
            extends DemoExporter<BasicLayoutsMargin> { // hidden-source-line
    } // hidden-source-line
}
