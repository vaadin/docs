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
        DateTimePicker startDateTimePicker = new DateTimePicker();
        DateTimePicker endDateTimePicker = new DateTimePicker();

        startDateTimePicker.setLabel("Start date and time");
        startDateTimePicker.addValueChangeListener(e -> endDateTimePicker.setMin(e.getValue()));
        startDateTimePicker.setValue(LocalDateTime.of(2020, 8, 25, 20, 0, 0));

        endDateTimePicker.setLabel("Start date and time");
        endDateTimePicker.setValue(LocalDateTime.of(2020, 9, 1, 20, 0, 0));

        add(startDateTimePicker, endDateTimePicker);
        // end::snippet[]
    }

    public static class Exporter extends DemoExporter<DateTimePickerRange> { // hidden-source-line
    } // hidden-source-line
}
