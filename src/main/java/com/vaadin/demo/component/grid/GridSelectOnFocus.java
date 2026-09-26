package com.vaadin.demo.component.grid;

import com.vaadin.demo.DemoExporter; // hidden-source-line
import com.vaadin.demo.domain.DataService;
import com.vaadin.demo.domain.Person;
import com.vaadin.flow.component.grid.Grid;
import com.vaadin.flow.component.grid.GridSingleSelectionModel;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.html.Span;
import com.vaadin.flow.router.Route;

@Route("grid-select-on-focus")
public class GridSelectOnFocus extends Div {

    public GridSelectOnFocus() {
        Grid<Person> grid = new Grid<>(Person.class, false);
        grid.addColumn(Person::getFirstName).setHeader("First name");
        grid.addColumn(Person::getLastName).setHeader("Last name");
        grid.addColumn(Person::getEmail).setHeader("Email");
        grid.setItems(DataService.getPeople());

        Span selectedPerson = new Span("Selected: none");
        grid.asSingleSelect().addValueChangeListener(event -> selectedPerson
                .setText("Selected: " + (event.getValue() == null ? "none"
                        : event.getValue().getFullName())));

        // tag::snippet[]
        GridSingleSelectionModel<Person> selectionModel = //
                (GridSingleSelectionModel<Person>) grid
                        .setSelectionMode(Grid.SelectionMode.SINGLE);
        // Keep a row selected when the focused row is clicked again
        selectionModel.setDeselectAllowed(false);

        // Select the row that contains the focused body cell
        grid.addCellFocusListener(event -> event.getItem()
                .ifPresent(selectionModel::select));
        // end::snippet[]

        add(grid, selectedPerson);
    }

    public static class Exporter // hidden-source-line
            extends DemoExporter<GridSelectOnFocus> { // hidden-source-line
    } // hidden-source-line
}
