package com.vaadin.demo.component.numberfield;

import com.vaadin.flow.component.orderedlayout.HorizontalLayout;
import com.vaadin.flow.component.textfield.NumberField;
import com.vaadin.flow.component.textfield.TextFieldVariant;
import com.vaadin.flow.router.Route;
import com.vaadin.demo.DemoExporter; // hidden-source-line

@Route("number-field-styles")
public class NumberFieldStyles extends HorizontalLayout {

    public NumberFieldStyles() {
        setPadding(false);

        // tag::snippet[]
        NumberField field = new NumberField();
        field.addThemeVariants(
            TextFieldVariant.LUMO_SMALL,
            TextFieldVariant.LUMO_ALIGN_RIGHT,
            TextFieldVariant.LUMO_HELPER_ABOVE_FIELD
        );
        field.getStyle().set("--vaadin-input-field-border-width", "1px");
        // end::snippet[]
        field.setLabel("Label");
        field.setHelperText("Helper text");
        field.setValue(123.45d);

        add(field);
    }

    public static class Exporter extends DemoExporter<NumberFieldStyles> { // hidden-source-line
    } // hidden-source-line
}
