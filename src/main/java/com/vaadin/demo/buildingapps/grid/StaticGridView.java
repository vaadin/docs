package com.vaadin.demo.buildingapps.grid;

// tag::full[]
import java.util.List;

import com.vaadin.flow.component.grid.Grid;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.component.textfield.TextField;
import com.vaadin.flow.data.value.ValueChangeMode;
import com.vaadin.flow.router.Route;

@Route("building-apps/grid/static-grid")
public class StaticGridView extends VerticalLayout {

    StaticGridView() {
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

        // Set up data provider with filtering
        // tag::dataprovider[]
        var dataView = grid.setItems(service.getAllItems());
        // end::dataprovider[]
        // tag::filtering[]
        // Set the filter whenever the text field changes
        filterField.addValueChangeListener(e -> {
            var filterString = e.getValue().toLowerCase();
            if (filterString.isBlank()) {
                // No string -> show all items
                dataView.removeFilters();
            } else {
                dataView.setFilter(item -> item.name().toLowerCase()
                        .contains(filterString));
            }
        });
        // end::filtering[]

        // Layout components
        add(filterField);
        add(grid);
        setSizeFull();
    }

    // tag::data[]
    // In a real application, this would be in its own file
    static class ItemService {
        // @formatter:off hidden-source-line
        private static final List<Item> ITEMS = List.of(
                new Item(1, "Denmark"),
                new Item(2, "Finland"),
                new Item(3, "Norway"),
                new Item(4, "Iceland"),
                new Item(5, "Sweden"),
                new Item(6, "Estonia"),
                new Item(7, "Germany"));
        // @formatter:on hidden-source-line

        public List<Item> getAllItems() {
            return ITEMS;
        }
    }

    record Item(long id, String name) {
    }
    // end::data[]
}
// end::full[]
