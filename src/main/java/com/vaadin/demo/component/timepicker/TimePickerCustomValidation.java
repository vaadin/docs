package com.vaadin.demo.component.timepicker;

import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.timepicker.TimePicker;
import com.vaadin.flow.data.binder.Binder;
import com.vaadin.flow.router.Route;

import java.time.Duration;
import java.time.LocalTime;

import com.vaadin.demo.DemoExporter; // hidden-source-line
import com.vaadin.demo.domain.Appointment;

@Route("time-picker-custom-validation")
public class TimePickerCustomValidation extends Div {

    public TimePickerCustomValidation() {
        // tag::snippet[]
        TimePicker timePicker = new TimePicker();
        timePicker.setLabel("Appointment time");
        timePicker.setHelperText("Open 8:00-12:00, 13:00-16:00");
        timePicker.setStep(Duration.ofMinutes(30));
        timePicker.setMinTime(LocalTime.of(8, 0));
        timePicker.setMaxTime(LocalTime.of(16, 0));
        add(timePicker);

        Binder<Appointment> binder = new Binder<>(Appointment.class);
        binder.forField(timePicker).withValidator(startTime -> {
            return !(LocalTime.of(8, 0).isAfter(startTime)
                    || (LocalTime.of(12, 0).isBefore(startTime) && LocalTime.of(13, 0).isAfter(startTime))
                    || LocalTime.of(16, 0).isBefore(startTime));
        }, "The selected time is not available").bind(Appointment::getStartTime, Appointment::setStartTime);
        // end::snippet[]
    }

    public static class Exporter extends DemoExporter<TimePickerCustomValidation> { // hidden-source-line
    } // hidden-source-line
}
