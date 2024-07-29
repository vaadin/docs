package com.vaadin.demo.component.button;

import com.vaadin.flow.component.button.Button;
import com.vaadin.flow.component.button.ButtonVariant;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.orderedlayout.HorizontalLayout;
import com.vaadin.flow.router.Route;
import com.vaadin.demo.DemoExporter; // hidden-source-line

@Route("button-danger")
public class ButtonDanger extends Div {
    public ButtonDanger() {
        // tag::snippet[]
        Button primaryErrorButton = new Button("Primary");
        primaryErrorButton.addThemeVariants(ButtonVariant.LUMO_PRIMARY,
                ButtonVariant.LUMO_ERROR);

        Button secondaryErrorButton = new Button("Secondary");
        secondaryErrorButton.addThemeVariants(ButtonVariant.LUMO_ERROR);

        Button tertiaryErrorButton = new Button("Tertiary");
        tertiaryErrorButton.addThemeVariants(ButtonVariant.LUMO_TERTIARY,
                ButtonVariant.LUMO_ERROR);

        Button primaryWarningButton = new Button("Primary");
        primaryWarningButton.addThemeVariants(ButtonVariant.LUMO_PRIMARY,
                ButtonVariant.LUMO_WARNING);

        Button secondaryWarningButton = new Button("Secondary");
        secondaryWarningButton.addThemeVariants(ButtonVariant.LUMO_WARNING);

        Button tertiaryWarningButton = new Button("Tertiary");
        tertiaryWarningButton.addThemeVariants(ButtonVariant.LUMO_TERTIARY,
                ButtonVariant.LUMO_WARNING);
        // end::snippet[]

        HorizontalLayout horizontalLayout = new HorizontalLayout(primaryErrorButton,
                secondaryErrorButton, tertiaryErrorButton, primaryWarningButton,
                secondaryWarningButton, tertiaryWarningButton);

        add(horizontalLayout);
    }

    public static class Exporter extends DemoExporter<ButtonDanger> { // hidden-source-line
    } // hidden-source-line
}
