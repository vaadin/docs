package com.vaadin.demo.component.basiclayouts;

import com.vaadin.demo.DemoExporter; // hidden-source-line
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.orderedlayout.FlexComponent;
import com.vaadin.flow.component.orderedlayout.HorizontalLayout;
import com.vaadin.flow.component.textfield.TextArea;
import com.vaadin.flow.router.Route;

@Route("basic-layouts/horizontal-layout-individual-alignment")
public class BasicLayoutsHorizontalLayoutIndividualAlignment extends Div {

    public BasicLayoutsHorizontalLayoutIndividualAlignment() {
        // tag::layout[]
        TextArea textArea1 = new TextArea("Text area 1");
        HorizontalLayout layout = new HorizontalLayout();
        layout.setPadding(true);
        layout.add(textArea1);
        layout.setAlignSelf(FlexComponent.Alignment.END, textArea1);
        layout.setAlignItems(FlexComponent.Alignment.CENTER);
        layout.add(new TextArea("Text area 2"));
        layout.add(new TextArea("Text area 3"));
        // end::layout[]

        this.setClassName("basic-layouts-example");
        layout.setClassName("height-4xl");

        this.add(layout);
    }

    public static class Exporter extends // hidden-source-line
            DemoExporter<BasicLayoutsHorizontalLayoutIndividualAlignment> { // hidden-source-line
    } // hidden-source-line
}
