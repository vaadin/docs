package com.vaadin.demo.component.checkbox;

import com.vaadin.flow.component.checkbox.CheckboxGroup;
import com.vaadin.flow.component.checkbox.CheckboxGroupVariant;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.router.Route;

import com.vaadin.demo.DemoExporter; // hidden-source-line

@Route("checkbox-group-basic")
public class CheckboxGroupBasic extends Div {

    public CheckboxGroupBasic() {
        // tag::snippet[]
        CheckboxGroup<String> checkboxGroup = new CheckboxGroup<>();
        checkboxGroup.setLabel("Export data");
        checkboxGroup.setItems("Order ID", "Product name", "Customer",
                "Status");
        checkboxGroup.select("Order ID", "Customer");
        add(checkboxGroup);
        // end::snippet[]

        // Only for Lumo
        checkboxGroup.addThemeVariants(CheckboxGroupVariant.LUMO_VERTICAL);
    }

    public static class Exporter extends DemoExporter<CheckboxGroupBasic> { // hidden-source-line
    } // hidden-source-line
}
