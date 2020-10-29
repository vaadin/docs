package com.vaadin.demo.component.radiobutton;

import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.radiobutton.RadioButtonGroup;
import com.vaadin.flow.component.radiobutton.RadioGroupVariant;
import com.vaadin.flow.router.Route;
import com.vaadin.demo.DemoExporter; // hidden-full-source-line

@Route("radio-button-default-value")
public class RadioButtonDefaultValue extends Div {

  public RadioButtonDefaultValue() {
    // tag::snippet[]
    RadioButtonGroup<String> radioGroup = new RadioButtonGroup<>();
    radioGroup.addThemeVariants(RadioGroupVariant.LUMO_VERTICAL);
    radioGroup.setLabel("Repeat");
    radioGroup.setItems("None", "Daily", "Weekly", "Monthly");
    radioGroup.setValue("None");
    add(radioGroup);
    // end::snippet[]
  }

  public static class Exporter extends DemoExporter<RadioButtonDefaultValue> { // hidden-full-source-line
  } // hidden-full-source-line
}
