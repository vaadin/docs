package com.vaadin.demo.component.numberfield;

import com.vaadin.demo.DemoExporter;
import com.vaadin.flow.component.html.Span;
import com.vaadin.flow.component.orderedlayout.HorizontalLayout;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.component.select.Select;
import com.vaadin.flow.component.textfield.NumberField;
import com.vaadin.flow.data.value.ValueChangeMode;
import com.vaadin.flow.router.Route;

import static com.vaadin.demo.component.Constants.valueChangeModes;

@Route("number-field-value-change-mode")
public class NumberFieldValueChangeMode extends VerticalLayout {

    public NumberFieldValueChangeMode() {
        setPadding(false);
        // tag::snippet[]
        var numberField = new NumberField("Number Field");
        var modeSelector = new Select<>("Value Change Mode", valueChangeModes);
        modeSelector.setValue(numberField.getValueChangeMode());
        modeSelector.addValueChangeListener(e -> {
            numberField.clear();
            numberField.setValueChangeMode(e.getValue());
        });
        var serverSideContent = new Span();
        numberField.addValueChangeListener(e -> serverSideContent
                .setText(e.getValue() == null ? "" : e.getValue().toString()));
        // end::snippet[]

        modeSelector.setItemLabelGenerator(ValueChangeMode::name);

        var horizontalLayout = new HorizontalLayout(numberField, modeSelector);
        horizontalLayout.setAlignItems(Alignment.BASELINE);

        var serverSideLayout = new HorizontalLayout(new Span("Server side:"),
                serverSideContent);

        add(horizontalLayout, serverSideLayout);
    }

    public static class Exporter
            extends DemoExporter<NumberFieldValueChangeMode> { // hidden-source-line
    } // hidden-source-line
}
