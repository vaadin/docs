package com.vaadin.demo.component.passwordfield;

import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.textfield.PasswordField;
import com.vaadin.flow.router.Route;
import com.vaadin.demo.DemoExporter; // hidden-source-line

@Route("password-field-reveal-button-hidden")
public class PasswordFieldRevealButtonHidden extends Div {

  public PasswordFieldRevealButtonHidden() {
    // tag::snippet[]
    PasswordField passwordField = new PasswordField();
    passwordField.setRevealButtonVisible(false);
    passwordField.setLabel("Password");
    passwordField.setValue("Ex@mplePassw0rd");
    add(passwordField);
    // end::snippet[]
  }

  public static class Exporter extends DemoExporter<PasswordFieldRevealButtonHidden> { // hidden-source-line
  } // hidden-source-line
}
