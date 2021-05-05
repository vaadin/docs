package com.vaadin.demo.component.checkbox;

import com.vaadin.flow.component.checkbox.CheckboxGroup;
import com.vaadin.flow.component.checkbox.CheckboxGroupVariant;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.router.Route;
import com.vaadin.demo.DemoExporter; // hidden-source-line

@Route("checkbox-vertical")
public class CheckboxVertical extends Div {

    public CheckboxVertical() {
        // tag::snippet[]
        CheckboxGroup<String> checkboxGroup = new CheckboxGroup<>();
        checkboxGroup.setLabel("Working days");
        checkboxGroup.setItems("Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday");
        checkboxGroup.addThemeVariants(CheckboxGroupVariant.LUMO_VERTICAL);
        add(checkboxGroup);
        // end::snippet[]
    }

    public static class Exporter extends DemoExporter<CheckboxVertical> { // hidden-source-line
    } // hidden-source-line
}
