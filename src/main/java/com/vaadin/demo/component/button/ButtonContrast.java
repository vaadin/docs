package com.vaadin.demo.component.button;

import com.vaadin.flow.component.button.Button;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.orderedlayout.HorizontalLayout;
import com.vaadin.flow.router.Route;
import com.vaadin.demo.DemoExporter; // hidden-source-line

@Route("button-contrast")
public class ButtonContrast extends Div {
    public ButtonContrast() {
        // tag::snippet[]
        Button primaryButton = new Button("Primary");
        primaryButton.addThemeNames("primary contrast");

        Button secondaryButton = new Button("Secondary");
        secondaryButton.addThemeNames("secondary contrast");

        Button tertiaryButton = new Button("Tertiary (avoid)");
        tertiaryButton.addThemeNames("tertiary contrast");
        // end::snippet[]
        HorizontalLayout horizontalLayout = new HorizontalLayout(primaryButton, secondaryButton, tertiaryButton);
        add(horizontalLayout);
    }

    public static class Exporter extends DemoExporter<ButtonContrast> { // hidden-source-line
    } // hidden-source-line
}