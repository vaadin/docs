package com.vaadin.demo.component.combobox;

import com.vaadin.flow.component.combobox.ComboBox;
import com.vaadin.flow.component.combobox.ComboBoxVariant;
import com.vaadin.flow.component.orderedlayout.HorizontalLayout;
import com.vaadin.flow.component.textfield.TextFieldVariant;
import com.vaadin.flow.router.Route;
import com.vaadin.demo.DemoExporter; // hidden-source-line

@Route("combo-box-styles")
public class ComboBoxStyles extends HorizontalLayout {

    public ComboBoxStyles() {
        setPadding(false);

        // tag::snippet[]
        ComboBox<String> field = new ComboBox<>();
        field.addThemeVariants(
            ComboBoxVariant.LUMO_SMALL,
            ComboBoxVariant.LUMO_ALIGN_RIGHT,
            ComboBoxVariant.LUMO_HELPER_ABOVE_FIELD
        );
        // end::snippet[]
        field.setLabel("Label");
        field.setHelperText("Helper text");
        field.setItems("Value");
        field.setValue("Value");

        add(field);
    }

    public static class Exporter extends DemoExporter<ComboBoxStyles> { // hidden-source-line
    } // hidden-source-line
}
