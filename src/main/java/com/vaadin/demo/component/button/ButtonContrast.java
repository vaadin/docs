package com.vaadin.demo.component.button;

import com.vaadin.flow.component.button.Button;
import static com.vaadin.flow.component.button.ButtonVariant.*;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.orderedlayout.HorizontalLayout;
import com.vaadin.flow.router.Route;
import com.vaadin.demo.DemoExporter; // hidden-source-line

@Route("button-contrast")
public class ButtonContrast extends Div {
    public ButtonContrast() {
        // tag::snippet[]
        Button primaryButton = new Button("Primary");
        primaryButton.addThemeVariants(LUMO_PRIMARY, LUMO_CONTRAST);

        Button secondaryButton = new Button("Secondary");
        secondaryButton.addThemeVariants(LUMO_CONTRAST);

        Button tertiaryButton = new Button("Tertiary (avoid)");
        tertiaryButton.addThemeVariants(LUMO_TERTIARY, LUMO_CONTRAST);
        // end::snippet[]

        HorizontalLayout horizontalLayout = new HorizontalLayout(primaryButton, secondaryButton, tertiaryButton);
        add(horizontalLayout);
    }

    public static class Exporter extends DemoExporter<ButtonContrast> { // hidden-source-line
    } // hidden-source-line
}