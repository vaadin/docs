package com.vaadin.demo.component.grid.databinding;

import com.vaadin.flow.component.grid.Grid;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.component.select.Select;
import com.vaadin.flow.component.textfield.TextField;
import com.vaadin.flow.data.value.ValueChangeMode;

public class BindingLazyLoadedList extends VerticalLayout {
    public BindingLazyLoadedList() {
        // tag::body[]
        Grid<Person> grid = new Grid<>(Person.class);

        // Filtering
        TextField searchInput = new TextField("Search", event -> {
            grid.getLazyDataView().refreshAll();
        });
        searchInput.setValueChangeMode(ValueChangeMode.EAGER);

        // Sorting
        Select<String> sortBySelect = new Select<>("Sort by", event -> {
            grid.getLazyDataView().refreshAll();
        });
        sortBySelect.setItems("", "Name (A-Z)", "Name (Z-A)");

        // Binding
        grid.setItems(
                (query) -> PersonService.fetch(
                        searchInput.getValue(),
                        sortBySelect.getValue(),
                        query.getOffset(),
                        query.getLimit()),
                (query) -> PersonService.count(searchInput.getValue()));

        add(searchInput, sortBySelect, grid);
        // end::body[]
    }
}
