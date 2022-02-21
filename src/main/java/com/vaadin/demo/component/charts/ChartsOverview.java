package com.vaadin.demo.component.charts;

import com.vaadin.demo.DemoExporter;
import com.vaadin.flow.component.button.Button;
import com.vaadin.flow.component.button.ButtonVariant;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.orderedlayout.HorizontalLayout;
import com.vaadin.flow.router.Route;

@Route("charts-overview")
public class ChartsOverview extends Div {
    public ChartsOverview() {
        // tag::snippet[]
        Button primaryButton = new Button("Primary");
        primaryButton.addThemeVariants(ButtonVariant.LUMO_PRIMARY);

        Button secondaryButton = new Button("Secondary");

        Button tertiaryButton = new Button("Tertiary");
        tertiaryButton.addThemeVariants(ButtonVariant.LUMO_TERTIARY);
        // end::snippet[]

        HorizontalLayout horizontalLayout = new HorizontalLayout(primaryButton, secondaryButton, tertiaryButton);
        add(horizontalLayout);
    }

    public static class Exporter extends DemoExporter<ChartsOverview> { // hidden-source-line
    } // hidden-source-line
}
