package com.vaadin.demo.component.combobox;

import com.vaadin.flow.component.combobox.ComboBox;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.router.Route;
import com.vaadin.demo.DemoExporter; // hidden-source-line
import com.vaadin.demo.domain.Country;
import com.vaadin.demo.domain.DataService;

@Route("combo-box-filtering-1")
public class ComboBoxFiltering1 extends Div {

  public ComboBoxFiltering1() {
    // tag::snippet[]
    ComboBox<Country> comboBox = new ComboBox<>("Country");
    add(comboBox);
    // end::snippet[]
    comboBox.setItems(DataService.getCountries());
    comboBox.setItemLabelGenerator(Country::getName);
  }

  public static class Exporter extends DemoExporter<ComboBoxFiltering1> { // hidden-source-line
  } // hidden-source-line
}
