package com.vaadin.demo.component.multiselectcombobox;

import com.vaadin.flow.component.combobox.MultiSelectComboBox;
import com.vaadin.flow.component.combobox.MultiSelectComboBoxVariant;
import com.vaadin.flow.component.orderedlayout.HorizontalLayout;
import com.vaadin.flow.router.Route;
import com.vaadin.demo.DemoExporter; // hidden-source-line

@Route("multi-select-combo-box-styles")
public class MultiSelectComboBoxStyles extends HorizontalLayout {

    public MultiSelectComboBoxStyles() {
        setPadding(false);

        // tag::snippet[]
        MultiSelectComboBox<String> field = new MultiSelectComboBox<>();
        field.addThemeVariants(
            MultiSelectComboBoxVariant.LUMO_SMALL,
            MultiSelectComboBoxVariant.LUMO_ALIGN_RIGHT,
            MultiSelectComboBoxVariant.LUMO_HELPER_ABOVE_FIELD
        );
        // end::snippet[]
        field.setLabel("Label");
        field.setHelperText("Helper text");
        field.setItems("Value");
        field.setValue("Value");

        add(field);
    }

    public static class Exporter extends DemoExporter<MultiSelectComboBoxStyles> { // hidden-source-line
    } // hidden-source-line
}
