package com.vaadin.demo.component.grid;

import java.util.List;
import java.util.Set;

import com.vaadin.demo.domain.DataService;
import com.vaadin.demo.domain.Person;
import com.vaadin.flow.component.grid.Grid;
import com.vaadin.flow.component.html.Div;

public class GridDragMultipleRows extends Div {

    // tag::snippet[]
    private List<Person> draggedItems = List.of();

    public GridDragMultipleRows() {
        Grid<Person> grid = new Grid<>(Person.class, false);
        grid.setColumns("firstName", "lastName"); // hidden-source-line
        grid.setItems(DataService.getPeople()); // hidden-source-line
        grid.setSelectionMode(Grid.SelectionMode.MULTI);
        grid.setRowsDraggable(true);

        // Show the number of all selected rows in the drag image
        grid.addSelectionListener(e -> grid.setSelectionDragDetails(
                e.getAllSelectedItems().size(),
                // No custom drag data
                null));

        grid.addDragStartListener(e -> {
            // The event has only the dragged rows that are visible
            List<Person> visibleItems = e.getDraggedItems();
            Set<Person> selectedItems = grid.getSelectedItems();
            // Dragging a selected row drags the whole selection
            draggedItems = selectedItems.containsAll(visibleItems)
                    ? List.copyOf(selectedItems)
                    : visibleItems;
        });
        add(grid); // hidden-source-line
    }
    // end::snippet[]
}
