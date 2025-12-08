package com.vaadin.demo.buildingapps.grid;

// tag::full[]
import java.util.Collections;
import java.util.List;

import com.vaadin.flow.component.grid.Grid;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.component.textfield.TextField;
import com.vaadin.flow.data.value.ValueChangeMode;
import com.vaadin.flow.router.Route;

@Route("building-apps/grid/buffered-grid")
public class BufferedGridView extends VerticalLayout {

    BufferedGridView() {
        // In a real application, this would be injected or
        // retrieved via a service locator
        var service = new ItemService();

        // Create components
        var filterField = new TextField();
        filterField.setPlaceholder("Filter items");
        // Update the filter value as soon as the user stops typing
        filterField.setValueChangeMode(ValueChangeMode.LAZY);

        var grid = new Grid<Item>();
        // tag::sorting[]
        grid.addColumn(Item::id).setHeader("ID").setSortable(true);
        grid.addColumn(Item::name).setHeader("Name").setSortable(true);
        // end::sorting[]

        // tag::filtering[]
        // Update the grid whenever the text field changes
        filterField.addValueChangeListener(e -> grid.setItems(
                service.findItems(e.getValue())));
        // end::filtering[]

        // Layout components
        add(filterField);
        add(grid);
        setSizeFull();
    }

    // tag::data[]
    // In a real application, this would be in its own file
    static class ItemService {
        private static final List<Item> ITEMS = List.of(
                new Item(1, "Denmark"),
                new Item(2, "Finland"),
                new Item(3, "Norway"),
                new Item(4, "Iceland"),
                new Item(5, "Sweden"),
                new Item(6, "Estonia"),
                new Item(7, "Germany"));

        public List<Item> findItems(String filterString) {
            // In a real application, this would query a database and
            // enforce a maximum result size to avoid flooding the UI
            // with too many items.
            var filterLower = filterString.toLowerCase().trim();
            return filterLower.isEmpty()
                    ? Collections.emptyList()
                    : ITEMS.stream()
                            .filter(item -> item
                                    .name()
                                    .toLowerCase()
                                    .contains(filterLower))
                            .toList();
        }
    }

    record Item(long id, String name) {
    }
    // end::data[]
}
// end::full[]
