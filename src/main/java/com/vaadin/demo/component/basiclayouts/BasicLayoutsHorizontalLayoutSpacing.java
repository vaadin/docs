package com.vaadin.demo.component.basiclayouts;

import com.vaadin.demo.DemoExporter; // hidden-source-line
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.button.Button;
import com.vaadin.flow.component.html.Paragraph;
import com.vaadin.flow.component.orderedlayout.FlexComponent;
import com.vaadin.flow.component.orderedlayout.HorizontalLayout;
import com.vaadin.flow.component.radiobutton.RadioButtonGroup;
import com.vaadin.flow.router.Route;

@Route("basic-layouts/horizontal-layout-spacing")
public class BasicLayoutsHorizontalLayoutSpacing extends Div {

    public BasicLayoutsHorizontalLayoutSpacing() {
        add(new Paragraph("Horizontal layout without spacing:"));
        // tag::snippet[]
        // HorizontalLayout has spacing enabled by default, use setSpacing to disable it
        HorizontalLayout layoutWithoutSpacing = new HorizontalLayout();
        layoutWithoutSpacing.setSpacing(false);
        // end::snippet[]
        layoutWithoutSpacing.setPadding(true);
        layoutWithoutSpacing.add(new Button("Button 1"));
        layoutWithoutSpacing.add(new Button("Button 2"));
        layoutWithoutSpacing.add(new Button("Button 3"));
        add(layoutWithoutSpacing);

        add(new Paragraph("Horizontal layout with spacing:"));
        HorizontalLayout layoutWithSpacing = new HorizontalLayout();
        layoutWithSpacing.setPadding(true);
        layoutWithSpacing.add(new Button("Button 1"));
        layoutWithSpacing.add(new Button("Button 2"));
        layoutWithSpacing.add(new Button("Button 3"));
        add(layoutWithSpacing);

        this.setClassName("basic-layouts-example");
    }

    public static class Exporter // hidden-source-line
            extends DemoExporter<BasicLayoutsHorizontalLayoutSpacing> { // hidden-source-line
    } // hidden-source-line
}
