package com.vaadin.demo.component.grid;

import com.vaadin.demo.DemoExporter; // hidden-source-line
import com.vaadin.demo.domain.DataService;
import com.vaadin.demo.domain.Person;
import com.vaadin.flow.component.grid.Grid;
import com.vaadin.flow.component.grid.GridVariant;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.router.Route;

import java.util.List;

@Route("grid-compact")
public class GridCompact extends Div {

    public GridCompact() {
        // tag::snippet[]
        Grid<Person> grid = new Grid<>(Person.class, false);
        grid.addColumn(Person::getFirstName).setHeader("First name");
        grid.addColumn(Person::getLastName).setHeader("Last name");
        grid.addColumn(Person::getEmail).setHeader("Email");

        grid.addThemeVariants(GridVariant.LUMO_COMPACT);
        // end::snippet[]

        List<Person> people = DataService.getPeople();
        grid.setItems(people);

        add(grid);
    }

    public static class Exporter // hidden-source-line
            extends DemoExporter<GridCompact> { // hidden-source-line
    } // hidden-source-line
}
