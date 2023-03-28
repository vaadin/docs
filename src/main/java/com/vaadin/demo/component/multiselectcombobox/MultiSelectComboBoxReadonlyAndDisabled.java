package com.vaadin.demo.component.multiselectcombobox;

import com.vaadin.flow.component.combobox.ComboBox;
import com.vaadin.flow.component.combobox.MultiSelectComboBox;
import com.vaadin.flow.component.orderedlayout.HorizontalLayout;
import com.vaadin.flow.router.Route;
import com.vaadin.demo.DemoExporter; // hidden-source-line

@Route("multi-select-combo-box-readonly-and-disabled")
public class MultiSelectComboBoxReadonlyAndDisabled extends HorizontalLayout {

    public MultiSelectComboBoxReadonlyAndDisabled() {
        setPadding(false);

        // tag::snippet[]
        MultiSelectComboBox<String> readonlyField = new MultiSelectComboBox<>();
        readonlyField.setReadOnly(true);
        readonlyField.setLabel("Read-only");
        readonlyField.setItems("Value");
        readonlyField.setValue("Value");

        ComboBox<String> disabledField = new ComboBox<>();
        disabledField.setEnabled(false);
        disabledField.setLabel("Disabled");
        // end::snippet[]
        add(readonlyField, disabledField);
    }

    public static class Exporter extends DemoExporter<MultiSelectComboBoxReadonlyAndDisabled> { // hidden-source-line
    } // hidden-source-line
}
