package com.vaadin.demo.component.basiclayouts;

import com.vaadin.demo.DemoExporter; // hidden-source-line
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.html.Paragraph;
import com.vaadin.flow.component.button.Button;
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
        layoutWithoutWrap.add(new Button("Button 1"));
        layoutWithoutWrap.add(new Button("Button 2"));
        layoutWithoutWrap.add(new Button("Button 3"));
        layoutWithoutWrap.add(new Button("Button 4"));
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
        layoutWithWrap.add(new Button("Button 1"));
        layoutWithWrap.add(new Button("Button 2"));
        layoutWithWrap.add(new Button("Button 3"));
        layoutWithWrap.add(new Button("Button 4"));

        wrapper.add(layoutWithWrap);
        parent.add(wrapper);
        this.setClassName("basic-layouts-example");
        this.add(parent);
    }

    public static class Exporter // hidden-source-line
            extends DemoExporter<BasicLayoutsVerticalLayoutWrapping> { // hidden-source-line
    } // hidden-source-line
}
