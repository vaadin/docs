package com.vaadin.demo.component.verticallayout;

import com.vaadin.demo.DemoExporter; // hidden-source-line
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.html.Paragraph;
import com.vaadin.flow.component.orderedlayout.FlexComponent;
import com.vaadin.flow.component.orderedlayout.HorizontalLayout;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.router.Route;

@Route("vertical-layout-spacing")
public class VerticalLayoutSpacing extends Div {

    public VerticalLayoutSpacing() {
        HorizontalLayout parent = new HorizontalLayout();
        parent.getStyle().setBorder("0");
        add(parent);

        Div wrapper = new Div();
        wrapper.setWidthFull();
        wrapper.add(new Paragraph("Vertical layout without spacing:"));
        parent.add(wrapper);

        // tag::snippet[]
        // VerticalLayout has spacing enabled by default, use setSpacing to
        // disable it
        VerticalLayout layoutWithoutSpacing = new VerticalLayout();
        layoutWithoutSpacing.setSpacing(false);
        // end::snippet[]
        layoutWithoutSpacing.setAlignItems(FlexComponent.Alignment.STRETCH);

        Div item1 = new Div("Item 1");
        item1.setClassName("example-item");
        Div item2 = new Div("Item 2");
        item2.setClassName("example-item");
        Div item3 = new Div("Item 3");
        item3.setClassName("example-item");

        layoutWithoutSpacing.add(item1, item2, item3);
        wrapper.add(layoutWithoutSpacing);

        wrapper = new Div();
        wrapper.setWidthFull();
        wrapper.add(new Paragraph("Vertical layout with spacing:"));
        parent.add(wrapper);

        VerticalLayout layoutWithSpacing = new VerticalLayout();
        layoutWithSpacing.setAlignItems(FlexComponent.Alignment.STRETCH);

        Div spacingItem1 = new Div("Item 1");
        spacingItem1.setClassName("example-item");
        Div spacingItem2 = new Div("Item 2");
        spacingItem2.setClassName("example-item");
        Div spacingItem3 = new Div("Item 3");
        spacingItem3.setClassName("example-item");

        layoutWithSpacing.add(spacingItem1, spacingItem2, spacingItem3);
        wrapper.add(layoutWithSpacing);

        setClassName("basic-layouts-example");
    }

    public static class Exporter // hidden-source-line
            extends DemoExporter<VerticalLayoutSpacing> { // hidden-source-line
    } // hidden-source-line
}
