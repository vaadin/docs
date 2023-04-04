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
public class GridDataProvider extends Div {

    // tag::snippet[]
    private PersonFilter personFilter = new PersonFilter();

    private PersonDataProvider dataProvider = new PersonDataProvider();

    private ConfigurableFilterDataProvider<Person, Void, PersonFilter> filterDataProvider = dataProvider
            .withConfigurableFilter();

    public GridDataProvider() {
        Grid<Person> grid = new Grid<>();
        grid.addColumn(Person::getFullName, "name").setHeader("Name");
        grid.addColumn(Person::getProfession, "profession").setHeader("Profession");
        grid.setItems(filterDataProvider);

        TextField searchField = new TextField();
        searchField.setWidth("50%");
        searchField.setPlaceholder("Search");
        searchField.setPrefixComponent(new Icon(VaadinIcon.SEARCH));
        searchField.setValueChangeMode(ValueChangeMode.EAGER);
        searchField.addValueChangeListener(e -> {
            personFilter.setSearchTerm(e.getValue());
            filterDataProvider.setFilter(personFilter);
        });

        VerticalLayout layout = new VerticalLayout(searchField, grid);
        layout.setPadding(false);
        add(layout);
    }
    // end::snippet[]

    public static class Exporter // hidden-source-line
            extends DemoExporter<GridDataProvider> { // hidden-source-line
    } // hidden-source-line
}
