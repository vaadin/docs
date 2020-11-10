package com.vaadin.demo.component.combobox;

import com.vaadin.flow.component.combobox.ComboBox;
import com.vaadin.flow.component.combobox.ComboBox.ItemFilter;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.router.Route;
import com.vaadin.demo.DemoExporter; // hidden-full-source-line
import com.vaadin.demo.domain.DataService;
import com.vaadin.demo.domain.Person;

@Route("combo-box-popup-width")
public class ComboBoxPopupWidth extends Div {

  public ComboBoxPopupWidth() {
    ItemFilter<Person> filter = (person, filterString) -> (person.getProfession() + " " +person
    .getFirstName() + " " + person.getLastName()).toLowerCase().indexOf(filterString.toLowerCase()) > -1;

    // tag::snippet[]
    ComboBox<Person> comboBox = new ComboBox<>("Employee");
    comboBox.setItems(filter, DataService.getPeople());
    comboBox.setItemLabelGenerator(person -> person.getProfession() + " " + person.getFirstName() + " " + person.getLastName());
    comboBox.getStyle().set("--vaadin-combo-box-overlay-width", "350px");
    add(comboBox);
    // end::snippet[]
  }

  public static class Exporter extends DemoExporter<ComboBoxPopupWidth> { // hidden-full-source-line
  } // hidden-full-source-line
}
