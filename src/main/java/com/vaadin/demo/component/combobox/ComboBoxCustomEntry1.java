package com.vaadin.demo.component.combobox;

import com.vaadin.flow.component.combobox.ComboBox;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.router.Route;
import com.vaadin.demo.DemoExporter; // hidden-full-source-line

@Route("combo-box-custom-entry-1")
public class ComboBoxCustomEntry1 extends Div {

  public ComboBoxCustomEntry1() {
    // tag::snippet[]
    ComboBox<String> comboBox = new ComboBox<>("Browser");
    comboBox.setItems("Chrome", "Edge", "Firefox", "Safari");
    comboBox.setHelperText("Select or type a browser");
    comboBox.setAllowCustomValue(true);
    add(comboBox);
    // end::snippet[]
  }

  public static class Exporter extends DemoExporter<ComboBoxCustomEntry1> { // hidden-full-source-line
  } // hidden-full-source-line
}
