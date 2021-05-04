package com.vaadin.demo.component.gridpro;

import java.util.ArrayList;
import java.util.List;

import com.vaadin.demo.domain.Person;
import com.vaadin.flow.component.gridpro.GridPro;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.router.Route;
import com.vaadin.demo.DemoExporter; // hidden-source-line
import com.vaadin.demo.domain.DataService;

@Route("grid-pro-basic")
public class GridProBasic extends Div {

  public GridProBasic() {
    // tag::snippet[]
    GridPro<Person> grid = new GridPro<>();
    List<Person> people = DataService.getPeople();
    grid.setItems(people);

    grid.addEditColumn(Person::getFirstName).text((item, newValue) -> item.setFirstName(newValue))
        .setHeader("First name");
    grid.addEditColumn(Person::getLastName).text((item, newValue) -> item.setLastName(newValue)).setHeader("Last name");

    List<String> membershipOptions = new ArrayList<>();
    membershipOptions.add("Regular");
    membershipOptions.add("Premium");
    membershipOptions.add("VIP");
    grid.addEditColumn(Person::getMembership)
        .select((item, newValue) -> item.setMembership(newValue), membershipOptions).setHeader("Membership");

    grid.addEditColumn(Person::isSubscriber).checkbox((item, newValue) -> item.setSubscriber(newValue))
        .setHeader("Subscriber");

    add(grid);
    // end::snippet[]
  }

  public static class Exporter extends DemoExporter<GridProBasic> { // hidden-source-line
  } // hidden-source-line
}
