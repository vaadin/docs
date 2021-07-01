package com.vaadin.demo.component.grid;

import com.vaadin.demo.DemoExporter; // hidden-source-line
import com.vaadin.demo.domain.DataService;
import com.vaadin.demo.domain.Person;
import com.vaadin.flow.component.formlayout.FormLayout;
import com.vaadin.flow.component.grid.Grid;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.textfield.TextField;
import com.vaadin.flow.data.renderer.ComponentRenderer;
import com.vaadin.flow.router.Route;

import java.util.List;

@Route("grid-item-details")
public class GridItemDetails extends Div {

    public GridItemDetails() {
        // tag::snippet1[]
        Grid<Person> grid = new Grid<>(Person.class, false);
        grid.addColumn(Person::getFullName).setHeader("Name");
        grid.addColumn(Person::getProfession).setHeader("Profession");

        grid.setItemDetailsRenderer(createPersonDetailsRenderer());
        // end::snippet1[]

        List<Person> people = DataService.getPeople();
        grid.setItems(people);

        grid.setThemeName("row-stripes");

        add(grid);
    }

    // tag::snippet2[]
    private static ComponentRenderer<PersonDetailsFormLayout, Person> createPersonDetailsRenderer() {
        return new ComponentRenderer<>(PersonDetailsFormLayout::new,
                PersonDetailsFormLayout::setPerson);
    }

    private static class PersonDetailsFormLayout extends FormLayout {
        private final TextField emailField;
        private final TextField phoneField;
        private final TextField streetField;
        private final TextField zipField;
        private final TextField cityField;
        private final TextField stateField;

        public PersonDetailsFormLayout() {
            emailField = new TextField("Email address");
            emailField.setReadOnly(true);
            add(emailField);
            phoneField = new TextField("Phone number");
            phoneField.setReadOnly(true);
            add(phoneField);
            streetField = new TextField("Street address");
            streetField.setReadOnly(true);
            add(streetField);
            zipField = new TextField("ZIP code");
            zipField.setReadOnly(true);
            add(zipField);
            cityField = new TextField("City");
            cityField.setReadOnly(true);
            add(cityField);
            stateField = new TextField("State");
            stateField.setReadOnly(true);
            add(stateField);

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
    // end::snippet2[]

    public static class Exporter // hidden-source-line
            extends DemoExporter<GridItemDetails> { // hidden-source-line
    } // hidden-source-line
}
