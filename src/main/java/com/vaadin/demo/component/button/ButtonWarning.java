package com.vaadin.demo.component.button;

import com.vaadin.flow.component.button.Button;
import com.vaadin.flow.component.button.ButtonVariant;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.orderedlayout.HorizontalLayout;
import com.vaadin.flow.router.Route;
import com.vaadin.demo.DemoExporter; // hidden-source-line

@Route("button-warning")
public class ButtonWarning extends Div {
    public ButtonWarning() {
        // tag::snippet[]
        Button primaryButton = new Button("Primary");
        primaryButton.addThemeVariants(ButtonVariant.PRIMARY,
                ButtonVariant.WARNING);

        Button secondaryButton = new Button("Secondary");
        secondaryButton.addThemeVariants(ButtonVariant.WARNING);

        Button tertiaryButton = new Button("Tertiary");
        tertiaryButton.addThemeVariants(ButtonVariant.TERTIARY,
                ButtonVariant.WARNING);
        // end::snippet[]

        HorizontalLayout horizontalLayout = new HorizontalLayout(primaryButton,
                secondaryButton, tertiaryButton);
        add(horizontalLayout);
    }

    public static class Exporter extends DemoExporter<ButtonWarning> { // hidden-source-line
    } // hidden-source-line
}
