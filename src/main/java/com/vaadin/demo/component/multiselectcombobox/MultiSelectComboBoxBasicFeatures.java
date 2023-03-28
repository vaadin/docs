package com.vaadin.demo.component.multiselectcombobox;

import com.vaadin.flow.component.combobox.MultiSelectComboBox;
import com.vaadin.flow.component.orderedlayout.HorizontalLayout;
import com.vaadin.flow.router.Route;
import com.vaadin.demo.DemoExporter; // hidden-source-line

@Route("multi-select-combo-box-basic-features")
public class MultiSelectComboBoxBasicFeatures extends HorizontalLayout {

    public MultiSelectComboBoxBasicFeatures() {
        setPadding(false);

        // tag::snippet[]
        MultiSelectComboBox<String> field = new MultiSelectComboBox<>();
        field.setLabel("Label");
        field.setHelperText("Helper text");
        field.setPlaceholder("Placeholder");
        field.setTooltipText("Tooltip text");
        field.setClearButtonVisible(true);
        // end::snippet[]
        field.setItems("Value");

        add(field);
    }

    public static class Exporter extends DemoExporter<MultiSelectComboBoxBasicFeatures> { // hidden-source-line
    } // hidden-source-line
}
