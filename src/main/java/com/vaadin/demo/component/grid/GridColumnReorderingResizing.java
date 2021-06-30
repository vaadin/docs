package com.vaadin.demo.component.grid;

import java.util.List;

import com.vaadin.demo.domain.Person;
import com.vaadin.flow.component.grid.Grid;
import com.vaadin.flow.component.grid.HeaderRow;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.router.Route;
import com.vaadin.demo.DemoExporter; // hidden-source-line
import com.vaadin.demo.domain.DataService;

@Route("grid-column-reordering-resizing")
public class GridColumnReorderingResizing extends Div {

    public GridColumnReorderingResizing() {
        // tag::snippet[]
        Grid<Person> grid = new Grid<>(Person.class, false);
        grid.setColumnReorderingAllowed(true);
        Grid.Column<Person> firstNameColumn = grid
                .addColumn(Person::getFirstName).setHeader("First name")
                .setResizable(true);
        Grid.Column<Person> lastNameColumn = grid.addColumn(Person::getLastName)
                .setHeader("Last name").setResizable(true);
        Grid.Column<Person> streetColumn = grid
                .addColumn(person -> person.getAddress().getStreet())
                .setHeader("Street").setResizable(true);
        Grid.Column<Person> cityColumn = grid
                .addColumn(person -> person.getAddress().getCity())
                .setHeader("City").setResizable(true);
        Grid.Column<Person> zipColumn = grid
                .addColumn(person -> person.getAddress().getZip())
                .setHeader("Zip").setResizable(true);
        Grid.Column<Person> stateColumn = grid
                .addColumn(person -> person.getAddress().getState())
                .setHeader("State").setResizable(true);

        HeaderRow headerRow = grid.prependHeaderRow();
        headerRow.join(firstNameColumn, lastNameColumn).setText("Name");
        headerRow.join(streetColumn, cityColumn, zipColumn, stateColumn)
                .setText("Address");
        // end::snippet[]

        List<Person> people = DataService.getPeople();
        grid.setItems(people);

        add(grid);
    }

    public static class Exporter extends // hidden-source-line
            DemoExporter<GridColumnReorderingResizing> { // hidden-source-line
    } // hidden-source-line
}
