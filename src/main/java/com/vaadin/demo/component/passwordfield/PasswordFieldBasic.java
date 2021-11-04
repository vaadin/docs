package com.vaadin.demo.component.passwordfield;

import com.vaadin.demo.DemoExporter; // hidden-source-line
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.textfield.PasswordField;
import com.vaadin.flow.router.Route;

@Route("password-field-basic")
public class PasswordFieldBasic extends Div {

  public PasswordFieldBasic() {
    // tag::snippet[]
    PasswordField passwordField = new PasswordField();
    passwordField.setLabel("Password");
    passwordField.setValue("Ex@mplePassw0rd");
    add(passwordField);
    // end::snippet[]
  }

  public static class Exporter extends DemoExporter<PasswordFieldBasic> { // hidden-source-line
  } // hidden-source-line
}
