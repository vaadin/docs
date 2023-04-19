package com.vaadin.demo.component.timepicker;

import com.vaadin.flow.component.orderedlayout.HorizontalLayout;
import com.vaadin.flow.component.timepicker.TimePicker;
import com.vaadin.flow.router.Route;

import java.time.LocalTime;

import com.vaadin.demo.DemoExporter; // hidden-source-line

@Route("time-picker-readonly-and-disabled")
public class TimePickerReadonlyAndDisabled extends HorizontalLayout {

    public TimePickerReadonlyAndDisabled() {
        setPadding(false);

        // tag::snippet[]
        TimePicker readonlyField = new TimePicker();
        readonlyField.setReadOnly(true);
        readonlyField.setLabel("Read-only");
        readonlyField.setValue(LocalTime.of(7, 0));

        TimePicker disabledField = new TimePicker();
        disabledField.setEnabled(false);
        disabledField.setLabel("Disabled");
        // end::snippet[]
        add(readonlyField, disabledField);
    }

    public static class Exporter extends DemoExporter<TimePickerReadonlyAndDisabled> { // hidden-source-line
    } // hidden-source-line
}
