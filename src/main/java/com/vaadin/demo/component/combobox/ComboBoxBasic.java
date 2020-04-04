package com.vaadin.demo.component.combobox;

import com.vaadin.flow.component.combobox.ComboBox;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.router.Route;
import com.vaadin.demo.DemoExporter; // hidden-full-source-line

@Route("combo-box-basic")
public class ComboBoxBasic extends Div {

  public ComboBoxBasic() {
    // tag::snippet[]
    ComboBox<String> comboBox = new ComboBox<>("Element");
    comboBox.setItems("Hydrogen", "Helium", "Lithium");

    add(comboBox);
    // end::snippet[]
  }

  public static class GridEditorExporter extends DemoExporter<ComboBoxBasic> { // hidden-full-source-line
  } // hidden-full-source-line
}
