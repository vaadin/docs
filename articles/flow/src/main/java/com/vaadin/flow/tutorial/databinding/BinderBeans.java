/*
 * Copyright 2000-2017 Vaadin Ltd.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not
 * use this file except in compliance with the License. You may obtain a copy of
 * the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations under
 * the License.
 */
package com.vaadin.flow.tutorial.databinding;

import com.vaadin.flow.component.combobox.ComboBox;
import com.vaadin.flow.component.html.Label;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.component.textfield.TextField;
import com.vaadin.flow.data.binder.*;
import com.vaadin.flow.data.converter.StringToIntegerConverter;
import com.vaadin.flow.tutorial.annotations.CodeFor;
import org.jsoup.Jsoup;
import org.jsoup.safety.Whitelist;

import javax.validation.constraints.Max;
import javax.validation.constraints.NotEmpty;
import java.util.List;
import java.util.stream.Collectors;

@CodeFor("binding-data/tutorial-flow-components-binder-beans.asciidoc")
public class BinderBeans {

    private TextField streetAddressField;
    private TextField nameField;
    private TextField yearOfBirthField;

    public class Person {
        @Max(2000)
        private int yearOfBirth;

        // Non-standard constraint provided by Hibernate Validator
        @NotEmpty
        private String name;

        // + other fields, constructors, setters, and getters
    }

    public void bindSubProprties() {
        Binder<Person> binder = new Binder<>(Person.class);

        // Bind based on property name
        binder.bind(nameField, "name");
        // Bind based on sub property path
        binder.bind(streetAddressField, "address.street");
        // Bind using forField for additional configuration
        binder.forField(yearOfBirthField)
                .withConverter(
                        new StringToIntegerConverter("Please enter a number"))
                .bind("yearOfBirth");
    }

    public void beanBinder() {
        // @formatter:off
        BeanValidationBinder<Person> binder = new BeanValidationBinder<>(Person.class);

        binder.bind(nameField, "name");
        binder.forField(yearOfBirthField)
        .withConverter(
                new StringToIntegerConverter("Please enter a number"))
        .bind("yearOfBirth");
        // @formatter:on
    }

    public void statusLabel() {
        Label formStatusLabel = new Label();

        Binder<Person> binder = new Binder<>(Person.class);

        binder.setStatusLabel(formStatusLabel);

        // Continue by binding fields
    }

    public void statusHandler() {
        Label formStatusLabel = new Label();
        Binder<Person> binder = new Binder<>(Person.class);
        // @formatter:off
        BinderValidationStatusHandler<Person> defaultHandler = binder
                .getValidationStatusHandler();

        binder.setValidationStatusHandler(status -> {
            // create an error message on failed bean level validations
            List<ValidationResult> errors = status
                    .getBeanValidationErrors();

            // collect all bean level error messages into a single string,
            // separating each message with a <br> tag
            String errorMessage = errors.stream()
                    .map(ValidationResult::getErrorMessage)
                    // sanitize the individual error strings to avoid code
                    // injection
                    // since we are displaying the resulting string as HTML
                    .map(errorString -> Jsoup.clean(errorString,
                            Whitelist.simpleText()))
                    .collect(Collectors.joining("<br>"));

            // finally, display all bean level validation errors in a single
            // label
            formStatusLabel.getElement().setProperty("innerHTML", errorMessage);
            setVisible(formStatusLabel, !errorMessage.isEmpty());

            // Let the default handler show messages for each field
            defaultHandler.statusChange(status);
        });
        // @formatter:on
    }

    private void setVisible(Label label, boolean visible) {

    }

    enum Gender {
        MALE("male"), FEMALE("female");

        private String value;

        Gender(String value) {
            this.value = value;
        }

        public String getValue() {
            return value;
        }

        @Override
        public String toString() {
            return value;
        }
    }

    public static class A {

        public class MyForm extends VerticalLayout {
            private TextField firstName = new TextField("First name");
            private TextField lastName = new TextField("Last name");
            private ComboBox<Gender> gender = new ComboBox<>("Gender");

            public MyForm() {
                Binder<Person> binder = new Binder<>(Person.class);
                binder.bindInstanceFields(this);

                binder.forField(firstName)
                        .bind(Person::getFirstName, Person::setFirstName);
                binder.forField(lastName)
                        .bind(Person::getLastName, Person::setLastName);
                binder.forField(gender)
                        .bind(Person::getGender, Person::setGender);


                TextField yearOfBirthField = new TextField("Year of birth");

                binder.forField(yearOfBirthField)
                        .withConverter(
                                new StringToIntegerConverter("Must enter a number"))
                        .bind(Person::getYearOfBirth, Person::setYearOfBirth);

                binder.bindInstanceFields(this);
            }
        }

        public class Person {
            private String firstName;
            private String lastName;
            private Gender gender;
            private int yearOfBirth;

            public String getFirstName() {
                return firstName;
            }

            public void setFirstName(String firstName) {
                this.firstName = firstName;
            }

            public String getLastName() {
                return lastName;
            }

            public void setLastName(String lastName) {
                this.lastName = lastName;
            }

            public Gender getGender() {
                return gender;
            }

            public void setGender(Gender gender) {
                this.gender = gender;
            }

            public int getYearOfBirth() {
                return yearOfBirth;
            }

            public void setYearOfBirth(int yearOfBirth) {
                this.yearOfBirth = yearOfBirth;
            }
        }
    }

    public class B {
        public class MyForm extends VerticalLayout {
            @PropertyId("sex")
            private ComboBox<Gender> gender = new ComboBox<>("Gender");
        }

    }
}

