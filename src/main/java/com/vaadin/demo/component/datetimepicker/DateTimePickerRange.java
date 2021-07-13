package com.vaadin.demo.component.datetimepicker;

import com.vaadin.flow.component.datetimepicker.DateTimePicker;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.router.Route;

import java.time.LocalDateTime;

import com.vaadin.demo.DemoExporter; // hidden-source-line

@Route("date-time-picker-range")
public class DateTimePickerRange extends Div {

    public DateTimePickerRange() {
        // tag::snippet[]
        DateTimePicker startDateTimePicker = new DateTimePicker("Start date and time");
        startDateTimePicker.setValue(LocalDateTime.of(2020, 8, 25, 20, 0, 0));

        DateTimePicker endDateTimePicker = new DateTimePicker("End date and time");
        endDateTimePicker.setValue(LocalDateTime.of(2020, 9, 1, 20, 0, 0));

        startDateTimePicker.addValueChangeListener(e -> endDateTimePicker.setMin(e.getValue()));

        add(startDateTimePicker, endDateTimePicker);
        // end::snippet[]
    }

    public static class Exporter extends DemoExporter<DateTimePickerRange> { // hidden-source-line
    } // hidden-source-line
}
