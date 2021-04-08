package com.vaadin.demo.component.contextmenu;

import com.vaadin.demo.DemoExporter; // hidden-full-source-line
import com.vaadin.demo.domain.DataService;
import com.vaadin.demo.domain.Person;
import com.vaadin.flow.component.Component;
import com.vaadin.flow.component.Text;
import com.vaadin.flow.component.grid.Grid;
import com.vaadin.flow.component.grid.contextmenu.GridContextMenu;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.icon.Icon;
import com.vaadin.flow.component.icon.VaadinIcon;
import com.vaadin.flow.router.Route;

import java.util.List;

@Route("context-menu-presentation")
public class ContextMenuPresentation extends Div {

  private List<Person> people = DataService.getPeople(5);

  public ContextMenuPresentation() {
    Grid<Person> grid = new Grid();
    grid.setHeightByRows(true);
    grid.setItems(people);

    grid.addColumn(person -> person.getFullName())
        .setHeader("Applicant");
    grid.addColumn(person -> person.getEmail())
        .setHeader("Email");
    grid.addColumn(person -> person.getAddress().getPhone())
        .setHeader("Phone number");

    // tag::snippet[]
    GridContextMenu<Person> menu = grid.addContextMenu();
    menu.addItem(
      createItem(VaadinIcon.FILE_SEARCH, "View"),
      event -> { /* event.getItem() */ }
    );
    menu.addItem("Edit", event -> { /* event.getItem() */ });
    menu.addItem("Delete", event -> { /* event.getItem() */ });
    // end::snippet[]

    add(grid);
  }

  private Component createItem(VaadinIcon vaadinIcon, String action) {
    Icon icon = vaadinIcon.create();
    icon.getStyle()
      .set("color", "var(--lumo-secondary-text-color)")
      .set("margin-inline-end", "var(--lumo-space-s")
      .set("padding", "var(--lumo-space-xs");
    return icon;
  }


  public static class Exporter extends DemoExporter<ContextMenuPresentation> {} // hidden-full-source-line
}
