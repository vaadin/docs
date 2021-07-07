package com.vaadin.demo.component.button;

import com.vaadin.flow.component.button.Button;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.orderedlayout.HorizontalLayout;
import com.vaadin.flow.router.Route;
import com.vaadin.demo.DemoExporter; // hidden-source-line

@Route("button-success")
public class ButtonSuccess extends Div {
    public ButtonSuccess() {
        // tag::snippet[]
        Button primaryButton = new Button("Primary");
        primaryButton.addThemeNames("primary success");

        Button secondaryButton = new Button("Secondary");
        secondaryButton.addThemeNames("secondary success");

        Button tertiaryButton = new Button("Tertiary");
        tertiaryButton.addThemeNames("tertiary success");
        // end::snippet[]
        HorizontalLayout horizontalLayout = new HorizontalLayout(primaryButton, secondaryButton, tertiaryButton);
        add(horizontalLayout);
    }

    public static class Exporter extends DemoExporter<ButtonSuccess> { // hidden-source-line
    } // hidden-source-line
}

