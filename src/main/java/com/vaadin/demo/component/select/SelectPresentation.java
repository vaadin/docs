package com.vaadin.demo.component.select;

import com.vaadin.demo.DemoExporter;
import com.vaadin.demo.domain.DataService;
import com.vaadin.demo.domain.Person;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.select.Select;
import com.vaadin.flow.router.Route;

import java.util.List;

@Route("select-presentation")
public class SelectPresentation extends Div {

  private List<Person> items = DataService.getPeople(5);

  public SelectPresentation() {
    // tag::snippet[]
    Select<Person> select = new Select<>();
    select.setLabel("Choose doctor");
    select.setItemLabelGenerator(doctor -> doctor.getFirstName() + " " + doctor.getLastName());
    select.setItems(items);
    add(select);
    // end::snippet[]
  }

  public static class Exporter extends DemoExporter<SelectPresentation> { // hidden-full-source-line
  } // hidden-full-source-line
}
