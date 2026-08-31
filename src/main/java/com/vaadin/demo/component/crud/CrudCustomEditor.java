package com.vaadin.demo.component.crud;

import java.util.Arrays;
import java.util.List;

import com.vaadin.demo.DemoExporter; // hidden-source-line
import com.vaadin.demo.domain.Person;
import com.vaadin.flow.component.crud.Crud;
import com.vaadin.flow.component.grid.Grid;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.router.Route;

@Route("crud-custom-editor")
public class CrudCustomEditor extends Div {

    private Crud<Person> crud;

    private String FIRST_NAME = "firstName";
    private String LAST_NAME = "lastName";
    private String EMAIL = "email";
    private String EDIT_COLUMN = "vaadin-crud-edit-column";

    public CrudCustomEditor() {
        // tag::snippet[]
        crud = new Crud<>(Person.class, new PersonCrudEditor());

        // The editor reports validation errors itself, so Save can stay
        // enabled at all times.
        crud.getSaveButton().setEnabled(true);
        // end::snippet[]

        setupGrid();
        setupDataProvider();

        add(crud);
    }

    private void setupGrid() {
        Grid<Person> grid = crud.getGrid();

        // Only show these columns (all columns shown by default):
        List<String> visibleColumns = Arrays.asList(FIRST_NAME, LAST_NAME,
                EMAIL, EDIT_COLUMN);
        grid.getColumns().forEach(column -> {
            String key = column.getKey();
            if (!visibleColumns.contains(key)) {
                grid.removeColumn(column);
            }
        });

        // Reorder the columns (alphabetical by default)
        grid.setColumnOrder(grid.getColumnByKey(FIRST_NAME),
                grid.getColumnByKey(LAST_NAME), grid.getColumnByKey(EMAIL),
                grid.getColumnByKey(EDIT_COLUMN));
    }

    private void setupDataProvider() {
        PersonDataProvider dataProvider = new PersonDataProvider();
        crud.setDataProvider(dataProvider);
        crud.addDeleteListener(
                deleteEvent -> dataProvider.delete(deleteEvent.getItem()));
        crud.addSaveListener(
                saveEvent -> dataProvider.persist(saveEvent.getItem()));
    }

    public static class Exporter extends DemoExporter<CrudCustomEditor> { // hidden-source-line
    } // hidden-source-line
}
