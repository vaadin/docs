package com.vaadin.demo.component.timepicker;

import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.timepicker.TimePicker;
import com.vaadin.flow.router.Route;

import java.time.Duration;
import java.time.LocalTime;

import com.vaadin.demo.DemoExporter; // hidden-source-line

@Route("time-picker-auto-open")
public class TimePickerAutoOpen extends Div {

    public TimePickerAutoOpen() {
        // tag::snippet[]
        TimePicker timePicker = new TimePicker();
        timePicker.setLabel("Alarm");
        timePicker.setStep(Duration.ofMinutes(30));
        timePicker.setValue(LocalTime.of(5, 30));
        timePicker.setAutoOpen(false);
        add(timePicker);
        // end::snippet[]
    }

    public static class Exporter extends DemoExporter<TimePickerAutoOpen> { // hidden-source-line
    } // hidden-source-line
}
