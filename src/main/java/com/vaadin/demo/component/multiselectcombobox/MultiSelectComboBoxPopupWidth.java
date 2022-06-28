package com.vaadin.demo.component.multiselectcombobox;

import com.vaadin.demo.DemoExporter; // hidden-source-line
import com.vaadin.demo.domain.DataService;
import com.vaadin.demo.domain.Person;
import com.vaadin.flow.component.combobox.ComboBox.ItemFilter;
import com.vaadin.flow.component.combobox.MultiSelectComboBox;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.router.Route;

@Route("multi-select-combo-box-popup-width")
public class MultiSelectComboBoxPopupWidth extends Div {

  public MultiSelectComboBoxPopupWidth() {
    MultiSelectComboBox<Person> comboBox = new MultiSelectComboBox<>("Employee");
    add(comboBox);
    // tag::snippet[]
    comboBox.getStyle().set("--vaadin-multi-select-combo-box-overlay-width", "350px");
    // end::snippet[]
    comboBox.setWidth("300px");

    ItemFilter<Person> filter = (person, filterString) -> (person.getProfession() + " " +person
    .getFirstName() + " " + person.getLastName()).toLowerCase().indexOf(filterString.toLowerCase()) > -1;
    comboBox.setItems(filter, DataService.getPeople());
    comboBox.setItemLabelGenerator(person -> person.getProfession() + " " + person.getFirstName() + " " + person.getLastName());
  }

  public static class Exporter extends DemoExporter<MultiSelectComboBoxPopupWidth> { // hidden-source-line
  } // hidden-source-line
}
