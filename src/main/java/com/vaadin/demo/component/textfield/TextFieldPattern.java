package com.vaadin.demo.component.textfield;

import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.textfield.TextField;
import com.vaadin.flow.router.Route;
import com.vaadin.demo.DemoExporter; // hidden-source-line

@Route("text-field-pattern")
public class TextFieldPattern extends Div {

  public TextFieldPattern() {
    // tag::snippet[]
    TextField textField = new TextField();
    textField.setPattern("^[+]?[(]?[0-9]{3}[)]?[-s.]?[0-9]{3}[-s.]?[0-9]{4,6}$");
    textField.setHelperText("Format: +(123)456-7890");
    textField.setLabel("Phone number");
    add(textField);
    // end::snippet[]
  }

  public static class Exporter extends DemoExporter<TextFieldPattern> { // hidden-source-line
  } // hidden-source-line
}
