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
            .text(Person::setFirstName)
            .setHeader("First name");

    grid.addEditColumn(Person::getLastName)
            .text(Person::setLastName)
            .setHeader("Last name");

    grid.addEditColumn(Person::getEmail)
            .text(Person::setEmail)
            .setHeader("Email");

    grid.addEditColumn(Person::getProfession)
            .text(Person::setProfession)
            .setHeader("Profession");
    // end::snippet[]

    List<Person> people = DataService.getPeople();
    grid.setItems(people);
    add(grid);
  }

  public static class Exporter extends DemoExporter<GridProBasic> { // hidden-source-line
  } // hidden-source-line
}
