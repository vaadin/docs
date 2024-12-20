package com.vaadin.demo.component.grid;

import java.util.List;

import com.vaadin.demo.domain.Person;
import com.vaadin.flow.component.grid.Grid;
import com.vaadin.flow.component.grid.GridMultiSelectionModel;
import com.vaadin.flow.component.grid.dataview.GridListDataView;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.router.Route;
import com.vaadin.demo.DemoExporter; // hidden-source-line
import com.vaadin.demo.domain.DataService;

@Route("grid-range-selection")
public class GridRangeSelection extends Div {

    private Person rangeStartItem;

    public GridRangeSelection() {
        // tag::snippet[]
        Grid<Person> grid = new Grid<>(Person.class, false);
        grid.addColumn(Person::getFirstName).setHeader("First name");
        grid.addColumn(Person::getLastName).setHeader("Last name");
        grid.addColumn(Person::getEmail).setHeader("Email");

        List<Person> people = DataService.getPeople();
        grid.setItems(people);

        GridMultiSelectionModel<Person> selectionModel = (GridMultiSelectionModel<Person>) grid
                .setSelectionMode(Grid.SelectionMode.MULTI);

        selectionModel.addClientItemToggleListener(event -> {
            Person item = event.getItem();

            // If the anchor point isn't set, set it to the current item
            if (rangeStartItem == null) {
                rangeStartItem = item;
            }

            if (event.isShiftKey()) {
                // Calculcate the range of items between the anchor
                // point and the current item
                GridListDataView<Person> dataView = grid.getListDataView();
                int rangeStart = dataView.getItemIndex(rangeStartItem).get();
                int rangeEnd = dataView.getItemIndex(item).get();
                Person[] rangeItems = dataView.getItems()
                        .skip(Math.min(rangeStart, rangeEnd))
                        .limit(Math.abs(rangeStart - rangeEnd) + 1)
                        .toArray(Person[]::new);

                // Update the selection state of items within the range
                // based on the state of the current item
                if (event.isSelected()) {
                    selectionModel.selectItems(rangeItems);
                } else {
                    selectionModel.deselectItems(rangeItems);
                }
            }

            // Update the anchor point to the current item
            rangeStartItem = item;
        });
        // end::snippet[]

        add(grid);
    }

    public static class Exporter // hidden-source-line
            extends DemoExporter<GridRangeSelection> { // hidden-source-line
    } // hidden-source-line
}
