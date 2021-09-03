package com.vaadin.demo.component.grid;

import com.vaadin.demo.DemoExporter; // hidden-source-line
import com.vaadin.demo.domain.DataService;
import com.vaadin.demo.domain.Person;
import com.vaadin.flow.component.formlayout.FormLayout;
import com.vaadin.flow.component.grid.Grid;
import com.vaadin.flow.component.grid.GridVariant;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.textfield.TextField;
import com.vaadin.flow.data.renderer.ComponentRenderer;
import com.vaadin.flow.data.renderer.LitRenderer;
import com.vaadin.flow.data.renderer.Renderer;
import com.vaadin.flow.router.Route;

import java.util.List;
import java.util.stream.Stream;

@Route("grid-item-details-toggle")
public class GridItemDetailsToggle extends Div {

    public GridItemDetailsToggle() {
        // tag::snippet1[]
        Grid<Person> grid = new Grid<>(Person.class, false);
        grid.addColumn(Person::getFullName).setHeader("Name");
        grid.addColumn(Person::getProfession).setHeader("Profession");
        grid.addColumn(createToggleDetailsRenderer(grid));

        grid.setDetailsVisibleOnClick(false);
        grid.setItemDetailsRenderer(createPersonDetailsRenderer());
        // end::snippet1[]

        List<Person> people = DataService.getPeople();
        grid.setItems(people);

        grid.addThemeVariants(GridVariant.LUMO_ROW_STRIPES);

        add(grid);
    }

    // tag::snippet2[]
    private static Renderer<Person> createToggleDetailsRenderer(
            Grid<Person> grid) {
        return LitRenderer.<Person>of(
                "<vaadin-button theme=\"tertiary\" @click=\"${handleClick}\">Toggle details</vaadin-button>")
                .withFunction("handleClick", person -> grid
                        .setDetailsVisible(person,
                                !grid.isDetailsVisible(person)));
    }
    // end::snippet2[]

    private static ComponentRenderer<PersonDetailsFormLayout, Person> createPersonDetailsRenderer() {
        return new ComponentRenderer<>(PersonDetailsFormLayout::new,
                PersonDetailsFormLayout::setPerson);
    }

    private static class PersonDetailsFormLayout extends FormLayout {
        private final TextField emailField = new TextField("Email address");
        private final TextField phoneField = new TextField("Phone number");
        private final TextField streetField = new TextField("Street address");
        private final TextField zipField = new TextField("ZIP code");
        private final TextField cityField = new TextField("City");
        private final TextField stateField = new TextField("State");

        public PersonDetailsFormLayout() {
            Stream.of(emailField, phoneField, streetField, zipField, cityField,
                    stateField).forEach(field -> {
                field.setReadOnly(true);
                add(field);
            });

            setResponsiveSteps(new ResponsiveStep("0", 3));
            setColspan(emailField, 3);
            setColspan(phoneField, 3);
            setColspan(streetField, 3);
        }

        public void setPerson(Person person) {
            emailField.setValue(person.getEmail());
            phoneField.setValue(person.getAddress().getPhone());
            streetField.setValue(person.getAddress().getStreet());
            zipField.setValue(person.getAddress().getZip());
            cityField.setValue(person.getAddress().getCity());
            stateField.setValue(person.getAddress().getState());
        }
    }

    public static class Exporter // hidden-source-line
            extends DemoExporter<GridItemDetailsToggle> { // hidden-source-line
    } // hidden-source-line
}
