package com.vaadin.demo.component.grid;

import com.vaadin.demo.DemoExporter; // hidden-source-line
import com.vaadin.demo.domain.DataService;
import com.vaadin.demo.domain.Person;
import com.vaadin.flow.component.grid.CellFocusEvent;
import com.vaadin.flow.component.grid.Grid;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.textfield.TextArea;
import com.vaadin.flow.router.Route;

import java.util.List;

@Route("grid-cell-focus")
public class GridCellFocus extends Div {

    public GridCellFocus() {
        Grid<Person> grid = new Grid<>(Person.class, false);
        grid.setThemeName("force-focus-outline");
        grid.addColumn(Person::getFirstName)
                .setKey("firstName")
                .setHeader("First name");
        grid.addColumn(Person::getLastName)
                .setKey("lastName")
                .setHeader("Last name");
        grid.addColumn(Person::getEmail)
                .setKey("email")
                .setHeader("Email");
        grid.addColumn(Person::getProfession)
                .setKey("profession")
                .setHeader("Profession");

        List<Person> people = DataService.getPeople();
        grid.setItems(people);

        TextArea textArea = new TextArea();
        textArea.setLabel("Cell focus event information");
        textArea.setReadOnly(true);
        textArea.setWidthFull();

        // tag::snippet[]
        grid.addCellFocusListener(event -> {
            CellFocusEvent.GridSection section = event.getSection();
            String column = event.getColumn()
                    .map(Grid.Column::getKey)
                    .orElse("Not available");
            String row = event.getItem()
                    .map(value -> String.valueOf(people.indexOf(value)))
                    .orElse("Not available");
            String fullName = event.getItem()
                    .map(Person::getFullName)
                    .orElse("Not available");

            String eventSummary = String
                    .format("Section: %s%nRow: %s%nColumn: %s%nPerson: %s",
                            section, row, column, fullName);

            textArea.setValue(eventSummary);
        });
        // end::snippet[]

        add(grid, textArea);
    }

    public static class Exporter // hidden-source-line
            extends DemoExporter<GridCellFocus> { // hidden-source-line
    } // hidden-source-line
}
