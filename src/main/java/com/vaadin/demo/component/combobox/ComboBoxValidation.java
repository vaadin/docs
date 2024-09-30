package com.vaadin.demo.component.combobox;

import com.vaadin.flow.component.combobox.ComboBox;
import com.vaadin.flow.component.orderedlayout.HorizontalLayout;
import com.vaadin.flow.router.Route;
import com.vaadin.demo.DemoExporter; // hidden-source-line

@Route("combo-box-validation")
public class ComboBoxValidation extends HorizontalLayout {

    public ComboBoxValidation() {
        setPadding(false);

        // tag::snippet[]
        ComboBox<String> field = new ComboBox<>();
        field.setRequiredIndicatorVisible(true);
        field.setAllowedCharPattern("[A-Z]");
        // end::snippet[]
        field.setLabel("Country code");
        field.setHelperText("2-letter uppercase ISO country code");
        field.setItems("DE", "FI", "US");
        field.setAllowCustomValue(true);

        add(field);
    }

    public static class Exporter extends DemoExporter<ComboBoxValidation> { // hidden-source-line
    } // hidden-source-line
}
