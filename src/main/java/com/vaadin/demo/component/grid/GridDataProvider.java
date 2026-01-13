package com.vaadin.demo.component.grid;

import com.vaadin.demo.DemoExporter; // hidden-source-line
import com.vaadin.demo.domain.Person;
import com.vaadin.flow.component.grid.Grid;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.icon.Icon;
import com.vaadin.flow.component.icon.VaadinIcon;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.component.textfield.TextField;
import com.vaadin.flow.data.value.ValueChangeMode;
import com.vaadin.flow.data.provider.ConfigurableFilterDataProvider;
import com.vaadin.flow.router.Route;

@Route("grid-data-provider")
public class GridDataProvider extends VerticalLayout {
    public GridDataProvider() {
        setPadding(false)

        // tag::snippet[]
        Grid<Person> grid = new Grid<>();
        grid.addColumn(Person::getFullName, "name")
                .setSortable(true).setHeader("Name");
        grid.addColumn(Person::getProfession, "profession")
                .setSortable(true).setHeader("Profession");

        // Create a data provider instance with a configurable filter, allowing
        // the filter value to be set programmatically via setFilter().
        // @formatter:off hidden-source-line
        ConfigurableFilterDataProvider<Person, Void, String> dataProvider =
                new PersonDataProvider().withConfigurableFilter();
        // @formatter:on hidden-source-line
        grid.setItems(dataProvider);

        TextField searchField = new TextField();
        searchField.setWidth("50%");
        searchField.setPlaceholder("Search");
        searchField.setPrefixComponent(new Icon(VaadinIcon.SEARCH));
        searchField.setValueChangeMode(ValueChangeMode.EAGER);
        searchField.addValueChangeListener(event -> {
            dataProvider.setFilter(event.getValue());
        });

        add(searchField, grid);
        // end::snippet[]
    }

    public static class Exporter // hidden-source-line
            extends DemoExporter<GridDataProvider> { // hidden-source-line
    } // hidden-source-line
}
