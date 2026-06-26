package com.vaadin.demo.component.datetimepicker;

import com.vaadin.flow.component.datetimepicker.DateTimePicker;
import com.vaadin.flow.component.formlayout.FormLayout;
import com.vaadin.flow.router.Route;

import java.time.LocalDateTime;

import com.vaadin.demo.DemoExporter; // hidden-source-line

@Route("date-time-picker-readonly-and-disabled")
public class DateTimePickerReadonlyAndDisabled extends FormLayout {

    public DateTimePickerReadonlyAndDisabled() {
        setAutoResponsive(true);
        setColumnWidth("20rem");

        // tag::snippet[]
        DateTimePicker readonlyField = new DateTimePicker();
        readonlyField.setReadOnly(true);
        readonlyField.setLabel("Read-only");
        readonlyField.setValue(LocalDateTime.of(2020, 6, 12, 12, 30));

        DateTimePicker disabledField = new DateTimePicker();
        disabledField.setEnabled(false);
        disabledField.setLabel("Disabled");
        // end::snippet[]

        add(readonlyField, disabledField);
    }

    public static class Exporter extends // hidden-source-line
            DemoExporter<DateTimePickerReadonlyAndDisabled> { // hidden-source-line
    } // hidden-source-line
}
