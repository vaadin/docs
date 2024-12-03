package com.vaadin.demo.component.basiclayouts;

import com.vaadin.demo.DemoExporter; // hidden-source-line
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.button.Button;
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
        // VerticalLayout has padding enabled by default, use setPadding to disable it
        VerticalLayout layoutWithoutPadding = new VerticalLayout();
        layoutWithoutPadding.setPadding(false);
        // end::snippet[]
        layoutWithoutPadding.setAlignItems(FlexComponent.Alignment.STRETCH);
        layoutWithoutPadding.add(new Button("Button 1"));
        layoutWithoutPadding.add(new Button("Button 2"));
        layoutWithoutPadding.add(new Button("Button 3"));
        wrapper.add(layoutWithoutPadding);

        wrapper = new Div();
        wrapper.setWidthFull();
        wrapper.add(new Paragraph("Vertical layout with padding:"));
        parent.add(wrapper);

        VerticalLayout layoutWithPadding = new VerticalLayout();
        layoutWithPadding.setAlignItems(FlexComponent.Alignment.STRETCH);
        layoutWithPadding.add(new Button("Button 1"));
        layoutWithPadding.add(new Button("Button 2"));
        layoutWithPadding.add(new Button("Button 3"));
        wrapper.add(layoutWithPadding);

        setClassName("basic-layouts-example");
    }

    public static class Exporter // hidden-source-line
            extends DemoExporter<BasicLayoutsPadding> { // hidden-source-line
    } // hidden-source-line
}
