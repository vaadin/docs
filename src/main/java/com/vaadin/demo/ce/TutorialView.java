package com.vaadin.demo.ce;

import java.time.LocalDate;

import com.vaadin.collaborationengine.CollaborationAvatarGroup;
import com.vaadin.collaborationengine.CollaborationBinder;
import com.vaadin.collaborationengine.UserInfo;
import com.vaadin.flow.component.UI;
import com.vaadin.flow.component.datepicker.DatePicker;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.component.textfield.TextField;
import com.vaadin.flow.router.Route;

// tag::tutorial[]
@Route(value = "ce/tutorial", layout = MainView.class)
public class TutorialView extends VerticalLayout {
    // tag::person-bean[]
    public static class Person {
        private String name;
        private LocalDate dateOfBirth;

        public String getName() {
            return name;
        }

        public void setName(String name) {
            this.name = name;
        }

        public LocalDate getDateOfBirth() {
            return dateOfBirth;
        }

        public void setDateOfBirth(LocalDate dateOfBirth) {
            this.dateOfBirth = dateOfBirth;
        }
    }
    // end::person-bean[]

    public TutorialView() {
        // tag::add-components[]
        TextField nameField = new TextField("Name");
        DatePicker dateOfBirthField = new DatePicker("Date of birth");
        add(nameField, dateOfBirthField);
        // end::add-components[]
        // tag::user-info[]
        // NOTE: In a real application, use the user id of the logged in user
        // instead
        String userId = System.identityHashCode(UI.getCurrent()) + "";
        UserInfo localUser = new UserInfo(userId, "User " + userId);
        // end::user-info[]
        // tag::avatar-group[]
        CollaborationAvatarGroup avatarGroup = new CollaborationAvatarGroup(
                localUser, "tutorial");
        addComponentAsFirst(avatarGroup);
        // end::avatar-group[]
        // tag::binder[]
        CollaborationBinder<Person> binder = new CollaborationBinder<>(
                Person.class, localUser);
        binder.forField(nameField).bind("name");
        binder.forField(dateOfBirthField).bind("dateOfBirth");
        binder.setTopic("tutorial", () -> new Person());
        // end::binder[]
    }
}
// end::tutorial[]
