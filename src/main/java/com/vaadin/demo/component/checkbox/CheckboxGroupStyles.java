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
        field.addThemeVariants(CheckboxGroupVariant.HELPER_ABOVE);
        // end::snippet[]
        field.setLabel("Label");
        field.setHelperText("Helper text");
        field.setItems("Item 1", "Item 2", "Item 3");
        // Only for Lumo
        field.addThemeVariants(CheckboxGroupVariant.LUMO_VERTICAL);

        add(field);
    }

    public static class Exporter extends DemoExporter<CheckboxGroupStyles> { // hidden-source-line
    } // hidden-source-line
}
