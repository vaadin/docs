package com.vaadin.demo.component.combobox;

import com.vaadin.flow.component.combobox.ComboBox;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.router.Route;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import com.vaadin.demo.DemoExporter; // hidden-source-line

@Route("combo-box-custom-entry-2")
public class ComboBoxCustomEntry2 extends Div {

  private List<String> items = new ArrayList<>(Arrays.asList("Chrome", "Edge", "Firefox", "Safari"));

  public ComboBoxCustomEntry2() {
    // tag::snippet[]
    ComboBox<String> comboBox = new ComboBox<>("Browser");
    comboBox.setAllowCustomValue(true);
    comboBox.addCustomValueSetListener(e -> {
      String customValue = e.getDetail();
      items.add(customValue);
      comboBox.setItems(items);
      comboBox.setValue(customValue);
    });
    add(comboBox);
    // end::snippet[]
    comboBox.setItems(items);
    comboBox.setHelperText("Select or type a browser");
  }

  public static class Exporter extends DemoExporter<ComboBoxCustomEntry2> { // hidden-source-line
  } // hidden-source-line
}
