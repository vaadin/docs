package com.vaadin.demo.component.timepicker;

import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.timepicker.TimePicker;
import com.vaadin.flow.component.timepicker.TimePicker.TimePickerI18n;
import com.vaadin.flow.router.Route;

import java.time.Duration;
import java.time.LocalTime;

import com.vaadin.demo.DemoExporter; // hidden-source-line

@Route("time-picker-validation")
public class TimePickerValidation extends Div {

    public TimePickerValidation() {
        // tag::snippet[]
        TimePicker timePicker = new TimePicker();
        timePicker.setRequiredIndicatorVisible(true);
        timePicker.setLabel("Appointment time");
        timePicker.setHelperText("Open 8:00-16:00");
        timePicker.setStep(Duration.ofMinutes(30));
        timePicker.setValue(LocalTime.of(8, 30));
        timePicker.setMin(LocalTime.of(8, 0));
        timePicker.setMax(LocalTime.of(16, 0));

        timePicker.setI18n(new TimePickerI18n()
                .setBadInputErrorMessage("Invalid time format")
                .setRequiredErrorMessage("Field is required")
                .setMinErrorMessage("Too early, choose another time")
                .setMaxErrorMessage("Too late, choose another time"));

        add(timePicker);
        // end::snippet[]
    }

    public static class Exporter extends DemoExporter<TimePickerValidation> { // hidden-source-line
    } // hidden-source-line
}
