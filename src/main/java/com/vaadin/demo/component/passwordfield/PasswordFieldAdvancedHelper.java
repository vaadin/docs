package com.vaadin.demo.component.passwordfield;

import com.vaadin.flow.component.Text;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.html.Span;
import com.vaadin.flow.component.icon.Icon;
import com.vaadin.flow.component.icon.VaadinIcon;
import com.vaadin.flow.component.textfield.PasswordField;
import com.vaadin.flow.data.value.ValueChangeMode;
import com.vaadin.flow.router.Route;
import com.vaadin.demo.DemoExporter; // hidden-source-line

@Route("password-field-advanced-helper")
public class PasswordFieldAdvancedHelper extends Div {

  private Icon checkIcon;
  private Span passwordStrengthText;

  public PasswordFieldAdvancedHelper() {
    // tag::snippet[]
    PasswordField passwordField = new PasswordField();
    passwordField.setLabel("Password");
    passwordField.setRevealButtonVisible(false);

    checkIcon = VaadinIcon.CHECK.create();
    checkIcon.setVisible(false);
    checkIcon.getStyle().set("color", "var(--lumo-success-color)");
    passwordField.setSuffixComponent(checkIcon);

    Div passwordStrength = new Div();
    passwordStrengthText = new Span();
    passwordStrength.add(new Text("Password strength: "), passwordStrengthText);
    passwordField.setHelperComponent(passwordStrength);

    add(passwordField);
    // end::snippet[]

    passwordField.setValueChangeMode(ValueChangeMode.EAGER);
    passwordField.addValueChangeListener(e -> {
      String password = e.getValue();
      updateHelper(password);
    });

    updateHelper("");
  }

  private void updateHelper(String password) {
    if (password.length() > 9) {
      passwordStrengthText.setText("strong");
      passwordStrengthText.getStyle().set("color", "var(--lumo-success-color)");
      checkIcon.setVisible(true);
    } else if (password.length() > 5) {
      passwordStrengthText.setText("moderate");
      passwordStrengthText.getStyle().set("color", "#e7c200");
      checkIcon.setVisible(false);
    } else {
      passwordStrengthText.setText("weak");
      passwordStrengthText.getStyle().set("color", "var(--lumo-error-color)");
      checkIcon.setVisible(false);
    }
  }

  public static class Exporter extends DemoExporter<PasswordFieldAdvancedHelper> { // hidden-source-line
  } // hidden-source-line
}
