package com.vaadin.demo.component.combobox;

import com.vaadin.flow.component.combobox.ComboBox;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.router.Route;
import com.vaadin.demo.DemoExporter; // hidden-source-line
import com.vaadin.demo.domain.Country;
import com.vaadin.demo.domain.DataService;

@Route("combo-box-auto-open")
public class ComboBoxAutoOpen extends Div {

  public ComboBoxAutoOpen() {
    // tag::snippet[]
    ComboBox<Country> comboBox = new ComboBox<>("Country");
    comboBox.setAutoOpen(false);
    add(comboBox);
    // end::snippet[]
    comboBox.setItems(DataService.getCountries());
    comboBox.setItemLabelGenerator(Country::getName);
  }

  public static class Exporter extends DemoExporter<ComboBoxAutoOpen> { // hidden-source-line
  } // hidden-source-line
}
