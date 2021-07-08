package com.vaadin.demo.component.button;

import com.vaadin.flow.component.button.Button;
import static com.vaadin.flow.component.button.ButtonVariant.*;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.orderedlayout.HorizontalLayout;
import com.vaadin.flow.router.Route;
import com.vaadin.demo.DemoExporter; // hidden-source-line

@Route("button-success")
public class ButtonSuccess extends Div {
    public ButtonSuccess() {
        // tag::snippet[]
        Button primaryButton = new Button("Primary");
        primaryButton.addThemeVariants(LUMO_PRIMARY, LUMO_SUCCESS);

        Button secondaryButton = new Button("Secondary");
        secondaryButton.addThemeVariants(LUMO_SUCCESS);

        Button tertiaryButton = new Button("Tertiary");
        tertiaryButton.addThemeVariants(LUMO_TERTIARY, LUMO_SUCCESS);
        // end::snippet[]

        HorizontalLayout horizontalLayout = new HorizontalLayout(primaryButton, secondaryButton, tertiaryButton);
        add(horizontalLayout);
    }

    public static class Exporter extends DemoExporter<ButtonSuccess> { // hidden-source-line
    } // hidden-source-line
}

