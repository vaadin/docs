package com.vaadin.demo.component.checkbox;

import com.vaadin.flow.component.checkbox.Checkbox;
import com.vaadin.flow.component.checkbox.CheckboxGroup;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.router.Route;
import com.vaadin.demo.DemoExporter; // hidden-source-line

@Route("checkbox-group-basic-features")
public class CheckboxGroupBasicFeatures extends VerticalLayout {

    public CheckboxGroupBasicFeatures() {
        setPadding(false);

        // tag::snippet[]
        Checkbox checkbox = new Checkbox();
        checkbox.setLabel("Label");
        checkbox.setHelperText("Helper text");

        CheckboxGroup<String> field = new CheckboxGroup<>();
        field.setLabel("Label");
        field.setHelperText("Helper text");
        field.setTooltipText("Tooltip text");
        // end::snippet[]
        field.setItems("Item 1", "Item 2", "Item 3");

        add(checkbox, field);
    }

    public static class Exporter extends // hidden-source-line
            DemoExporter<CheckboxGroupBasicFeatures> { // hidden-source-line
    } // hidden-source-line
}
