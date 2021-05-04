package com.vaadin.demo.component.textfield;

import com.vaadin.flow.component.orderedlayout.HorizontalLayout;
import com.vaadin.flow.component.textfield.TextField;
import com.vaadin.flow.router.Route;
import com.vaadin.demo.DemoExporter; // hidden-source-line

@Route("text-field-min-max-input-length")
public class TextFieldMinMaxInputLength extends HorizontalLayout {

  public TextFieldMinMaxInputLength() {
    setPadding(false);

    // tag::snippet[]
    TextField zipCode = new TextField();
    zipCode.setMinLength(5);
    zipCode.setMaxLength(5);
    zipCode.getStyle().set("width", "6em");
    zipCode.setLabel("Zip code");
    add(zipCode);

    TextField username = new TextField();
    username.setMaxLength(16);
    username.setHelperText("Max 16 characters");
    username.setLabel("Username");
    add(username);
    // end::snippet[]
  }

  public static class Exporter extends DemoExporter<TextFieldMinMaxInputLength> { // hidden-source-line
  } // hidden-source-line
}
