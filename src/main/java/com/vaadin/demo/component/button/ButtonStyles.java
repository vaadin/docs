package com.vaadin.demo.component.button;

import com.vaadin.flow.component.button.Button;
import static com.vaadin.flow.component.button.ButtonVariant.*;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.orderedlayout.HorizontalLayout;
import com.vaadin.flow.router.Route;
import com.vaadin.demo.DemoExporter; // hidden-source-line

@Route("button-styles")
public class ButtonStyles extends Div {
    public ButtonStyles() {
        // tag::snippet[]
        Button primaryButton = new Button("Primary");
        primaryButton.addThemeVariants(LUMO_PRIMARY);

        Button secondaryButton = new Button("Secondary");

        Button tertiaryButton = new Button("Tertiary");
        tertiaryButton.addThemeVariants(LUMO_TERTIARY);
        // end::snippet[]
        HorizontalLayout horizontalLayout = new HorizontalLayout(primaryButton, secondaryButton, tertiaryButton);
        add(horizontalLayout);
    }

    public static class Exporter extends DemoExporter<ButtonStyles> { // hidden-source-line
    } // hidden-source-line
}
