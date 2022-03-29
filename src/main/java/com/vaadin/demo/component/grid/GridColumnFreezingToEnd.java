package com.vaadin.demo.component.grid;

import java.util.List;

import com.vaadin.demo.domain.Person;
import com.vaadin.flow.component.grid.Grid;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.router.Route;
import com.vaadin.demo.DemoExporter; // hidden-source-line
import com.vaadin.demo.domain.DataService;

@Route("grid-column-freezing-to-end")
public class GridColumnFreezingToEnd extends Div {

    public GridColumnFreezingToEnd() {
        Grid<Person> grid = new Grid<>(Person.class, false);
        grid.addColumn(Person::getFirstName).setHeader("First name");
        grid.addColumn(Person::getLastName).setHeader("Last name");
        grid.addColumn(Person::getEmail).setHeader("Email").setAutoWidth(true);
        grid.addColumn(person -> person.getAddress().getStreet())
                .setHeader("Street").setAutoWidth(true);
        grid.addColumn(person -> person.getAddress().getPhone())
                .setHeader("Phone").setAutoWidth(true);
        // tag::snippet[]
        grid.addColumn(Person::getProfession).setHeader("Profession")
                .setAutoWidth(true).setFrozenToEnd(true);
        // end::snippet[]

        List<Person> people = DataService.getPeople();
        grid.setItems(people);

        add(grid);
    }

    public static class Exporter // hidden-source-line
            extends DemoExporter<GridColumnFreezingToEnd> { // hidden-source-line
    } // hidden-source-line
}
