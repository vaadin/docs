package com.vaadin.demo.component.basiclayouts;

import com.vaadin.demo.DemoExporter; // hidden-source-line
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.button.Button;
import com.vaadin.flow.component.button.ButtonVariant;
import com.vaadin.flow.component.orderedlayout.FlexComponent;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.component.orderedlayout.FlexComponent.Alignment;
import com.vaadin.flow.router.Route;

@Route("basic-layouts/vertical-layout-individual-alignment")
public class BasicLayoutsVerticalLayoutIndividualAlignment extends Div {

    public BasicLayoutsVerticalLayoutIndividualAlignment() {
        // tag::layout[]
        Button button1 = new Button("Button 1");
        button1.addThemeVariants(ButtonVariant.LUMO_PRIMARY);
        VerticalLayout layout = new VerticalLayout();
        layout.add(button1);
        layout.setAlignSelf(Alignment.END, button1);
        layout.setAlignItems(FlexComponent.Alignment.CENTER);
        layout.add(new Button("Button 2"));
        layout.add(new Button("Button 3"));
        // end::layout[]

        this.setClassName("basic-layouts-example");

        this.add(layout);
    }

    public static class Exporter extends // hidden-source-line
            DemoExporter<BasicLayoutsVerticalLayoutIndividualAlignment> { // hidden-source-line
    } // hidden-source-line
}
