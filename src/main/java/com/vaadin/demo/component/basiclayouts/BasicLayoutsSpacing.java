package com.vaadin.demo.component.basiclayouts;

import com.vaadin.demo.DemoExporter; // hidden-source-line
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.button.Button;
import com.vaadin.flow.component.html.Paragraph;
import com.vaadin.flow.component.orderedlayout.FlexComponent;
import com.vaadin.flow.component.orderedlayout.HorizontalLayout;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.router.Route;

@Route("basic-layouts/spacing")
public class BasicLayoutsSpacing extends Div {

    public BasicLayoutsSpacing() {
        HorizontalLayout parent = new HorizontalLayout();
        parent.getStyle().setBorder("0");
        add(parent);

        Div wrapper = new Div();
        wrapper.setWidthFull();
        wrapper.add(new Paragraph("Vertical layout without spacing:"));
        parent.add(wrapper);

        // tag::snippet[]
        // VerticalLayout has spacing enabled by default, use setSpacing to disable it
        VerticalLayout layoutWithoutSpacing = new VerticalLayout();
        layoutWithoutSpacing.setSpacing(false);
        // end::snippet[]
        layoutWithoutSpacing.setAlignItems(FlexComponent.Alignment.STRETCH);
        layoutWithoutSpacing.add(new Button("Button 1"));
        layoutWithoutSpacing.add(new Button("Button 2"));
        layoutWithoutSpacing.add(new Button("Button 3"));
        wrapper.add(layoutWithoutSpacing);

        wrapper = new Div();
        wrapper.setWidthFull();
        wrapper.add(new Paragraph("Vertical layout with spacing:"));
        parent.add(wrapper);

        VerticalLayout layoutWithSpacing = new VerticalLayout();
        layoutWithSpacing.setAlignItems(FlexComponent.Alignment.STRETCH);
        layoutWithSpacing.add(new Button("Button 1"));
        layoutWithSpacing.add(new Button("Button 2"));
        layoutWithSpacing.add(new Button("Button 3"));
        wrapper.add(layoutWithSpacing);

        setClassName("basic-layouts-example");
    }

    public static class Exporter // hidden-source-line
            extends DemoExporter<BasicLayoutsSpacing> { // hidden-source-line
    } // hidden-source-line
}
