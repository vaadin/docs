package com.vaadin.demo.component.datetimepicker;

import com.vaadin.flow.component.datetimepicker.DateTimePicker;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.router.Route;
import com.vaadin.demo.DemoExporter; // hidden-source-line

import java.time.LocalTime;

@Route("date-time-picker-default-time")
public class DateTimePickerDefaultTime extends Div {

    public DateTimePickerDefaultTime() {
        // tag::snippet[]
        DateTimePicker dateTimePicker = new DateTimePicker("Appointment");
        dateTimePicker.setDefaultTime(LocalTime.of(9, 0));
        // end::snippet[]
        add(dateTimePicker);
    }

    public static class Exporter extends // hidden-source-line
            DemoExporter<DateTimePickerDefaultTime> { // hidden-source-line
    } // hidden-source-line
}
