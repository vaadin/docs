package com.vaadin.demo.component.combobox;

import com.vaadin.flow.component.combobox.ComboBox;
import com.vaadin.flow.component.combobox.ComboBox.ItemFilter;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.router.Route;
import com.vaadin.demo.DemoExporter; // hidden-full-source-line
import com.vaadin.demo.domain.Country;
import com.vaadin.demo.domain.DataService;

@Route("combo-box-filtering-2")
public class ComboBoxFiltering2 extends Div {

  public ComboBoxFiltering2() {
    // tag::snippet[]
    ItemFilter<Country> filter = (country, filterString) -> country.getName().toLowerCase().startsWith(filterString.toLowerCase());

    ComboBox<Country> comboBox = new ComboBox<>("Country");
    comboBox.setItems(filter, DataService.getCountries());
    comboBox.setItemLabelGenerator(Country::getName);
    add(comboBox);
    // end::snippet[]
  }

  public static class Exporter extends DemoExporter<ComboBoxFiltering2> { // hidden-full-source-line
  } // hidden-full-source-line
}
