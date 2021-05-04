package com.vaadin.demo.component.checkbox;

import com.vaadin.flow.component.checkbox.CheckboxGroup;
import com.vaadin.flow.component.checkbox.CheckboxGroupVariant;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.router.Route;
import com.vaadin.demo.DemoExporter; // hidden-source-line

@Route("checkbox-disabled")
public class CheckboxDisabled extends Div {

    public CheckboxDisabled() {
        // tag::snippet[]
        CheckboxGroup<String> disabledCheckGroup = new CheckboxGroup<>();
        disabledCheckGroup.setLabel("Departments");
        disabledCheckGroup.setItems("Engineering", "Human Resources", "Marketing", "Operations", "Sales");
        disabledCheckGroup.addThemeVariants(CheckboxGroupVariant.LUMO_VERTICAL);
        disabledCheckGroup.setEnabled(false);
        add(disabledCheckGroup);
        // end::snippet[]
    }

    public static class Exporter extends DemoExporter<CheckboxDisabled> { // hidden-source-line
    } // hidden-source-line
}
