package com.vaadin.demo.component.inputfields;

import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.textfield.TextField;
import com.vaadin.flow.component.textfield.TextFieldVariant;
import com.vaadin.flow.router.Route;
import com.vaadin.demo.DemoExporter; // hidden-source-line

@Route("input-field-helper-position")
public class InputFieldHelperPosition extends Div {

  public InputFieldHelperPosition() {
    // tag::snippet[]
    TextField textField = new TextField();
    textField.setLabel("Phone number");
    textField.setHelperText("Include country and area prefixes");
    textField.setThemeName(TextFieldVariant.LUMO_HELPER_ABOVE_FIELD.getVariantName());
    textField.setWidth("15em");
    add(textField);
    // end::snippet[]
  }

  public static class Exporter extends DemoExporter<InputFieldHelperPosition> { // hidden-source-line
  } // hidden-source-line
}
