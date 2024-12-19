package com.vaadin.demo.component.grid;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

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

    private Person startItem;

    public GridRangeSelection() {
        Grid<Person> grid = new Grid<>(Person.class, false);
        grid.addColumn(Person::getFirstName).setHeader("First name");
        grid.addColumn(Person::getLastName).setHeader("Last name");
        grid.addColumn(Person::getEmail).setHeader("Email");

        List<Person> people = DataService.getPeople();
        grid.setItems(people);

        // tag::snippet[]
        grid.setSelectionMode(Grid.SelectionMode.MULTI);
        ((GridMultiSelectionModel<Person>) grid.getSelectionModel())
                .addClientItemToggleListener(event -> {
                    Person item = event.getItem();

                    // If the anchor point isn't set, set it to the current item
                    startItem = startItem != null ? startItem : item;

                    if (event.isShiftKey()) {
                        // Calculcate the range of items between the anchor point and
                        // the current item
                        int startIndex = grid.getListDataView().getItemIndex(startItem).get();
                        int endIndex = grid.getListDataView().getItemIndex(endItem).get();
                        Set<Person> rangeItems = grid.getListDataView().getItems().skip(Math.min(startIndex, endIndex)).limit(Math.abs(startIndex - endIndex) + 1).collect(Collectors.toSet());

                        // Update the selection state of the items within the range
                        // based on the state of the current item
                        if (event.isSelected()) {
                            grid.asMultiSelect().select(rangeItems);
                        } else {
                            grid.asMultiSelect().deselect(rangeItems);
                        }
                    }

                    // Update the anchor point to the current item
                    startItem = item;
                });
        // end::snippet[]
        add(grid);
    }

    public static class Exporter // hidden-source-line
            extends DemoExporter<GridRangeSelection> { // hidden-source-line
    } // hidden-source-line
}
