package com.vaadin.demo.component.button;

import com.vaadin.flow.component.button.Button;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.orderedlayout.HorizontalLayout;
import com.vaadin.flow.router.Route;
import com.vaadin.demo.DemoExporter; // hidden-source-line

@Route("button-sizes")
public class ButtonSizes extends Div {
    public ButtonSizes() {
        // tag::snippet[]
        Button largeButton = new Button("Large");
        largeButton.addThemeNames("large");

        Button normalButton = new Button("Normal");
        normalButton.addThemeNames("normal");

        Button smallButton = new Button("Small");
        smallButton.addThemeNames("small");
        // end::snippet[]
        HorizontalLayout horizontalLayout = new HorizontalLayout(largeButton, normalButton, smallButton);
        horizontalLayout.getThemeList().add("spacing");
        add(horizontalLayout);
    }

    public static class Exporter extends DemoExporter<ButtonSizes> { // hidden-source-line
    } // hidden-source-line
}
