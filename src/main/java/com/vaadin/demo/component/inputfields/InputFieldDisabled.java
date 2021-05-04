package com.vaadin.demo.component.inputfields;

import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.textfield.TextField;
import com.vaadin.flow.router.Route;
import com.vaadin.demo.DemoExporter; // hidden-source-line

@Route("input-field-disabled")
public class InputFieldDisabled extends Div {

  public InputFieldDisabled() {
    // tag::snippet[]
    TextField textField = new TextField();
    textField.setEnabled(false);
    textField.setLabel("Disabled");
    textField.setValue("Value");
    add(textField);
    // end::snippet[]
  }

  public static class Exporter extends DemoExporter<InputFieldDisabled> { // hidden-source-line
  } // hidden-source-line
}
