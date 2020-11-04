package com.vaadin.demo;

import com.vaadin.demo.domain.Person;
import com.vaadin.flow.server.connect.Endpoint;

/**
 * A Vaadin endpoint for the person-view.ts form view.
 */
@Endpoint
public class PersonEndpoint {
    /**
     * Loads a Person to edit into the view.
     * @return default form data
     */
    public Person loadPerson() {
        return new Person();
    }

    /**
     * Saves the edited Person from the view.
     * @param person form data to save
     */
    public void savePerson(Person person) {

    }
}
