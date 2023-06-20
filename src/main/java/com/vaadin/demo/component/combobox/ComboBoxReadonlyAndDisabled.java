package com.vaadin.demo.component.combobox;

import com.vaadin.flow.component.combobox.ComboBox;
import com.vaadin.flow.component.orderedlayout.HorizontalLayout;
import com.vaadin.flow.router.Route;
import com.vaadin.demo.DemoExporter; // hidden-source-line

@Route("combo-box-readonly-and-disabled")
public class ComboBoxReadonlyAndDisabled extends HorizontalLayout {

    public ComboBoxReadonlyAndDisabled() {
        setPadding(false);

        // tag::snippet[]
        ComboBox<String> readonlyField = new ComboBox<>();
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

    public static class Exporter extends DemoExporter<ComboBoxReadonlyAndDisabled> { // hidden-source-line
    } // hidden-source-line
}
