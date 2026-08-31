package com.vaadin.demo.component.crud;

import java.util.ArrayList;
import java.util.List;

import com.vaadin.demo.domain.Person;
import com.vaadin.flow.component.Component;
import com.vaadin.flow.component.crud.CrudEditor;
import com.vaadin.flow.component.formlayout.FormLayout;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.html.ListItem;
import com.vaadin.flow.component.html.UnorderedList;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.component.textfield.EmailField;
import com.vaadin.flow.component.textfield.TextField;

// An editor that validates the item itself and reports all problems in a
// single summary at the top of the form, instead of using a Binder.
public class PersonCrudEditor implements CrudEditor<Person> {

    private final TextField firstName = new TextField("First name");
    private final TextField lastName = new TextField("Last name");
    private final EmailField email = new EmailField("Email");

    private final Div errorSummary = new Div();
    private final VerticalLayout view;

    private Person item;

    public PersonCrudEditor() {
        // Announce the errors to screen readers when the summary appears.
        errorSummary.getElement().setAttribute("role", "alert");
        errorSummary.setVisible(false);

        view = new VerticalLayout(errorSummary,
                new FormLayout(firstName, lastName, email));
        view.setPadding(false);
    }

    // Called when the editor is opened, for both new and existing items.
    @Override
    public void setItem(Person item, boolean validate) {
        this.item = item;
        firstName.setValue(orEmpty(item.getFirstName()));
        lastName.setValue(orEmpty(item.getLastName()));
        email.setValue(orEmpty(item.getEmail()));

        if (validate) {
            validate();
        }
    }

    @Override
    public Person getItem() {
        return item;
    }

    // Called when the editor is closed, after a save, delete, or cancel.
    @Override
    public void clear() {
        item = null;
        firstName.clear();
        lastName.clear();
        email.clear();
        errorSummary.removeAll();
        errorSummary.setVisible(false);
    }

    // Called when Save is clicked. Returning false keeps the editor open and
    // leaves the item unchanged.
    @Override
    public boolean validate() {
        List<String> errors = new ArrayList<>();
        if (firstName.isEmpty()) {
            errors.add("Enter a first name.");
        }
        if (lastName.isEmpty()) {
            errors.add("Enter a last name.");
        }
        if (!email.getValue().contains("@")) {
            errors.add("Enter a valid email address.");
        }

        UnorderedList messages = new UnorderedList();
        errors.forEach(error -> messages.add(new ListItem(error)));
        errorSummary.removeAll();
        errorSummary.add(messages);
        errorSummary.setVisible(!errors.isEmpty());

        return errors.isEmpty();
    }

    // Called after validate() has passed, before the save event is fired.
    @Override
    public void writeItemChanges() {
        item.setFirstName(firstName.getValue());
        item.setLastName(lastName.getValue());
        item.setEmail(email.getValue());
    }

    @Override
    public Component getView() {
        return view;
    }

    private static String orEmpty(String value) {
        return value == null ? "" : value;
    }
}
