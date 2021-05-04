package com.vaadin.demo.component.inputfields;

import com.vaadin.flow.component.datepicker.DatePicker;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.orderedlayout.HorizontalLayout;
import com.vaadin.flow.component.textfield.TextField;
import com.vaadin.flow.router.Route;
import com.vaadin.demo.DemoExporter; // hidden-source-line

@Route("input-field-required")
public class InputFieldRequired extends HorizontalLayout {

  public InputFieldRequired() {
    // tag::snippet[]
    TextField textField = new TextField();;
    textField.setLabel("Name");
    textField.setRequiredIndicatorVisible(true);
    textField.setErrorMessage("This field is required");

    DatePicker datePicker = new DatePicker();
    datePicker.setLabel("Date of birth");

    add(textField, datePicker);
    // end::snippet[]
  }

  public static class Exporter extends DemoExporter<InputFieldRequired> { // hidden-source-line
  } // hidden-source-line
}
