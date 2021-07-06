package com.vaadin.demo.component.button;

import com.vaadin.flow.component.button.Button;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.orderedlayout.HorizontalLayout;
import com.vaadin.flow.router.Route;
import com.vaadin.demo.DemoExporter; // hidden-source-line

@Route("button-disabled")
public class ButtonDisabled extends Div {
    public ButtonDisabled() {
        // tag::snippet[]
        Button primaryButton = new Button("Primary");
        primaryButton.getElement().setAttribute("disabled", "true");
        primaryButton.addThemeNames("primary");

        Button secondaryButton = new Button("Secondary");
        secondaryButton.getElement().setAttribute("disabled", "true");
        secondaryButton.addThemeNames("secondary");

        Button tertiaryButton = new Button("Tertiary");
        tertiaryButton.getElement().setAttribute("disabled", "true");
        tertiaryButton.addThemeNames("tertiary");
        // end::snippet[]
        HorizontalLayout horizontalLayout = new HorizontalLayout(primaryButton, secondaryButton, tertiaryButton);
        horizontalLayout.getThemeList().add("spacing");
        add(horizontalLayout);
    }

    public static class Exporter extends DemoExporter<ButtonDisabled> { // hidden-source-line
    } // hidden-source-line
}