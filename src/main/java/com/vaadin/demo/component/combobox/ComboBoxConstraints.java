package com.vaadin.demo.component.combobox;

import com.vaadin.flow.component.combobox.ComboBox;
import com.vaadin.flow.component.orderedlayout.HorizontalLayout;
import com.vaadin.flow.router.Route;
import com.vaadin.demo.DemoExporter; // hidden-source-line

@Route("combo-box-constraints")
public class ComboBoxConstraints extends HorizontalLayout {

    public ComboBoxConstraints() {
        setPadding(false);



        ////  CHECK IF PATTERN ACTUALLY WORKS IN CB!!!

        // tag::snippet[]
        ComboBox<String> field = new ComboBox<>();
        field.setRequired(true);
        field.setAllowedCharPattern("[A-Z]");
        // end::snippet[]
        field.setLabel("Country code");
        field.setHelperText("2-letter uppercase ISO country code");
        field.setItems("DE", "FI", "US");
        field.setAllowCustomValue(true);

        add(field);
    }

    public static class Exporter extends DemoExporter<ComboBoxConstraints> { // hidden-source-line
    } // hidden-source-line
}
