package com.vaadin.demo.component.passwordfield;

import com.vaadin.demo.DemoExporter;
import com.vaadin.flow.component.html.Span;
import com.vaadin.flow.component.orderedlayout.HorizontalLayout;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.component.select.Select;
import com.vaadin.flow.component.textfield.PasswordField;
import com.vaadin.flow.data.value.ValueChangeMode;
import com.vaadin.flow.router.Route;

import static com.vaadin.demo.component.Constants.valueChangeModes;

@Route("password-field-value-change-mode")
public class PasswordFieldValueChangeMode extends VerticalLayout {

    public PasswordFieldValueChangeMode() {
        setPadding(false);

        // tag::snippet[]
        var passwordField = new PasswordField("Password Field");
        var modeSelector = new Select<>("Value Change Mode", valueChangeModes);
        modeSelector.setValue(passwordField.getValueChangeMode());
        modeSelector.addValueChangeListener(e -> {
            passwordField.clear();
            passwordField.setValueChangeMode(e.getValue());
        });
        var serverSideContent = new Span();
        passwordField.addValueChangeListener(
                e -> serverSideContent.setText(e.getValue()));
        // end::snippet[]

        modeSelector.setItemLabelGenerator(ValueChangeMode::name);

        var horizontalLayout = new HorizontalLayout(passwordField,
                modeSelector);
        horizontalLayout.setAlignItems(Alignment.BASELINE);

        var serverSideLayout = new HorizontalLayout(new Span("Server side:"),
                serverSideContent);

        add(horizontalLayout, serverSideLayout);
    }

    public static class Exporter
            extends DemoExporter<PasswordFieldValueChangeMode> { // hidden-source-line
    } // hidden-source-line
}
