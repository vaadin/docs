package com.vaadin.demo.component.radiobutton;

import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.radiobutton.RadioButtonGroup;
import com.vaadin.flow.router.Route;
import com.vaadin.demo.DemoExporter; // hidden-source-line

@Route("radio-button-disabled")
public class RadioButtonDisabled extends Div {

  public RadioButtonDisabled() {
    // tag::snippet[]
    RadioButtonGroup<String> radioGroup = new RadioButtonGroup<>();
    radioGroup.setLabel("Status");
    radioGroup.setItems("In progress", "Done", "Cancelled");
    radioGroup.setValue("In progress");
    radioGroup.setEnabled(false);
    add(radioGroup);
    // end::snippet[]
  }

  public static class Exporter extends DemoExporter<RadioButtonDisabled> { // hidden-source-line
  } // hidden-source-line
}
