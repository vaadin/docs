package com.vaadin.demo.component.datetimepicker;

import com.vaadin.flow.component.datetimepicker.DateTimePicker;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.router.Route;
import com.vaadin.demo.DemoExporter; // hidden-source-line

@Route("date-time-picker-auto-open")
public class DateTimePickerAutoOpen extends Div {

    public DateTimePickerAutoOpen() {
        DateTimePicker dateTimePicker = new DateTimePicker("Meeting date and time");
        // tag::snippet[]
        dateTimePicker.setAutoOpen(false);
        // end::snippet[]
        add(dateTimePicker);
    }
    public static class Exporter extends DemoExporter<DateTimePickerAutoOpen> { // hidden-source-line
    } // hidden-source-line
}
