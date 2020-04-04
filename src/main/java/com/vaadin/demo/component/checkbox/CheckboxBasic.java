package com.vaadin.demo.component.checkbox;

import com.vaadin.flow.component.checkbox.Checkbox;
import com.vaadin.flow.component.html.Div;
import com.vaadin.demo.DemoExporter; // hidden-full-source-line

public class CheckboxBasic extends Div {

  public CheckboxBasic() {
    // tag::snippet[]
    Checkbox checkbox = new Checkbox();
    checkbox.setLabel("Enabled");

    add(checkbox);
    // end::snippet[]
  }

  public static class GridEditorExporter extends DemoExporter<CheckboxBasic> { // hidden-full-source-line
  } // hidden-full-source-line
}
