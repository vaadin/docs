package com.vaadin.demo.component.button;

import com.vaadin.flow.component.button.Button;
import com.vaadin.flow.component.button.ButtonVariant;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.router.Route;
import com.vaadin.demo.DemoExporter; // hidden-source-line

@Route("button-tertiary-inline")
public class ButtonTertiaryInline extends Div {
    public ButtonTertiaryInline() {
        // tag::snippet[]
        Button tertiaryInlineButton = new Button("Tertiary inline");
        tertiaryInlineButton.addThemeVariants(ButtonVariant.LUMO_TERTIARY_INLINE);
        // end::snippet[]

        add(tertiaryInlineButton);
    }

    public static class Exporter extends DemoExporter<ButtonTertiaryInline> { // hidden-source-line
    } // hidden-source-line
}
