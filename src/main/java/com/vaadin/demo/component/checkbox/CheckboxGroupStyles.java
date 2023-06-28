package com.vaadin.demo.component.checkbox;

import com.vaadin.flow.component.orderedlayout.HorizontalLayout;
import com.vaadin.flow.component.checkbox.CheckboxGroup;
import com.vaadin.flow.component.checkbox.CheckboxGroupVariant;
import com.vaadin.flow.router.Route;
import com.vaadin.demo.DemoExporter; // hidden-source-line

@Route("checkbox-group-styles")
public class CheckboxGroupStyles extends HorizontalLayout {

    public CheckboxGroupStyles() {
        setPadding(false);

        // tag::snippet[]
        CheckboxGroup<String> field = new CheckboxGroup<>();
        field.addThemeVariants(CheckboxGroupVariant.LUMO_HELPER_ABOVE_FIELD);
        field.getStyle().set("--vaadin-input-field-border-width", "1px");
        // end::snippet[]
        field.setLabel("Label");
        field.setHelperText("Helper text");
        field.setItems("Item 1", "Item 2", "Item 3");

        add(field);
    }

    public static class Exporter extends DemoExporter<CheckboxGroupStyles> { // hidden-source-line
    } // hidden-source-line
}
