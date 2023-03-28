package com.vaadin.demo.component.multiselectcombobox;

import com.vaadin.flow.component.combobox.MultiSelectComboBox;
import com.vaadin.flow.component.orderedlayout.HorizontalLayout;
import com.vaadin.flow.router.Route;
import com.vaadin.demo.DemoExporter; // hidden-source-line

@Route("multi-select-combo-box-constraints")
public class MultiSelectComboBoxConstraints extends HorizontalLayout {

    public MultiSelectComboBoxConstraints() {
        setPadding(false);

        // tag::snippet[]
        MultiSelectComboBox<String> field = new MultiSelectComboBox<>();
        field.setRequiredIndicatorVisible(true);
        field.setAllowedCharPattern("[A-Z]");
        // end::snippet[]
        field.setLabel("Country code");
        field.setHelperText("2-letter uppercase ISO country code");
        field.setItems("DE", "FI", "US");
        field.setAllowCustomValue(true);

        add(field);
    }

    public static class Exporter extends DemoExporter<MultiSelectComboBoxConstraints> { // hidden-source-line
    } // hidden-source-line
}
