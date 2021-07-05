package com.vaadin.demo.component.contextmenu;

import com.vaadin.demo.domain.DataService;
import com.vaadin.demo.domain.Person;
import com.vaadin.flow.component.grid.Grid;
import com.vaadin.flow.component.grid.contextmenu.GridContextMenu;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.router.Route;
import com.vaadin.demo.DemoExporter; // hidden-source-line

import java.util.List;

@Route("context-menu-basic")
public class ContextMenuBasic extends Div {

  private List<Person> people = DataService.getPeople(5);

  public ContextMenuBasic() {
    Grid<Person> grid = new Grid();
    grid.setAllRowsVisible(true);
    grid.setItems(people);

    grid.addColumn(person -> person.getFirstName())
        .setHeader("First name");
    grid.addColumn(person -> person.getLastName())
        .setHeader("Last name");
    grid.addColumn(person -> person.getEmail())
        .setHeader("Email");
    grid.addColumn(person -> person.getAddress().getPhone())
        .setHeader("Phone number");

    // tag::snippet[]
    GridContextMenu<Person> menu = grid.addContextMenu();
    menu.addItem("View", event -> {});
    menu.addItem("Edit", event -> {});
    menu.addItem("Delete", event -> {});
    // end::snippet[]

    add(grid);
  }
  public static class Exporter extends DemoExporter<ContextMenuBasic> {} // hidden-source-line
}
