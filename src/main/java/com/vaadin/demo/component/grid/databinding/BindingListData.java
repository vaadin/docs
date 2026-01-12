package com.vaadin.demo.component.grid.databinding;

import com.vaadin.flow.component.grid.Grid;
import com.vaadin.flow.component.grid.dataview.GridListDataView;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.component.select.Select;
import com.vaadin.flow.component.textfield.TextField;
import com.vaadin.flow.data.provider.SortDirection;
import com.vaadin.flow.data.value.ValueChangeMode;

public class BindingListData extends VerticalLayout {
    public BindingListData() {
        // tag::body[]
        Grid<Person> grid = new Grid<>(Person.class);

        // Binding
        GridListDataView<Person> dataView = grid.setItems(
                new Person("Michael Chen", "Engineering"),
                new Person("Sarah Johnson", "Engineering"),
                new Person("David Rodriguez", "Marketing"),
                new Person("Emma Wilson", "HR"));

        // Filtering
        TextField searchInput = new TextField("Search", event -> {
            if (!event.getValue().isEmpty()) {
                // Set a filter to show only people whose name contains the search term
                dataView.setFilter(person -> person
                        .name().toLowerCase().contains(event.getValue().toLowerCase()));
            } else {
                // Clear the filter if the search term is empty
                dataView.removeFilters();
            }
        });
        searchInput.setValueChangeMode(ValueChangeMode.EAGER);

        // Sorting
        Select<String> sortBySelect = new Select<>("Sort by", event -> {
            switch (event.getValue()) {
                case "Name (A-Z)" ->
                    // Set sort order to ascending by name
                    dataView.setSortOrder(Person::name, SortDirection.ASCENDING);
                case "Name (Z-A)" ->
                    // Set sort order to descending by name
                    dataView.setSortOrder(Person::name, SortDirection.DESCENDING);
                default ->
                    // Clear sorting
                    dataView.removeSorting();
            }
        });
        sortBySelect.setItems("", "Name (A-Z)", "Name (Z-A)");

        add(searchInput, sortBySelect, grid);
        // end::body[]
    }
}
