package com.vaadin.demo.component.timepicker;

import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.timepicker.TimePicker;
import com.vaadin.flow.router.Route;

import java.time.Duration;
import java.time.LocalTime;

import com.vaadin.demo.DemoExporter; // hidden-source-line

@Route("time-picker-seconds-step")
public class TimePickerSecondsStep extends Div {

    public TimePickerSecondsStep() {
        // tag::snippet[]
        TimePicker timePicker = new TimePicker();
        timePicker.setLabel("Message received");
        timePicker.setStep(Duration.ofSeconds(1));
        timePicker.setValue(LocalTime.of(15, 45, 8));
        add(timePicker);
        // end::snippet[]
    }

    public static class Exporter extends DemoExporter<TimePickerSecondsStep> { // hidden-source-line
    } // hidden-source-line
}
