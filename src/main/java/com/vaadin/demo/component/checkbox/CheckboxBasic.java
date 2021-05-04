package com.vaadin.demo.component.checkbox;

import com.vaadin.flow.component.checkbox.Checkbox;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.router.Route;
import com.vaadin.demo.DemoExporter; // hidden-source-line

@Route("checkbox-basic")
public class CheckboxBasic extends Div {

  public CheckboxBasic() {
    // tag::snippet[]
    Checkbox checkbox = new Checkbox();
    checkbox.setLabel("I accept the terms and conditions");

    add(checkbox);
    // end::snippet[]
  }

  public static class Exporter extends DemoExporter<CheckboxBasic> { // hidden-source-line
  } // hidden-source-line
}
