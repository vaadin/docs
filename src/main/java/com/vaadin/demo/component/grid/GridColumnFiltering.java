package com.vaadin.demo.component.grid;

import com.vaadin.demo.DemoExporter; // hidden-source-line
import com.vaadin.demo.domain.DataService;
import com.vaadin.demo.domain.Person;
import com.vaadin.flow.component.Component;
import com.vaadin.flow.component.grid.Grid;
import com.vaadin.flow.component.grid.HeaderRow;
import com.vaadin.flow.component.grid.dataview.GridListDataView;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.html.Label;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.component.textfield.TextField;
import com.vaadin.flow.data.renderer.TemplateRenderer;
import com.vaadin.flow.data.value.ValueChangeMode;
import com.vaadin.flow.router.Route;

import java.util.List;
import java.util.function.Consumer;

@Route("grid-column-filtering")
public class GridColumnFiltering extends Div {

    public GridColumnFiltering() {
        // tag::snippet1[]
        Grid<Person> grid = new Grid<>(Person.class, false);
        Grid.Column<Person> nameColumn = grid.addColumn(createPersonRenderer());
        Grid.Column<Person> emailColumn = grid.addColumn(Person::getEmail);
        Grid.Column<Person> professionColumn = grid
                .addColumn(Person::getProfession);

        List<Person> people = DataService.getPeople();
        GridListDataView<Person> dataView = grid.setItems(people);
        PersonFilter personFilter = new PersonFilter(dataView);

        grid.getHeaderRows().clear();
        HeaderRow headerRow = grid.appendHeaderRow();

        headerRow.getCell(nameColumn).setComponent(
                createFilterHeader("Name", personFilter::setFullName));
        headerRow.getCell(emailColumn).setComponent(
                createFilterHeader("Email", personFilter::setEmail));
        headerRow.getCell(professionColumn).setComponent(
                createFilterHeader("Profession", personFilter::setProfession));
        // end::snippet1[]

        add(grid);
    }

    // tag::snippet2[]
    private static Component createFilterHeader(String labelText,
            Consumer<String> filterChangeConsumer) {
        Label label = new Label(labelText);
        TextField textField = new TextField();
        textField.setValueChangeMode(ValueChangeMode.EAGER);
        textField.setClearButtonVisible(true);
        textField.setThemeName("small");
        textField.setWidthFull();
        textField.addValueChangeListener(
                e -> filterChangeConsumer.accept(e.getValue()));
        VerticalLayout layout = new VerticalLayout(label, textField);
        layout.getThemeList().clear();
        layout.getThemeList().add("spacing-xs");

        return layout;
    }

    private static class PersonFilter {
        private final GridListDataView<Person> dataView;

        private String fullName;
        private String email;
        private String profession;

        public PersonFilter(GridListDataView<Person> dataView) {
            this.dataView = dataView;
            this.dataView.addFilter(this::test);
        }

        public void setFullName(String fullName) {
            this.fullName = fullName;
            this.dataView.refreshAll();
        }

        public void setEmail(String email) {
            this.email = email;
            this.dataView.refreshAll();
        }

        public void setProfession(String profession) {
            this.profession = profession;
            this.dataView.refreshAll();
        }

        public boolean test(Person person) {
            boolean matchesFullName = contains(person.getFullName(), fullName);
            boolean matchesEmail = contains(person.getEmail(), email);
            boolean matchesProfession = contains(person.getProfession(),
                    profession);

            return matchesFullName && matchesEmail && matchesProfession;
        }

        private boolean contains(String value, String searchText) {
            return searchText == null || searchText.equals("") || value
                    .toLowerCase().contains(searchText.toLowerCase());
        }
    }
    // end::snippet2[]

    private static TemplateRenderer<Person> createPersonRenderer() {
        return TemplateRenderer.<Person>of(
                "<vaadin-horizontal-layout style=\"align-items: center;\" theme=\"spacing\">"
                        + "  <vaadin-avatar img=\"[[item.pictureUrl]]\" name=\"[[item.fullName]]\"></vaadin-avatar>"
                        + "  <span> [[item.fullName]] </span>"
                        + "</vaadin-horizontal-layout>")
                .withProperty("pictureUrl", Person::getPictureUrl)
                .withProperty("fullName", Person::getFullName);
    }

    public static class Exporter // hidden-source-line
            extends DemoExporter<GridColumnFiltering> { // hidden-source-line
    } // hidden-source-line
}
