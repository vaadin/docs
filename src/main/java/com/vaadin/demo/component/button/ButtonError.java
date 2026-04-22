package com.vaadin.demo.component.button;

import com.vaadin.flow.component.button.Button;
import com.vaadin.flow.component.button.ButtonVariant;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.orderedlayout.HorizontalLayout;
import com.vaadin.flow.router.Route;
import com.vaadin.demo.DemoExporter; // hidden-source-line

@Route("button-error")
public class ButtonError extends Div {
    public ButtonError() {
        // tag::snippet[]
        Button primaryButton = new Button("Primary");
        primaryButton.addThemeVariants(ButtonVariant.PRIMARY,
                ButtonVariant.ERROR);

        Button secondaryButton = new Button("Secondary");
        secondaryButton.addThemeVariants(ButtonVariant.ERROR);

        Button tertiaryButton = new Button("Tertiary");
        tertiaryButton.addThemeVariants(ButtonVariant.TERTIARY,
                ButtonVariant.ERROR);
        // end::snippet[]

        HorizontalLayout horizontalLayout = new HorizontalLayout(primaryButton,
                secondaryButton, tertiaryButton);
        add(horizontalLayout);
    }

    public static class Exporter extends DemoExporter<ButtonError> { // hidden-source-line
    } // hidden-source-line
}
