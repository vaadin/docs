package com.vaadin.demo.component.grid;

import com.vaadin.demo.domain.Person;
import com.vaadin.flow.component.grid.Grid;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.router.Route;
import com.vaadin.demo.DemoExporter; // hidden-source-line

@Route("grid-empty-state")
public class GridEmptyState extends Div {

    public GridEmptyState() {

        Grid<Person> grid = new Grid<>(Person.class, false);
        grid.addColumn(Person::getFirstName).setHeader("First name");
        grid.addColumn(Person::getLastName).setHeader("Last name");
        grid.addColumn(Person::getEmail).setHeader("Email");
        grid.addColumn(Person::getProfession).setHeader("Profession");

        // tag::snippet[]
        grid.setEmptyStateText("No employees found.");
        // end::snippet[]

        add(grid);
    }

    public static class Exporter // hidden-source-line
            extends DemoExporter<GridEmptyState> { // hidden-source-line
    } // hidden-source-line
}
