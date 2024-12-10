package com.vaadin.demo.component.basiclayouts;

import com.vaadin.demo.DemoExporter; // hidden-source-line
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.button.Button;
import com.vaadin.flow.component.html.Paragraph;
import com.vaadin.flow.component.orderedlayout.HorizontalLayout;
import com.vaadin.flow.router.Route;

@Route("basic-layouts/horizontal-layout-padding")
public class BasicLayoutsHorizontalLayoutPadding extends Div {

    public BasicLayoutsHorizontalLayoutPadding() {
        add(new Paragraph("Horizontal layout without padding:"));
        HorizontalLayout layoutWithoutPadding = new HorizontalLayout();
        layoutWithoutPadding.add(new Button("Button 1"));
        layoutWithoutPadding.add(new Button("Button 2"));
        layoutWithoutPadding.add(new Button("Button 3"));
        this.add(layoutWithoutPadding);

        add(new Paragraph("Horizontal layout with padding:"));
        // tag::snippet[]
        HorizontalLayout layoutWithPadding = new HorizontalLayout();
        layoutWithPadding.setPadding(true);
        // end::snippet[]
        layoutWithPadding.add(new Button("Button 1"));
        layoutWithPadding.add(new Button("Button 2"));
        layoutWithPadding.add(new Button("Button 3"));
        this.add(layoutWithPadding);

        this.setClassName("basic-layouts-example");
    }

    public static class Exporter // hidden-source-line
            extends DemoExporter<BasicLayoutsHorizontalLayoutPadding> { // hidden-source-line
    } // hidden-source-line
}
