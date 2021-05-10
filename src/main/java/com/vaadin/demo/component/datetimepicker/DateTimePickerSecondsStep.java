package com.vaadin.demo.component.datetimepicker;

import com.vaadin.flow.component.datetimepicker.DateTimePicker;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.router.Route;

import java.time.Duration;
import java.time.LocalDateTime;

import com.vaadin.demo.DemoExporter; // hidden-source-line

@Route("date-time-picker-seconds-step")
public class DateTimePickerSecondsStep extends Div {

    public DateTimePickerSecondsStep() {
        // tag::snippet[]
        DateTimePicker dateTimePicker = new DateTimePicker();
        dateTimePicker.setLabel("Message received");
        dateTimePicker.setStep(Duration.ofSeconds(1));
        dateTimePicker.setValue(LocalDateTime.of(2020, 6, 12, 15, 45, 8));
        add(dateTimePicker);
        // end::snippet[]
    }

    public static class Exporter extends DemoExporter<DateTimePickerSecondsStep> { // hidden-source-line
    } // hidden-source-line
}
