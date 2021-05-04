package com.vaadin.demo.component.radiobutton;

import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.radiobutton.RadioButtonGroup;
import com.vaadin.flow.component.radiobutton.RadioGroupVariant;
import com.vaadin.flow.router.Route;
import com.vaadin.demo.DemoExporter; // hidden-source-line

@Route("radio-button-vertical")
public class RadioButtonVertical extends Div {

  public RadioButtonVertical() {
    // tag::snippet[]
    RadioButtonGroup<String> radioGroup = new RadioButtonGroup<>();
    radioGroup.addThemeVariants(RadioGroupVariant.LUMO_VERTICAL);
    radioGroup.setLabel("Status");
    radioGroup.setItems("Pending", "Submitted", "Confirmed");
    radioGroup.setValue("Pending");
    add(radioGroup);
    // end::snippet[]
  }

  public static class Exporter extends DemoExporter<RadioButtonVertical> { // hidden-source-line
  } // hidden-source-line
}
