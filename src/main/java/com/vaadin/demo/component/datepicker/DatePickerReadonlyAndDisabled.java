package com.vaadin.demo.component.datepicker;

import com.vaadin.flow.component.orderedlayout.HorizontalLayout;
import com.vaadin.flow.component.datepicker.DatePicker;
import com.vaadin.flow.router.Route;

import java.time.LocalDate;
import java.time.ZoneId;

import com.vaadin.demo.DemoExporter; // hidden-source-line

@Route("date-picker-readonly-and-disabled")
public class DatePickerReadonlyAndDisabled extends HorizontalLayout {

    public DatePickerReadonlyAndDisabled() {
        setPadding(false);

        // tag::snippet[]
        DatePicker readonlyField = new DatePicker();
        readonlyField.setReadOnly(true);
        readonlyField.setLabel("Read-only");
        readonlyField.setValue(LocalDate.now(ZoneId.systemDefault()));

        DatePicker disabledField = new DatePicker();
        disabledField.setEnabled(false);
        disabledField.setLabel("Disabled");
        // end::snippet[]
        add(readonlyField, disabledField);
    }

    public static class Exporter extends DemoExporter<DatePickerReadonlyAndDisabled> { // hidden-source-line
    } // hidden-source-line
}
