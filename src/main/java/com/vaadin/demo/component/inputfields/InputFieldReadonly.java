package com.vaadin.demo.component.inputfields;

import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.textfield.TextField;
import com.vaadin.flow.router.Route;
import com.vaadin.demo.DemoExporter; // hidden-source-line

@Route("input-field-readonly")
public class InputFieldReadonly extends Div {

  public InputFieldReadonly() {
    // tag::snippet[]
    TextField textField = new TextField();
    textField.setReadOnly(true);
    textField.setLabel("Read-only");
    textField.setValue("Value");
    add(textField);
    // end::snippet[]
  }

  public static class Exporter extends DemoExporter<InputFieldReadonly> { // hidden-source-line
  } // hidden-source-line
}
