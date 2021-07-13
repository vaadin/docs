package com.vaadin.demo.component.gridpro;

import com.vaadin.demo.domain.Person;
import com.vaadin.flow.component.gridpro.GridPro;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.router.Route;
import com.vaadin.demo.DemoExporter; // hidden-source-line
import com.vaadin.demo.domain.DataService;
import java.util.List;

@Route("grid-pro-basic")
public class GridProBasic extends Div {

  public GridProBasic() {
    // tag::snippet[]
    GridPro<Person> grid = new GridPro<>();

    grid.addEditColumn(Person::getFirstName)
            .text((person, newValue) -> person.setFirstName(newValue))
            .setHeader("First name");

    grid.addEditColumn(Person::getLastName)
            .text((person, newValue) -> person.setLastName(newValue))
            .setHeader("Last name");

    grid.addEditColumn(Person::getEmail)
            .text((person, newValue) -> person.setEmail(newValue))
            .setHeader("Email");

    grid.addEditColumn(Person::getProfession)
            .text((item, newValue) -> item.setProfession(newValue))
            .setHeader("Profession");
    // end::snippet[]

    List<Person> people = DataService.getPeople();
    grid.setItems(people);
    add(grid);
  }

  public static class Exporter extends DemoExporter<GridProBasic> { // hidden-source-line
  } // hidden-source-line
}
