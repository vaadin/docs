package com.vaadin.demo.component.datetimepicker;

import com.vaadin.flow.component.datetimepicker.DateTimePicker;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.router.Route;

import com.vaadin.demo.DemoExporter; // hidden-source-line

@Route("date-time-picker-auto-open")
public class DateTimePickerAutoOpen extends Div {

    public DateTimePickerAutoOpen() {
        // tag::snippet[]
        DateTimePicker dateTimePicker = new DateTimePicker();
        dateTimePicker.setLabel("Meeting date and time");
        dateTimePicker.setAutoOpen(false);
        add(dateTimePicker);
        // end::snippet[]
    }

    public static class Exporter extends DemoExporter<DateTimePickerAutoOpen> { // hidden-source-line
    } // hidden-source-line
}
