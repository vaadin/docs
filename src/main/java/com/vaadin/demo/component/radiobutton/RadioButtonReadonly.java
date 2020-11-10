package com.vaadin.demo.component.radiobutton;

import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.radiobutton.RadioButtonGroup;
import com.vaadin.flow.router.Route;
import com.vaadin.demo.DemoExporter; // hidden-full-source-line

@Route("radio-button-readonly")
public class RadioButtonReadonly extends Div {

  public RadioButtonReadonly() {
    // tag::snippet[]
    RadioButtonGroup<String> radioGroup = new RadioButtonGroup<>();
    radioGroup.setLabel("Status");
    radioGroup.setItems("In progress", "Done", "Cancelled");
    radioGroup.setValue("In progress");
    radioGroup.setReadOnly(true);
    add(radioGroup);
    // end::snippet[]
  }

  public static class Exporter extends DemoExporter<RadioButtonReadonly> { // hidden-full-source-line
  } // hidden-full-source-line
}
