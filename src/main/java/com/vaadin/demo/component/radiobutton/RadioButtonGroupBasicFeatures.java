package com.vaadin.demo.component.radiobutton;

import com.vaadin.flow.component.orderedlayout.HorizontalLayout;
import com.vaadin.flow.component.radiobutton.RadioButtonGroup;
import com.vaadin.flow.router.Route;
import com.vaadin.demo.DemoExporter; // hidden-source-line

@Route("radio-button-group-basic-features")
public class RadioButtonGroupBasicFeatures extends HorizontalLayout {

    public RadioButtonGroupBasicFeatures() {
        setPadding(false);

        // tag::snippet[]
        RadioButtonGroup<String> field = new RadioButtonGroup<>();
        field.setLabel("Label");
        field.setHelperText("Helper text");
        field.setTooltipText("Tooltip text");
        // end::snippet[]
        field.setItems("Item 1", "Item 2", "Item 3");

        add(field);
    }

    public static class Exporter extends DemoExporter<RadioButtonGroupBasicFeatures> { // hidden-source-line
    } // hidden-source-line
}
