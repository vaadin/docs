package com.vaadin.demo.component.grid;

import java.util.List;
import java.util.Optional;

import com.vaadin.demo.domain.Person;
import com.vaadin.flow.component.grid.Grid;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.router.Route;
import com.vaadin.demo.DemoExporter; // hidden-source-line
import com.vaadin.demo.domain.DataService;

@Route("grid-single-selection-mode")
public class GridSingleSelectionMode extends Div {

    public GridSingleSelectionMode() {
        // tag::snippet[]
        Grid<Person> grid = new Grid<>(Person.class, false);
        grid.addColumn(Person::getFirstName).setHeader("First name");
        grid.addColumn(Person::getLastName).setHeader("Last name");
        grid.addColumn(Person::getEmail).setHeader("Email");

        List<Person> people = DataService.getPeople();
        grid.setItems(people);

        grid.addSelectionListener(selection -> {
            Optional<Person> optionalPerson = selection.getFirstSelectedItem();
            if (optionalPerson.isPresent()) {
                // System.out.printf("Selected person: %s%n", optionalPerson.get().getFullName());
            }
        });
        // end::snippet[]

        add(grid);
    }

    public static class Exporter extends // hidden-source-line
            DemoExporter<GridSingleSelectionMode> { // hidden-source-line
    } // hidden-source-line
}
