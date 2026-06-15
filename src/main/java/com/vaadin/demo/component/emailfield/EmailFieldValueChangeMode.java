package com.vaadin.demo.component.emailfield;

import com.vaadin.demo.DemoExporter;
import com.vaadin.flow.component.html.Span;
import com.vaadin.flow.component.orderedlayout.HorizontalLayout;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.component.select.Select;
import com.vaadin.flow.component.textfield.EmailField;
import com.vaadin.flow.data.value.ValueChangeMode;
import com.vaadin.flow.router.Route;

import static com.vaadin.demo.component.Constants.valueChangeModes;

@Route("email-field-value-change-mode")
public class EmailFieldValueChangeMode extends VerticalLayout {

    public EmailFieldValueChangeMode() {
        setPadding(false);
        // tag::snippet[]
        var emailField = new EmailField("Email Field");
        var modeSelector = new Select<>("Value Change Mode", valueChangeModes);
        modeSelector.setValue(emailField.getValueChangeMode());
        modeSelector.addValueChangeListener(e -> {
            emailField.clear();
            emailField.setValueChangeMode(e.getValue());
        });
        var serverSideContent = new Span();
        emailField.addValueChangeListener(
                e -> serverSideContent.setText(e.getValue()));
        // end::snippet[]

        modeSelector.setItemLabelGenerator(ValueChangeMode::name);

        var horizontalLayout = new HorizontalLayout(emailField, modeSelector);
        horizontalLayout.setAlignItems(Alignment.BASELINE);

        var serverSideLayout = new HorizontalLayout(new Span("Server side:"),
                serverSideContent);

        add(horizontalLayout, serverSideLayout);
    }

    public static class Exporter
            extends DemoExporter<EmailFieldValueChangeMode> { // hidden-source-line
    } // hidden-source-line
}
