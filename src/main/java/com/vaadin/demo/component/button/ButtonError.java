package com.vaadin.demo.component.button;

import com.vaadin.flow.component.button.Button;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.orderedlayout.HorizontalLayout;
import com.vaadin.flow.router.Route;
import com.vaadin.demo.DemoExporter; // hidden-source-line

@Route("button-error")
public class ButtonError extends Div {
    public ButtonError() {
        // tag::snippet[]
        Button primaryButton = new Button("Primary");
        primaryButton.addThemeNames("primary error");

        Button secondaryButton = new Button("Secondary");
        secondaryButton.addThemeNames("secondary error");

        Button tertiaryButton = new Button("Tertiary");
        tertiaryButton.addThemeNames("tertiary error");
        // end::snippet[]
        HorizontalLayout horizontalLayout = new HorizontalLayout(primaryButton, secondaryButton, tertiaryButton);
        horizontalLayout.getThemeList().add("spacing");
        add(horizontalLayout);
    }

    public static class Exporter extends DemoExporter<ButtonError> { // hidden-source-line
    } // hidden-source-line
}