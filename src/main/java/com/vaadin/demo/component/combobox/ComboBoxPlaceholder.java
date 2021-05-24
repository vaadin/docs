package com.vaadin.demo.component.combobox;

import com.vaadin.flow.component.combobox.ComboBox;
import com.vaadin.flow.component.combobox.ComboBox.ItemFilter;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.router.Route;
import com.vaadin.demo.DemoExporter; // hidden-source-line
import com.vaadin.demo.domain.DataService;
import com.vaadin.demo.domain.Person;

@Route("combo-box-placeholder")
public class ComboBoxPlaceholder extends Div {

  public ComboBoxPlaceholder() {
    ItemFilter<Person> filter = (person, filterString) -> (person.getProfession() + " " +person
    .getFirstName() + " " + person.getLastName()).toLowerCase().indexOf(filterString.toLowerCase()) > -1;

    // tag::snippet[]
    ComboBox<Person> comboBox = new ComboBox<>("Employee");
    comboBox.setPlaceholder("Select employee");
    add(comboBox);
    // end::snippet[]
    comboBox.setItems(filter, DataService.getPeople());
    comboBox.setItemLabelGenerator(person -> person.getFirstName() + " " + person.getLastName());
  }

  public static class Exporter extends DemoExporter<ComboBoxPlaceholder> { // hidden-source-line
  } // hidden-source-line
}
