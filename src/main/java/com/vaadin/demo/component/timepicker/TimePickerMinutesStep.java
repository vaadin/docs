package com.vaadin.demo.component.timepicker;

import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.timepicker.TimePicker;
import com.vaadin.flow.router.Route;

import java.time.Duration;
import java.time.LocalTime;

import com.vaadin.demo.DemoExporter; // hidden-source-line

@Route("time-picker-minutes-step")
public class TimePickerMinutesStep extends Div {

    public TimePickerMinutesStep() {
        // tag::snippet[]
        TimePicker timePicker = new TimePicker();
        timePicker.setLabel("Meeting time");
        timePicker.setStep(Duration.ofMinutes(30));
        timePicker.setValue(LocalTime.of(12,30));
        add(timePicker);
        // end::snippet[]
    }

    public static class Exporter extends DemoExporter<TimePickerMinutesStep> { // hidden-source-line
    } // hidden-source-line
}
