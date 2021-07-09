package com.vaadin.demo.component.button;

import com.vaadin.flow.component.button.Button;
import com.vaadin.flow.component.button.ButtonVariant;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.orderedlayout.HorizontalLayout;
import com.vaadin.flow.router.Route;
import com.vaadin.demo.DemoExporter; // hidden-source-line

@Route("button-sizes")
public class ButtonSizes extends Div {
    public ButtonSizes() {
        // tag::snippet[]
        Button largeButton = new Button("Large");
        largeButton.addThemeVariants(ButtonVariant.LUMO_LARGE);

        Button normalButton = new Button("Normal");

        Button smallButton = new Button("Small");
        smallButton.addThemeVariants(ButtonVariant.LUMO_SMALL);
        // end::snippet[]

        HorizontalLayout horizontalLayout = new HorizontalLayout(largeButton, normalButton, smallButton);
        add(horizontalLayout);
    }

    public static class Exporter extends DemoExporter<ButtonSizes> { // hidden-source-line
    } // hidden-source-line
}
