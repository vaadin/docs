package com.vaadin.demo.component.basiclayouts;

import com.vaadin.demo.DemoExporter; // hidden-source-line
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.button.Button;
import com.vaadin.flow.component.html.Paragraph;
import com.vaadin.flow.component.orderedlayout.HorizontalLayout;
import com.vaadin.flow.router.Route;

@Route("basic-layouts/horizontal-layout-margin")
public class BasicLayoutsHorizontalLayoutMargin extends Div {

    public BasicLayoutsHorizontalLayoutMargin() {
        add(new Paragraph("Horizontal layout without margin:"));
        HorizontalLayout layoutWithoutMargin = new HorizontalLayout();
        layoutWithoutMargin.setPadding(true);
        layoutWithoutMargin.setWidth("auto");
        layoutWithoutMargin.add(new Button("Button 1"));
        layoutWithoutMargin.add(new Button("Button 2"));
        layoutWithoutMargin.add(new Button("Button 3"));

        Div container2 = new Div();
        container2.setClassName("container");
        container2.add(layoutWithoutMargin);
        this.add(container2);

        add(new Paragraph("Horizontal layout with margin:"));
        // tag::snippet[]
        HorizontalLayout layoutWithMargin = new HorizontalLayout();
        layoutWithMargin.setMargin(true);
        // end::snippet[]
        layoutWithMargin.setPadding(true);
        layoutWithMargin.setWidth("auto");
        layoutWithMargin.add(new Button("Button 1"));
        layoutWithMargin.add(new Button("Button 2"));
        layoutWithMargin.add(new Button("Button 3"));

        Div container1 = new Div();
        container1.setClassName("container");
        container1.add(layoutWithMargin);
        this.add(container1);

        this.setClassName("basic-layouts-example");
    }

    public static class Exporter // hidden-source-line
            extends DemoExporter<BasicLayoutsHorizontalLayoutMargin> { // hidden-source-line
    } // hidden-source-line
}
