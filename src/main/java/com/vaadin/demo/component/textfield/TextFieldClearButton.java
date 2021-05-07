package com.vaadin.demo.component.textfield;

import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.textfield.TextField;
import com.vaadin.flow.router.Route;
import com.vaadin.demo.DemoExporter; // hidden-source-line

@Route("text-field-clear-button")
public class TextFieldClearButton extends Div {

  public TextFieldClearButton() {
    // tag::snippet[]
    TextField textField = new TextField();
    textField.setClearButtonVisible(true);
    textField.setValue("Value");
    add(textField);
    // end::snippet[]
  }

  public static class Exporter extends DemoExporter<TextFieldClearButton> { // hidden-source-line
  } // hidden-source-line
}
