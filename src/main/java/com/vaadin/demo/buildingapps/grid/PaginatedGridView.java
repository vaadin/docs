package com.vaadin.demo.buildingapps.grid;

// tag::full[]
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;

import com.vaadin.flow.component.grid.Grid;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.component.textfield.TextField;
import com.vaadin.flow.data.provider.QuerySortOrder;
import com.vaadin.flow.data.provider.SortDirection;
import com.vaadin.flow.data.value.ValueChangeMode;
import com.vaadin.flow.router.Route;

@Route("building-apps/grid/paginated-grid")
public class PaginatedGridView extends VerticalLayout {

    PaginatedGridView() {
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
        grid.addColumn(Item::id).setHeader("ID").setSortProperty("id");
        grid.addColumn(Item::name).setHeader("Name").setSortProperty("name");
        // end::sorting[]
        // tag::filtering[]
        // tag::dataprovider[]
        // Fetch a slice from the service whenever the grid needs more data.
        // Include sorting and filtering info.
        grid.setItems(query -> service
                .findItems(
                        query.getOffset(),
                        query.getLimit(),
                        query.getSortOrders(),
                        filterField.getValue())
                .stream());
        // end::dataprovider[]

        // Refresh the grid whenever the text field changes
        filterField.addValueChangeListener(e -> grid
                .getDataProvider()
                .refreshAll());
        // end::filtering[]

        // Layout components
        add(filterField);
        add(grid);
        setSizeFull();
    }

    // tag::data[]
    // In a real application, this would be in its own file
    static class ItemService {
        // end::data[]
        private final List<Item> items = new ArrayList<>();

        ItemService() {
            for (int i = 0; i < 1000; ++i) {
                items.add(new Item(i, "Item " + i));
            }
        }
        // tag::data[]

        public List<Item> findItems(int offset, int limit,
                List<QuerySortOrder> sortOrders, String filterString) {
            // In a real application, this would query a database
            // end::data[]
            var filterLower = filterString.toLowerCase().trim();
            var stream = filterLower.isEmpty()
                    ? items.stream()
                    : items.stream()
                            .filter(item -> item
                                    .name()
                                    .toLowerCase()
                                    .contains(filterLower));
            return stream
                    .sorted(toComparator(sortOrders))
                    .skip(offset)
                    .limit(limit)
                    .toList();
            // tag::data[]
        }
        // end::data[]

        // In a real application, the sorting would take place in the database,
        // NOT in memory as shown here
        private final Comparator<Item> defaultComparator = Comparator
                .comparing(Item::id);

        private Comparator<Item> toComparator(List<QuerySortOrder> sortOrders) {
            return sortOrders.stream()
                    .map(this::toComparator)
                    .reduce(Comparator::thenComparing)
                    .orElse(defaultComparator);
        }

        private Comparator<Item> toComparator(QuerySortOrder sortOrder) {
            if (sortOrder.getSorted().equals("name")) {
                return observeSortDirection(Comparator.comparing(Item::name),
                        sortOrder.getDirection());
            } else {
                return observeSortDirection(defaultComparator,
                        sortOrder.getDirection());
            }
        }

        private Comparator<Item> observeSortDirection(
                Comparator<Item> ascendingComparator,
                SortDirection sortDirection) {
            return sortDirection == SortDirection.ASCENDING
                    ? ascendingComparator
                    : ascendingComparator.reversed();
        }
        // tag::data[]
    }

    record Item(long id, String name) {
    }
    // end::data[]
}
// end::full[]