package com.vaadin.demo.component.timepicker;

import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.timepicker.TimePicker;
import com.vaadin.flow.router.Route;

import java.time.Duration;
import java.time.LocalTime;

import com.vaadin.demo.DemoExporter; // hidden-source-line

@Route("time-picker-validation")
public class TimePickerValidation extends Div {

    public TimePickerValidation() {
        // tag::snippet[]
        TimePicker timePicker = new TimePicker();
        timePicker.setLabel("Appointment time");
        timePicker.setHelperText("Open 8:00-16:00");
        timePicker.setStep(Duration.ofMinutes(30));
        timePicker.setValue(LocalTime.of(8, 30));
        timePicker.setMin(LocalTime.of(8, 0));
        timePicker.setMax(LocalTime.of(16, 0));
        timePicker.addValueChangeListener(event -> {
            LocalTime value = event.getValue();
            String errorMessage = null;
            if (value != null) {
                if (value.compareTo(timePicker.getMin()) < 0) {
                    errorMessage = "Too early, choose another time";
                } else if (value.compareTo(timePicker.getMax()) > 0) {
                    errorMessage = "Too late, choose another time";
                }
            }
            timePicker.setErrorMessage(errorMessage);
        });
        add(timePicker);
        // end::snippet[]
    }

    public static class Exporter extends DemoExporter<TimePickerValidation> { // hidden-source-line
    } // hidden-source-line
}
