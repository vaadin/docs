package com.vaadin.demo.component.radiobutton;

import com.vaadin.flow.component.orderedlayout.HorizontalLayout;
import com.vaadin.flow.component.radiobutton.RadioButtonGroup;
import com.vaadin.flow.component.radiobutton.RadioGroupVariant;
import com.vaadin.flow.router.Route;
import com.vaadin.demo.DemoExporter; // hidden-source-line

@Route("radio-button-group-styles")
public class RadioButtonGroupStyles extends HorizontalLayout {

    public RadioButtonGroupStyles() {
        setPadding(false);

        // tag::snippet[]
        RadioButtonGroup<String> field = new RadioButtonGroup<>();
        field.addThemeVariants(RadioGroupVariant.LUMO_HELPER_ABOVE_FIELD);
        field.getStyle().set("--vaadin-input-field-border-width", "1px");
        // end::snippet[]
        field.setLabel("Label");
        field.setHelperText("Helper text");
        field.setItems("Item 1", "Item 2", "Item 3");

        add(field);
    }

    public static class Exporter extends DemoExporter<RadioButtonGroupStyles> { // hidden-source-line
    } // hidden-source-line
}
