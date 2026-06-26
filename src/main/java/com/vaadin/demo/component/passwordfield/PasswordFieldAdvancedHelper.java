package com.vaadin.demo.component.passwordfield;

import com.vaadin.flow.component.Text;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.html.Span;
import com.vaadin.flow.component.icon.Icon;
import com.vaadin.flow.component.icon.VaadinIcon;
import com.vaadin.flow.component.textfield.PasswordField;
import com.vaadin.flow.data.value.ValueChangeMode;
import com.vaadin.flow.router.Route;
import com.vaadin.flow.signals.Signal;
import com.vaadin.flow.signals.local.ValueSignal;
import com.vaadin.demo.DemoExporter; // hidden-source-line

@Route("password-field-advanced-helper")
public class PasswordFieldAdvancedHelper extends Div {

    private final ValueSignal<String> password = new ValueSignal<>("");

    private final Signal<String> strength = Signal.computed(() -> {
        int passwordLength = password.get().length();
        if (passwordLength > 9) {
            return "strong";
        } else if (passwordLength > 5) {
            return "moderate";
        } else {
            return "weak";
        }
    });

    public PasswordFieldAdvancedHelper() {
        // tag::snippet[]
        PasswordField passwordField = new PasswordField();
        passwordField.setLabel("Password");
        passwordField.setWidth("14em");

        Icon checkIcon = VaadinIcon.CHECK.create();
        checkIcon.setClassName("strong");
        checkIcon.bindVisible(strength.map((value) -> value.equals("strong")));
        passwordField.setSuffixComponent(checkIcon);

        Span passwordStrength = new Span();
        Signal.effect(passwordStrength, () -> {
            passwordStrength.setText(strength.get());
            passwordStrength.setClassName(strength.get());
        });
        passwordField.setHelperComponent(
                new Div(new Text("Password strength: "), passwordStrength));

        passwordField.setValueChangeMode(ValueChangeMode.EAGER);
        passwordField.bindValue(password, password::set);
        add(passwordField);
        // end::snippet[]
    }

    public static class Exporter extends // hidden-source-line
            DemoExporter<PasswordFieldAdvancedHelper> { // hidden-source-line
    } // hidden-source-line
}
