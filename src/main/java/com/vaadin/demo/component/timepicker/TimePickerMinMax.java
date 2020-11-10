package com.vaadin.demo.component.timepicker;

import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.timepicker.TimePicker;
import com.vaadin.flow.router.Route;

import java.time.Duration;
import java.time.LocalTime;

import com.vaadin.demo.DemoExporter; // hidden-full-source-line

@Route("time-picker-min-max")
public class TimePickerMinMax extends Div {

    public TimePickerMinMax() {
        // tag::snippet[]
        TimePicker timePicker = new TimePicker();
        timePicker.setLabel("Appointment time");
        timePicker.setStep(Duration.ofMinutes(30));
        timePicker.setValue(LocalTime.of(8, 30));
        timePicker.setMinTime(LocalTime.of(8, 0));
        timePicker.setMaxTime(LocalTime.of(16, 0));
        add(timePicker);
        // end::snippet[]
    }

    public static class Exporter extends DemoExporter<TimePickerMinMax> { // hidden-full-source-line
    } // hidden-full-source-line
}
