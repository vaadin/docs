package com.vaadin.demo.component.combobox;

import com.vaadin.flow.component.combobox.ComboBox;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.router.Route;
import com.vaadin.demo.DemoExporter; // hidden-source-line
import com.vaadin.demo.domain.Country;
import com.vaadin.demo.domain.DataService;

@Route("combo-box-basic")
public class ComboBoxBasic extends Div {

  public ComboBoxBasic() {
    // tag::snippet[]
    ComboBox<Country> comboBox = new ComboBox<>("Country");
    comboBox.setItems(DataService.getCountries());
    comboBox.setItemLabelGenerator(Country::getName);
    add(comboBox);
    // end::snippet[]
  }

  public static class Exporter extends DemoExporter<ComboBoxBasic> { // hidden-source-line
  } // hidden-source-line
}
