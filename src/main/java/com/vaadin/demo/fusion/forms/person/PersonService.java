package com.vaadin.demo.fusion.forms.person;

import java.time.LocalDate;
import java.util.List;

import com.vaadin.flow.server.auth.AnonymousAllowed;
import com.vaadin.hilla.BrowserCallable;

// tag::snippet[]
@BrowserCallable
@AnonymousAllowed
public class PersonService {

    private Person person = new Person("Jane", "Doe", "jane.doe@example.com",
            LocalDate.of(1990, 5, 17),
            new Address("Main Street 1", "12345", "Springfield"),
            List.of(new PhoneNumber("+1 555 0100", "Work")));

    public Person loadPerson() {
        return person;
    }

    public Person savePerson(Person person) {
        this.person = person;
        return person;
    }
}
// end::snippet[]
