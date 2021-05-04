package com.vaadin.demo.ce;

import java.time.Duration;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;

import com.vaadin.collaborationengine.CollaborationBinder;
import com.vaadin.collaborationengine.UserInfo;
import com.vaadin.demo.domain.User;
import com.vaadin.demo.domain.User.UserService;
import com.vaadin.flow.component.checkbox.Checkbox;
import com.vaadin.flow.component.checkbox.CheckboxGroup;
import com.vaadin.flow.component.combobox.ComboBox;
import com.vaadin.flow.component.textfield.TextField;

/**
 * Code snippets used in CollaborationBinder's reference documentation.
 */
public class BinderDocumentation {

    private static class Person extends User {
        private long id;
        private MaritalStatus maritalStatus;
        private Person supervisor;

        public MaritalStatus getMaritalStatus() {
            return maritalStatus;
        }

        public void setMaritalStatus(MaritalStatus maritalStatus) {
            this.maritalStatus = maritalStatus;
        }

        public Person getSupervisor() {
            return supervisor;
        }

        public void setSupervisor(Person supervisor) {
            this.supervisor = supervisor;
        }
    }

    private enum MaritalStatus {
        SINGLE, MARRIED;
    }

    private static class PersonService {
        private Person findById(long id) {
            return new Person();
        }

        private List<Person> findAllSupervisors() {
            return new ArrayList<>();
        }
    }

    private UserService userService;
    private PersonService personService;
    private CollaborationBinder<Person> binder;

    public BinderDocumentation() {
        // tag::binder-new[]
        User userEntity = userService.getCurrentUser();

        UserInfo userInfo = new UserInfo(userEntity.getId(),
                userEntity.getName());

        CollaborationBinder<Person> binder = new CollaborationBinder<>(
                Person.class, userInfo);
        // end::binder-new[]

        // tag::binder-bind[]
        TextField name = new TextField();
        binder.forField(name).bind("name");
        // end::binder-bind[]

        // tag::binder-serializer[]
        ComboBox<Person> supervisor = new ComboBox<>();
        supervisor.setItems(personService.findAllSupervisors());

        binder.setSerializer(Person.class,
                person -> String.valueOf(person.getId()),
                id -> personService.findById(Long.parseLong(id)));

        binder.bind(supervisor, "supervisor");
        // end::binder-serializer[]
        // tag::binder-bind[]
        CheckboxGroup<String> pets = new CheckboxGroup<>();
        pets.setItems("Dog", "Cat", "Parrot");

        binder.forField(pets, Set.class, String.class).bind("pets");
        // end::binder-bind[]
        // tag::binder-converter[]
        Checkbox married = new Checkbox();
        binder.forField(married, Boolean.class)
                .withConverter(
                        fieldValue -> fieldValue ? MaritalStatus.MARRIED
                                : MaritalStatus.SINGLE,
                        MaritalStatus.MARRIED::equals)
                .bind("maritalStatus");
        // end::binder-converter[]

        // tag::binder-expiration-timeout[]
        binder.setExpirationTimeout(Duration.ofMinutes(15));
        // end::binder-expiration-timeout[]
    }

    // tag::binder-topic[]
    public void personSelected(long personId) {
        binder.setTopic("person/" + personId,
                () -> personService.findById(personId));
    }
    // end::binder-topic[]
}
