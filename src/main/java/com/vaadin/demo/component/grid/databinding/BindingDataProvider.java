package com.vaadin.demo.component.grid.databinding;

import com.vaadin.flow.component.grid.Grid;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.component.select.Select;
import com.vaadin.flow.component.textfield.TextField;
import com.vaadin.flow.data.provider.ConfigurableFilterDataProvider;
import com.vaadin.flow.data.value.ValueChangeMode;

// tag::body[]
public class BindingDataProvider extends VerticalLayout {
    private TextField nameFilter;
    private Select<String> departmentFilter;

    public BindingDataProvider() {
        Grid<Person> grid = new Grid<>(Person.class);

        // Enable sorting for the columns. When the user sorts the columns,
        // the updated sort orders are passed to the data provider and are
        // available through Query#getSortOrders().
        grid.setSortableColumns("name", "department");

        // Create a data provider instance with a configurable filter allowing
        // the filter value to be set programmatically via setFilter(). The filter
        // value is passed to the data provider on change and is available through
        // Query#getFilter().
        ConfigurableFilterDataProvider<Person, Void, PersonFilter> dataProvider = new PersonDataProvider()
                .withConfigurableFilter();
        grid.setDataProvider(dataProvider);

        // Create filter components
        nameFilter = new TextField("Search by name", event -> {
            dataProvider.setFilter(createFilterObject());
        });
        nameFilter.setValueChangeMode(ValueChangeMode.EAGER);

        departmentFilter = new Select<>("Department", event -> {
            dataProvider.setFilter(createFilterObject());
        });
        departmentFilter.setItems("", "Engineering", "Marketing", "HR");

        add(nameFilter, departmentFilter, grid);
    }

    private PersonFilter createFilterObject() {
        return new PersonFilter(nameFilter.getValue(), departmentFilter.getValue());
    }
}
// end::body[]
