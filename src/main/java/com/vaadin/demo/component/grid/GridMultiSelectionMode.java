package com.vaadin.demo.component.grid;

import java.util.List;
import java.util.Optional;

import com.vaadin.demo.domain.Person;
import com.vaadin.flow.component.grid.Grid;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.router.Route;
import com.vaadin.demo.DemoExporter; // hidden-source-line
import com.vaadin.demo.domain.DataService;

@Route("grid-multi-selection-mode")
public class GridMultiSelectionMode extends Div {

    public GridMultiSelectionMode() {
        // tag::snippet[]
        Grid<Person> grid = new Grid<>(Person.class, false);
        grid.setSelectionMode(Grid.SelectionMode.MULTI);
        grid.addColumn(Person::getFirstName).setHeader("First name");
        grid.addColumn(Person::getLastName).setHeader("Last name");
        grid.addColumn(Person::getEmail).setHeader("Email");

        List<Person> people = DataService.getPeople();
        grid.setItems(people);

        grid.addSelectionListener(selection -> {
            // System.out.printf("Number of selected people: %s%n", selection.getAllSelectedItems().size());
        });
        // end::snippet[]

        add(grid);
    }

    public static class Exporter // hidden-source-line
            extends DemoExporter<GridMultiSelectionMode> { // hidden-source-line
    } // hidden-source-line
}
