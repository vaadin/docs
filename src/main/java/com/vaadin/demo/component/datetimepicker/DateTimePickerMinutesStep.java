package com.vaadin.demo.component.datetimepicker;

import com.vaadin.demo.DemoExporter; // hidden-source-line
import com.vaadin.flow.component.datetimepicker.DateTimePicker;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.router.Route;

import java.time.Duration;
import java.time.LocalDateTime;

@Route("date-time-picker-minutes-step")
public class DateTimePickerMinutesStep extends Div {

    public DateTimePickerMinutesStep() {
        // tag::snippet[]
        DateTimePicker dateTimePicker = new DateTimePicker();
        dateTimePicker.setLabel("Meeting date and time");
        dateTimePicker.setStep(Duration.ofMinutes(30));
        dateTimePicker.setValue(LocalDateTime.of(2020, 6, 12, 12, 30, 0));
        add(dateTimePicker);
        // end::snippet[]
    }

    public static class Exporter extends DemoExporter<DateTimePickerMinutesStep> { // hidden-source-line
    } // hidden-source-line
}
