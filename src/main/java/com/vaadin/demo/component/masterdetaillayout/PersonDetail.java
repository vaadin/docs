package com.vaadin.demo.component.masterdetaillayout;

import com.vaadin.demo.domain.Person;
import com.vaadin.flow.component.ComponentEvent;
import com.vaadin.flow.component.ComponentEventListener;
import com.vaadin.flow.component.button.Button;
import com.vaadin.flow.component.formlayout.FormLayout;
import com.vaadin.flow.component.textfield.EmailField;
import com.vaadin.flow.component.textfield.TextField;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.shared.Registration;

public class PersonDetail extends VerticalLayout {
    private final FormLayout formLayout;
    private final TextField firstNameField;
    private final TextField lastNameField;
    private final EmailField emailField;
    private final TextField professionField;

    public PersonDetail() {
        formLayout = new FormLayout();

        firstNameField = new TextField("First Name");
        firstNameField.setReadOnly(true);
        lastNameField = new TextField("First Name");
        lastNameField.setReadOnly(true);
        emailField = new EmailField("Email");
        emailField.setReadOnly(true);
        professionField = new TextField("Profession");
        professionField.setReadOnly(true);

        formLayout.add(firstNameField, lastNameField, emailField,
                professionField);

        Button closeButton = new Button("Close");
        closeButton.addClickListener(
                event -> fireEvent(new CloseEvent(this, false)));

        add(formLayout, closeButton);
        setPadding(true);
    }

    public void setPerson(Person person) {
        if (person != null) {
            firstNameField.setValue(person.getFirstName());
            lastNameField.setValue(person.getLastName());
            emailField.setValue(person.getEmail());
            professionField.setValue(person.getProfession());
        } else {
            firstNameField.clear();
            lastNameField.clear();
            emailField.clear();
            professionField.clear();
        }
    }

    public static class CloseEvent extends ComponentEvent<PersonDetail> {
        public CloseEvent(PersonDetail source, boolean fromClient) {
            super(source, fromClient);
        }
    }

    public Registration addCloseListener(
            ComponentEventListener<CloseEvent> listener) {
        return addListener(CloseEvent.class, listener);
    }
}
