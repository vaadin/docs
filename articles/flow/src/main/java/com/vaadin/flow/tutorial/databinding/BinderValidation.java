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

import com.vaadin.flow.component.checkbox.Checkbox;
import com.vaadin.flow.component.datepicker.DatePicker;
import com.vaadin.flow.component.html.Label;
import com.vaadin.flow.component.textfield.TextField;
import com.vaadin.flow.data.binder.Binder;
import com.vaadin.flow.data.binder.Result;
import com.vaadin.flow.data.binder.ValueContext;
import com.vaadin.flow.data.converter.Converter;
import com.vaadin.flow.data.converter.StringToIntegerConverter;
import com.vaadin.flow.data.validator.EmailValidator;
import com.vaadin.flow.tutorial.annotations.CodeFor;

import java.time.LocalDate;

@CodeFor("binding-data/tutorial-flow-components-binder-validation.asciidoc")
public class BinderValidation {

    private TextField emailField;
    private TextField nameField;
    private TextField titleField;
    private TextField yearOfBirthField;
    private Binder<Person> binder = new Binder<>();

    // @formatter:off
    class MyConverter
            implements Converter<String, Integer> {
        @Override
        public Result<Integer> convertToModel(
                String fieldValue, ValueContext context) {
            // Produces a converted value or an error
            try {
                // ok is a static helper method that
                // creates a Result
                return Result.ok(Integer.valueOf(
                        fieldValue));
            } catch (NumberFormatException e) {
                // error is a static helper method
                // that creates a Result
                return Result.error("Enter a number");
            }
        }

        @Override
        public String convertToPresentation(
                Integer integer, ValueContext context) {
            // Converting to the field type should
            // always succeed, so there is no support for
            // returning an error Result.
            return String.valueOf(integer);
        }
    }
    // @formatter:on

    public void bindFields() {
        // @formatter:off
        binder.forField(emailField)
                // Explicit validator instance
                .withValidator(new EmailValidator(
                        "This doesn't look like a valid email address"))
                .bind(Person::getEmail, Person::setEmail);

        binder.forField(nameField)
                // Validator defined based on a lambda
                // and an error message
                .withValidator(
                        name -> name.length() >= 3,
                        "Name must contain at least three characters")
                .bind(Person::getName, Person::setName);

        binder.forField(titleField)
                // Shorthand for requiring the field to be non-empty
                .asRequired("Every employee must have a title")
                .bind(Person::getTitle, Person::setTitle);
        // @formatter:on
    }

    public void statusLabel() {
        // @formatter:off
        Label emailStatus = new Label();
        emailStatus.getStyle().set("color", "Red");
        binder.forField(emailField)
                .withValidator(new EmailValidator(
                        "This doesn't look like a valid email address"))
                // Shorthand that updates the label based on the
                // status
                .withStatusLabel(emailStatus)
                .bind(Person::getEmail, Person::setEmail);

        Label nameStatus = new Label();

        binder.forField(nameField)
                // Define the validator
                .withValidator(
                        name -> name.length() >= 3,
                        "Name must contain at least three characters")
                // Define how the validation status is displayed
                .withValidationStatusHandler(status -> {
                    nameStatus.setText(status
                            .getMessage().orElse(""));
                    nameStatus.setVisible(status.isError());
                })
                // Finalize the binding
                .bind(Person::getName, Person::setName);
        // @formatter:on
    }

    public void validateEmail() {
        // @formatter:off
        binder.forField(emailField)
                .withValidator(new EmailValidator(
                        "This doesn't look like a valid email address"))
                .withValidator(
                        email -> email.endsWith("@acme.com"),
                        "Only acme.com email addresses are allowed")
                .bind(Person::getEmail, Person::setEmail);
        // @formatter:on
    }

    public void crossFieldValidation() {
        Binder<Trip> binder = new Binder<>(Trip.class);
        DatePicker departing = new DatePicker();
        departing.setLabel("Departing");
        DatePicker returning = new DatePicker();
        returning.setLabel("Returning");

// Store return date binding so we can
// revalidate it later
        Binder.Binding<Trip, LocalDate> returningBinding =
                binder
                .forField(returning).withValidator(
                        returnDate -> !returnDate
                                .isBefore(departing.getValue()),
                        "Cannot return before departing")
                .bind(Trip::getReturnDate, Trip::setReturnDate);

// Revalidate return date when departure date changes
        departing.addValueChangeListener(
                event -> returningBinding.validate());
    }

    public void conversion() {
        TextField yearOfBirthField =
                new TextField("Year of birth");

        binder.forField(yearOfBirthField)
                .withConverter(
                        new StringToIntegerConverter("Not a number"))
                .bind(Person::getYearOfBirth,
                        Person::setYearOfBirth);

// Checkbox for marital status
        Checkbox marriedField = new Checkbox("Married");


        binder.forField(marriedField).withConverter(
                        m -> m ? MaritalStatus.MARRIED : MaritalStatus.SINGLE,
                        MaritalStatus.MARRIED::equals)
                .bind(Person::getMaritalStatus,
                        Person::setMaritalStatus);
    }

    public void multipleConverters() {
        binder.forField(yearOfBirthField)
                // Validator will be run with the String value
                // of the field
                .withValidator(text -> text.length() == 4,
                        "Doesn't look like a year")
                // Converter will only be run for strings
                // with 4 characters
                .withConverter(new StringToIntegerConverter(
                        "Must enter a number"))
                // Validator will be run with the converted value
                .withValidator(year -> year >= 1900 && year < 2000,
                        "Person must be born in the 20th century")
                .bind(Person::getYearOfBirth,
                        Person::setYearOfBirth);
    }

    public void multipleConverter() {
        binder.forField(yearOfBirthField)
                .withConverter(
                        Integer::valueOf,
                        String::valueOf,
                        // Text to use instead of the
                        // NumberFormatException message
                        "Please enter a number")
                .bind(Person::getYearOfBirth,
                        Person::setYearOfBirth);
    }

    public void callBackConverters() {
        // @formatter:off
        class MyConverter implements Converter<String, Integer> {
            @Override
            public Result<Integer> convertToModel(String fieldValue, ValueContext context) {
                // Produces a converted value or an error
                try {
                    // ok is a static helper method that creates a Result
                    return Result.ok(Integer.valueOf(fieldValue));
                } catch (NumberFormatException e) {
                    // error is a static helper method that creates a Result
                    return Result.error("Please enter a number");
                }
            }

            @Override
            public String convertToPresentation(Integer integer, ValueContext context) {
                // Converting to the field type should always succeed,
                // so there is no support for returning an error Result.
                return String.valueOf(integer);
            }
        }

// Using the converter
        binder.forField(yearOfBirthField)
                .withConverter(new MyConverter())
                .bind(Person::getYearOfBirth, Person::setYearOfBirth);

        // @formatter:on
    }

    public void useMyConverter() {
        // Using the converter
        // @formatter:off
        binder.forField(yearOfBirthField)
                .withConverter(new MyConverter())
                .bind(Person::getYearOfBirth, Person::setYearOfBirth);
        // @formatter:on
    }

    private void setVisible(Label label, boolean visible) {

    }
}
