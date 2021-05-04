package com.vaadin.demo.component.passwordfield;

import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.textfield.PasswordField;
import com.vaadin.flow.router.Route;
import com.vaadin.demo.DemoExporter; // hidden-source-line

@Route("password-field-helper")
public class PasswordFieldHelper extends Div {

  public PasswordFieldHelper() {
    // tag::snippet[]
    PasswordField passwordField = new PasswordField();
    passwordField.setLabel("Password");
    passwordField.setHelperText("A password must be at least 8 characters. It has to have at least one letter and one digit.");
    passwordField.setPattern("^(?=.*[0-9])(?=.*[a-zA-Z]).{8}.*$");
    passwordField.setErrorMessage("Not a valid password");
    add(passwordField);
    // end::snippet[]
  }

  public static class Exporter extends DemoExporter<PasswordFieldHelper> { // hidden-source-line
  } // hidden-source-line
}
