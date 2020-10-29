package com.vaadin.demo.component.inputfields;

import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.textfield.EmailField;
import com.vaadin.flow.router.Route;
import com.vaadin.demo.DemoExporter; // hidden-full-source-line

@Route("input-field-label")
public class InputFieldLabel extends Div {

  public InputFieldLabel() {
    // tag::snippet[]
    EmailField emailField = new EmailField();
    emailField.setLabel("Email address");
    add(emailField);
    // end::snippet[]
  }

  public static class Exporter extends DemoExporter<InputFieldLabel> { // hidden-full-source-line
  } // hidden-full-source-line
}
