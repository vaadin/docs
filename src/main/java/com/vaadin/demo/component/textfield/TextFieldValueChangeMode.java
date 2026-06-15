package com.vaadin.demo.component.textfield;

import com.vaadin.demo.DemoExporter;
import com.vaadin.flow.component.html.Span;
import com.vaadin.flow.component.orderedlayout.HorizontalLayout;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.component.select.Select;
import com.vaadin.flow.component.textfield.TextField;
import com.vaadin.flow.data.value.ValueChangeMode;
import com.vaadin.flow.router.Route;

import static com.vaadin.demo.component.Constants.valueChangeModes;

@Route("text-field-value-change-mode")
public class TextFieldValueChangeMode extends VerticalLayout {

    public TextFieldValueChangeMode() {
        setPadding(false);

        // tag::snippet[]
        var textField = new TextField("Text Field");
        var modeSelector = new Select<>("Value Change Mode", valueChangeModes);
        modeSelector.setValue(textField.getValueChangeMode());
        modeSelector.addValueChangeListener(e -> {
            textField.clear();
            textField.setValueChangeMode(e.getValue());
        });
        var serverSideContent = new Span();
        textField.addValueChangeListener(
                e -> serverSideContent.setText(e.getValue()));
        // end::snippet[]

        modeSelector.setItemLabelGenerator(ValueChangeMode::name);

        var horizontalLayout = new HorizontalLayout(textField, modeSelector);
        horizontalLayout.setAlignItems(Alignment.BASELINE);

        var serverSideLayout = new HorizontalLayout(new Span("Server side:"),
                serverSideContent);

        add(horizontalLayout, serverSideLayout);
    }

    public static class Exporter
            extends DemoExporter<TextFieldValueChangeMode> { // hidden-source-line
    } // hidden-source-line
}
