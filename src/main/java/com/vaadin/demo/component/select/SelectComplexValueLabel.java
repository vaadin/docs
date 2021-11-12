package com.vaadin.demo.component.select;

import com.vaadin.demo.DemoExporter; // hidden-source-line
import com.vaadin.demo.domain.DataService;
import com.vaadin.demo.domain.Person;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.select.Select;
import com.vaadin.flow.router.Route;

import java.util.List;

@Route("select-complex-value-label")
public class SelectComplexValueLabel extends Div {

  public SelectComplexValueLabel() {
    // tag::snippet[]
    Select<Person> select = new Select<>();
    select.setLabel("Assignee");
    // Display full name of the person as item text and selected value label
    select.setItemLabelGenerator(Person::getFullName);

    List<Person> people = DataService.getPeople(5);
    select.setItems(people);
    // end::snippet[]

    add(select);
  }

  public static class Exporter extends DemoExporter<SelectComplexValueLabel> { // hidden-source-line
  } // hidden-source-line
}
