package com.vaadin.demo.component.basiclayouts;

import com.vaadin.demo.DemoExporter; // hidden-source-line
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.html.Paragraph;
import com.vaadin.flow.component.button.Button;
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
        layoutWithoutWrap.add(new Button("Button 1"));
        layoutWithoutWrap.add(new Button("Button 2"));
        layoutWithoutWrap.add(new Button("Button 3"));
        layoutWithoutWrap.add(new Button("Button 4"));
        layoutWithoutWrap.add(new Button("Button 5"));
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
        layoutWithWrap.add(new Button("Button 1"));
        layoutWithWrap.add(new Button("Button 2"));
        layoutWithWrap.add(new Button("Button 3"));
        layoutWithWrap.add(new Button("Button 4"));
        layoutWithWrap.add(new Button("Button 5"));

        this.setClassName("basic-layouts-example");
        this.add(layoutWithWrap);
    }

    public static class Exporter // hidden-source-line
            extends DemoExporter<BasicLayoutsHorizontalLayoutWrapping> { // hidden-source-line
    } // hidden-source-line
}
