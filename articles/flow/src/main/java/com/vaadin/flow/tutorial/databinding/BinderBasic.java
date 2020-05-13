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

import com.vaadin.flow.component.button.Button;
import com.vaadin.flow.component.html.Label;
import com.vaadin.flow.component.textfield.TextField;
import com.vaadin.flow.data.binder.Binder;
import com.vaadin.flow.data.binder.ReadOnlyHasValue;
import com.vaadin.flow.data.binder.ValidationException;
import com.vaadin.flow.tutorial.annotations.CodeFor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@CodeFor("binding-data/tutorial-flow-components-binder.asciidoc")
public class BinderBasic {
    private static Logger logger = LoggerFactory.getLogger(BinderBasic.class);

    private TextField titleField;
    private TextField nameField;

    private Binder<Person> binder = new Binder<>();

    public void bindField() {
        Binder<Person> binder = new Binder<>(Person.class);

        TextField titleField = new TextField();

// Start by defining the Field instance to use
        binder.forField(titleField)
                // Finalize by doing the actual binding
                // to the Person class
                .bind(
                        // Callback that loads the title
                        // from a person instance
                        Person::getTitle,
                        // Callback that saves the title
                        // in a person instance
                        Person::setTitle);
        TextField nameField = new TextField();

// Shorthand for cases without extra configuration
        binder.bind(nameField, Person::getName,
                Person::setName);
    }

    public void readWriteBean() {
// The person to edit
// Would be loaded from the backend
// in a real application
        Person person = new Person("John Doe", 1957);

// Updates the value in each bound field component
        binder.readBean(person);

        Button saveButton = new Button("Save",
                event -> {
                    try {
                        binder.writeBean(person);
                        // A real application would also save
                        // the updated person
                        // using the application's backend
                    } catch (ValidationException e) {
                        notifyValidationException(e);
                    }
                });

// Updates the fields again with the
// previously saved values
        Button resetButton = new Button("Reset",
                event -> binder.readBean(person));
    }

    public void lambdaCllbacks() {
        // @formatter:off
        // With lambda expressions
        binder.bind(titleField,
                person -> person.getTitle(),
                (person, title) -> {
                    person.setTitle(title);
                    logger.info("setTitle: {}", title);
                });
        //@formatter:on
    }

    public void readOnlyData() {
        TextField fullName = new TextField();
        binder.forField(fullName)
                .bind(Person::getFullName, null);
    }

    public void nonModifiableData() {

        Label fullNameLabel = new Label();
        ReadOnlyHasValue<String> fullName =
                new ReadOnlyHasValue<>(
                text -> fullNameLabel.setText(text));
        binder.forField(fullName)
                .bind(Person::getFullName, null);
    }

    private void notifyValidationException(ValidationException exception) {
        System.out.println("Person could not be saved, "
                + "please check error messages for each field.");
    }

}
