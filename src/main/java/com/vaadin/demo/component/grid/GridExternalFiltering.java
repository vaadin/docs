package com.vaadin.demo.component.grid;

import com.vaadin.demo.DemoExporter; // hidden-source-line
import com.vaadin.demo.domain.DataService;
import com.vaadin.demo.domain.Person;
import com.vaadin.flow.component.grid.Grid;
import com.vaadin.flow.component.grid.dataview.GridListDataView;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.icon.Icon;
import com.vaadin.flow.component.icon.VaadinIcon;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.component.textfield.TextField;
import com.vaadin.flow.data.renderer.LitRenderer;
import com.vaadin.flow.data.renderer.Renderer;
import com.vaadin.flow.data.value.ValueChangeMode;
import com.vaadin.flow.router.Route;

import java.util.List;

@Route("grid-external-filtering")
public class GridExternalFiltering extends Div {

    public GridExternalFiltering() {
        // tag::snippet[]
        Grid<Person> grid = new Grid<>(Person.class, false);
        grid.addColumn(createPersonRenderer()).setHeader("Name").setFlexGrow(0)
                .setWidth("230px");
        grid.addColumn(Person::getEmail).setHeader("Email");
        grid.addColumn(Person::getProfession).setHeader("Profession");

        List<Person> people = DataService.getPeople();
        GridListDataView<Person> dataView = grid.setItems(people);

        TextField searchField = new TextField();
        searchField.setWidth("50%");
        searchField.setPlaceholder("Search");
        searchField.setPrefixComponent(new Icon(VaadinIcon.SEARCH));
        searchField.setValueChangeMode(ValueChangeMode.EAGER);
        searchField.addValueChangeListener(e -> dataView.refreshAll());

        dataView.addFilter(person -> {
            String searchTerm = searchField.getValue().trim();

            if (searchTerm.isEmpty())
                return true;

            boolean matchesFullName = matchesTerm(person.getFullName(),
                    searchTerm);
            boolean matchesEmail = matchesTerm(person.getEmail(), searchTerm);
            boolean matchesProfession = matchesTerm(person.getProfession(),
                    searchTerm);

            return matchesFullName || matchesEmail || matchesProfession;
        });
        // end::snippet[]

        VerticalLayout layout = new VerticalLayout(searchField, grid);
        layout.setPadding(false);

        add(layout);
    }

    private static Renderer<Person> createPersonRenderer() {
        return LitRenderer.<Person>of(
                "<vaadin-horizontal-layout style=\"align-items: center;\" theme=\"spacing\">"
                        + "  <vaadin-avatar img=\"${item.pictureUrl}\" name=\"${item.fullName}\"></vaadin-avatar>"
                        + "  <span> ${item.fullName} </span>"
                        + "</vaadin-horizontal-layout>")
                .withProperty("pictureUrl", Person::getPictureUrl)
                .withProperty("fullName", Person::getFullName);
    }

    private boolean matchesTerm(String value, String searchTerm) {
        return value.toLowerCase().contains(searchTerm.toLowerCase());
    }

    public static class Exporter // hidden-source-line
            extends DemoExporter<GridExternalFiltering> { // hidden-source-line
    } // hidden-source-line
}
