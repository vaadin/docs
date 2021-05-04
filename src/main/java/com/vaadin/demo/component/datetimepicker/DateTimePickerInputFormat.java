package com.vaadin.demo.component.datetimepicker;

import com.vaadin.flow.component.datetimepicker.DateTimePicker;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.router.Route;

import com.vaadin.demo.DemoExporter; // hidden-source-line

@Route("date-time-picker-input-format")
public class DateTimePickerInputFormat extends Div {

    public DateTimePickerInputFormat() {
        // tag::snippet[]
        DateTimePicker dateTimePicker = new DateTimePicker();
        dateTimePicker.setLabel("Select date and time");
        dateTimePicker.setHelperText("Format: DD/MM/YYYY and HH:MM");
        dateTimePicker.setDatePlaceholder("DD/MM/YYYY");
        dateTimePicker.setTimePlaceholder("HH:MM");
        add(dateTimePicker);
        // end::snippet[]
    }

    public static class Exporter extends DemoExporter<DateTimePickerInputFormat> { // hidden-source-line
    } // hidden-source-line
}
