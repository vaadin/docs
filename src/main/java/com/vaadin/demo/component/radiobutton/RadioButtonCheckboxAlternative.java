package com.vaadin.demo.component.radiobutton;

import com.vaadin.flow.component.checkbox.Checkbox;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.component.radiobutton.RadioButtonGroup;
import com.vaadin.flow.router.Route;
import com.vaadin.demo.DemoExporter; // hidden-full-source-line

@Route("radio-button-checkbox-alternative")
public class RadioButtonCheckboxAlternative extends Div {

  public RadioButtonCheckboxAlternative() {
    VerticalLayout layout = new VerticalLayout();
    layout.setPadding(false);
    layout.setSpacing(false);

    // tag::snippet[]
    Checkbox checkbox = new Checkbox("Reply All by default (unchecked state not clear)");
    checkbox.setValue(true);
    layout.add(checkbox);

    RadioButtonGroup<String> radioGroup = new RadioButtonGroup<>();
    radioGroup.setLabel("Default reply behavior");
    radioGroup.setItems("Reply", "Reply to all");
    radioGroup.setValue("Reply");
    layout.add(radioGroup);

    add(layout);
    // end::snippet[]
  }

  public static class Exporter extends DemoExporter<RadioButtonCheckboxAlternative> { // hidden-full-source-line
  } // hidden-full-source-line
}
