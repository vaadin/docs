package com.vaadin.demo.component.radiobutton;

import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.radiobutton.RadioButtonGroup;
import com.vaadin.flow.router.Route;
import com.vaadin.demo.DemoExporter; // hidden-source-line

@Route("radio-button-horizontal")
public class RadioButtonHorizontal extends Div {

  public RadioButtonHorizontal() {
    // tag::snippet[]
    RadioButtonGroup<String> radioGroup = new RadioButtonGroup<>();
    radioGroup.setLabel("Status");
    radioGroup.setItems("Pending", "Submitted", "Confirmed");
    radioGroup.setValue("Pending");
    add(radioGroup);
    // end::snippet[]
  }

  public static class Exporter extends DemoExporter<RadioButtonHorizontal> { // hidden-source-line
  } // hidden-source-line
}
