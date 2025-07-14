package com.vaadin.demo.component.datetimepicker;

import com.vaadin.flow.component.datetimepicker.DateTimePicker;
import com.vaadin.flow.component.datetimepicker.DateTimePicker.DateTimePickerI18n;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.router.Route;

import java.time.LocalDateTime;

import com.vaadin.demo.DemoExporter; // hidden-source-line

@Route("date-time-picker-validation")
public class DateTimePickerValidation extends Div {

    public DateTimePickerValidation() {
        // tag::snippet[]
        DateTimePicker dateTimePicker = new DateTimePicker();
        dateTimePicker.setRequiredIndicatorVisible(true);
        dateTimePicker.setLabel("Appointment date and time");
        dateTimePicker.setHelperText("Must be within 60 days from today");
        dateTimePicker.setMin(LocalDateTime.now());
        dateTimePicker.setMax(LocalDateTime.now().plusDays(60));

        dateTimePicker.setI18n(new DateTimePickerI18n()
                .setRequiredErrorMessage("Field is required")
                .setBadInputErrorMessage("Invalid date or time format")
                .setIncompleteInputErrorMessage("Missing date or time")
                .setMinErrorMessage("Too early, choose another date and time")
                .setMaxErrorMessage("Too late, choose another date and time"));

        add(dateTimePicker);
        // end::snippet[]
    }

    public static class Exporter
            extends DemoExporter<DateTimePickerValidation> { // hidden-source-line
    } // hidden-source-line
}
