package com.vaadin.demo.component.numberfield;

import com.vaadin.flow.component.html.Span;
import com.vaadin.flow.component.icon.VaadinIcon;
import com.vaadin.flow.component.orderedlayout.HorizontalLayout;
import com.vaadin.flow.component.textfield.NumberField;
import com.vaadin.flow.router.Route;
import com.vaadin.demo.DemoExporter; // hidden-source-line

@Route("number-field-basic-features")
public class NumberFieldBasicFeatures extends HorizontalLayout {

    public NumberFieldBasicFeatures() {
        setPadding(false);

        // tag::snippet[]
        NumberField field = new NumberField();
        field.setLabel("Label");
        field.setHelperText("Helper text");
        field.setPlaceholder("Placeholder");
        field.setTooltipText("Tooltip text");
        field.setClearButtonVisible(true);
        field.setPrefixComponent(new Span("$"));
        field.setSuffixComponent(VaadinIcon.DOLLAR.create());
        // end::snippet[]

        add(field);
    }

    public static class Exporter extends DemoExporter<NumberFieldBasicFeatures> { // hidden-source-line
    } // hidden-source-line
}
