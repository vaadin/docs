package com.vaadin.demo.component.checkbox;

import com.vaadin.flow.component.checkbox.CheckboxGroup;
import com.vaadin.flow.component.checkbox.CheckboxGroupVariant;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.router.Route;
import com.vaadin.demo.DemoExporter; // hidden-source-line

@Route("checkbox-horizontal")
public class CheckboxHorizontal extends Div {

    public CheckboxHorizontal() {
        // tag::snippet[]
        CheckboxGroup<String> checkboxGroup = new CheckboxGroup<>();
        checkboxGroup.setLabel("Permissions");
        checkboxGroup.setItems("Read", "Edit", "Delete");
        add(checkboxGroup);
        // end::snippet[]
    }

    public static class Exporter extends DemoExporter<CheckboxHorizontal> { // hidden-source-line
    } // hidden-source-line
}
