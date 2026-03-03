package com.vaadin.demo.component.textfield;

import com.vaadin.flow.component.orderedlayout.HorizontalLayout;
import com.vaadin.flow.component.textfield.TextField;
import com.vaadin.flow.component.textfield.TextFieldVariant;
import com.vaadin.flow.router.Route;
import com.vaadin.demo.DemoExporter; // hidden-source-line

@Route("text-field-styles")
public class TextFieldStyles extends HorizontalLayout {

    public TextFieldStyles() {
        setPadding(false);

        // tag::snippet[]
        TextField field = new TextField();
        field.addThemeVariants(TextFieldVariant.SMALL,
                TextFieldVariant.ALIGN_RIGHT,
                TextFieldVariant.HELPER_ABOVE);
        // end::snippet[]
        field.setLabel("Label");
        field.setHelperText("Helper text");
        field.setValue("Value");

        add(field);
    }

    public static class Exporter extends DemoExporter<TextFieldStyles> { // hidden-source-line
    } // hidden-source-line
}
