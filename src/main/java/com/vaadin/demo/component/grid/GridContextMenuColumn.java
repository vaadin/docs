package com.vaadin.demo.component.grid;

import com.vaadin.demo.DemoExporter; // hidden-source-line
import com.vaadin.demo.domain.DataService;
import com.vaadin.demo.domain.Person;
import com.vaadin.flow.component.grid.Grid;
import com.vaadin.flow.component.grid.contextmenu.GridContextMenu;
import com.vaadin.flow.component.grid.contextmenu.GridMenuItem;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.router.Route;

@Route("grid-context-menu-column")
public class GridContextMenuColumn extends Div {

    public GridContextMenuColumn() {
        // tag::snippet[]
        Grid<Person> grid = new Grid<>(Person.class, false);
        grid.addColumn(Person::getFirstName).setHeader("First name");
        grid.addColumn(Person::getLastName).setHeader("Last name");
        Grid.Column<Person> emailColumn = grid.addColumn(Person::getEmail)
                .setHeader("Email");
        Grid.Column<Person> phoneColumn = grid
                .addColumn(person -> person.getAddress().getPhone())
                .setHeader("Phone");

        GridContextMenu<Person> menu = grid.addContextMenu();
        menu.addItem("Edit", e -> e.getItem().ifPresent(person -> {
            // System.out.printf("Edit: %s%n", person.getFullName());
        }));
        GridMenuItem<Person> emailItem = menu.addItem("Send email",
                e -> e.getItem().ifPresent(person -> {
                    // System.out.printf("Email: %s%n", person.getEmail());
                }));
        GridMenuItem<Person> callItem = menu.addItem("Call",
                e -> e.getItem().ifPresent(person -> {
                    // System.out.printf("Call: %s%n",
                    // person.getAddress().getPhone());
                }));

        menu.setDynamicContentProvider(context -> {
            if (context.item() == null) {
                return false;
            }
            emailItem.setVisible(context.column() == emailColumn);
            callItem.setVisible(context.column() == phoneColumn);
            return true;
        });
        // end::snippet[]

        grid.setItems(DataService.getPeople());
        add(grid);
    }

    public static class Exporter // hidden-source-line
            extends DemoExporter<GridContextMenuColumn> { // hidden-source-line
    } // hidden-source-line
}
