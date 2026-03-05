package com.vaadin.demo.component.customfield;

import com.vaadin.demo.DemoExporter; // hidden-source-line
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.router.Route;
import com.vaadin.flow.component.customfield.CustomFieldVariant;

@Route("custom-field-styles")
public class CustomFieldStyles extends Div {

    public CustomFieldStyles() {
        // tag::snippet[]
        MoneyField moneyField = new MoneyField("Price");
        moneyField.addThemeVariants(CustomFieldVariant.SMALL,
                CustomFieldVariant.HELPER_ABOVE);
        // end::snippet[]
        moneyField.setHelperText("Helper text");
        add(moneyField);
    }

    public static class Exporter extends DemoExporter<CustomFieldStyles> { // hidden-source-line
    } // hidden-source-line
}
