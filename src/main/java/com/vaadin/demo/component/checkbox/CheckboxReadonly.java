package com.vaadin.demo.component.checkbox;

import com.vaadin.flow.component.checkbox.CheckboxGroup;
import com.vaadin.flow.component.checkbox.CheckboxGroupVariant;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.router.Route;

import com.vaadin.demo.DemoExporter; // hidden-source-line

@Route("checkbox-readonly")
public class CheckboxReadonly extends Div {

    public CheckboxReadonly() {
        // tag::snippet[]
        CheckboxGroup<String> checkboxGroup = new CheckboxGroup<>();
        checkboxGroup.setLabel("Export data");
        checkboxGroup.setItems("Order ID", "Product name", "Customer",
                "Status");
        checkboxGroup.select("Order ID", "Customer");
        checkboxGroup.setReadOnly(true);
        checkboxGroup.addThemeVariants(CheckboxGroupVariant.LUMO_VERTICAL);
        add(checkboxGroup);
        // end::snippet[]
    }

    public static class Exporter extends DemoExporter<CheckboxReadonly> { // hidden-source-line
    } // hidden-source-line
}
