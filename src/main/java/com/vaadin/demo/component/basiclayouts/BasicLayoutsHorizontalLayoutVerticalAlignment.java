package com.vaadin.demo.component.basiclayouts;

import com.vaadin.demo.DemoExporter; // hidden-source-line
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.orderedlayout.FlexComponent;
import com.vaadin.flow.component.orderedlayout.HorizontalLayout;
import com.vaadin.flow.component.textfield.TextArea;
import com.vaadin.flow.router.Route;

@Route("basic-layouts/horizontal-layout-vertical-alignment")
public class BasicLayoutsHorizontalLayoutVerticalAlignment extends Div {

    public BasicLayoutsHorizontalLayoutVerticalAlignment() {
        // tag::layout[]
        HorizontalLayout layout = new HorizontalLayout();
        layout.setPadding(true);
        layout.setAlignItems(FlexComponent.Alignment.CENTER);
        layout.add(new TextArea("Text area 1"));
        layout.add(new TextArea("Text area 2"));
        layout.add(new TextArea("Text area 3"));
        // end::layout[]

        this.setClassName("basic-layouts-example");
        layout.setClassName("height-5xl");

        this.add(layout);
    }

    public static class Exporter extends // hidden-source-line
            DemoExporter<BasicLayoutsHorizontalLayoutVerticalAlignment> { // hidden-source-line
    } // hidden-source-line
}
