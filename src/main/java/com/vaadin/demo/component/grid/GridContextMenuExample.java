package com.vaadin.demo.component.grid;

import com.vaadin.demo.DemoExporter; // hidden-source-line
import com.vaadin.demo.domain.DataService;
import com.vaadin.demo.domain.Person;
import com.vaadin.flow.component.grid.Grid;
import com.vaadin.flow.component.grid.contextmenu.GridContextMenu;
import com.vaadin.flow.component.grid.contextmenu.GridMenuItem;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.html.Hr;
import com.vaadin.flow.router.Route;

import java.util.List;

@Route("grid-context-menu")
public class GridContextMenuExample extends Div {

    public GridContextMenuExample() {
        // tag::snippet1[]
        Grid<Person> grid = new Grid<>(Person.class, false);
        grid.addColumn(Person::getFirstName).setHeader("First name");
        grid.addColumn(Person::getLastName).setHeader("Last name");
        grid.addColumn(Person::getEmail).setHeader("Email");
        grid.addColumn(Person::getProfession).setHeader("Profession");

        PersonContextMenu contextMenu = new PersonContextMenu(grid);

        add(grid, contextMenu);
        // end::snippet1[]

        List<Person> people = DataService.getPeople();
        grid.setItems(people);
    }

    // tag::snippet2[]
    private static class PersonContextMenu extends GridContextMenu<Person> {
        public PersonContextMenu(Grid<Person> target) {
            super(target);

            addItem("Edit", e -> e.getItem().ifPresent(person -> {
                // System.out.printf("Edit: %s%n", person.getFullName());
            }));
            addItem("Delete", e -> e.getItem().ifPresent(person -> {
                // System.out.printf("Delete: %s%n", person.getFullName());
            }));

            add(new Hr());

            GridMenuItem<Person> emailItem = addItem("Email",
                    e -> e.getItem().ifPresent(person -> {
                        // System.out.printf("Email: %s%n", person.getFullName());
                    }));
            GridMenuItem<Person> phoneItem = addItem("Call",
                    e -> e.getItem().ifPresent(person -> {
                        // System.out.printf("Phone: %s%n", person.getFullName());
                    }));

            setDynamicContentHandler(person -> {
                // Do not show context menu when header is clicked
                if (person == null)
                    return false;
                emailItem.setText(
                        String.format("Email: %s", person.getEmail()));
                phoneItem.setText(String.format("Call: %s",
                        person.getAddress().getPhone()));
                return true;
            });
        }
    }
    // end::snippet2[]

    public static class Exporter // hidden-source-line
            extends DemoExporter<GridContextMenuExample> { // hidden-source-line
    } // hidden-source-line
}
