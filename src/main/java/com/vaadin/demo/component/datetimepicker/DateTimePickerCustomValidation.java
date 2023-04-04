package com.vaadin.demo.component.datetimepicker;

import com.vaadin.flow.component.datetimepicker.DateTimePicker;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.data.binder.Binder;
import com.vaadin.flow.router.Route;

import java.time.Duration;
import java.time.LocalTime;

import com.vaadin.demo.DemoExporter; // hidden-source-line
import com.vaadin.demo.domain.Appointment;

@Route("date-time-picker-custom-validation")
public class DateTimePickerCustomValidation extends Div {

    public DateTimePickerCustomValidation() {
        // tag::snippet[]
        DateTimePicker dateTimePicker = new DateTimePicker();
        dateTimePicker.setLabel("Appointment date and time");
        dateTimePicker
                .setHelperText("Open Mondays-Fridays, 8:00-12:00, 13:00-16:00");
        dateTimePicker.setStep(Duration.ofMinutes(30));
        add(dateTimePicker);

        String errorMessage = "The selected day of week or time is not available";
        Binder<Appointment> binder = new Binder<>(Appointment.class);
        binder.forField(dateTimePicker).withValidator(startDateTime -> {
            boolean validWeekDay = startDateTime.getDayOfWeek().getValue() >= 1
                    && startDateTime.getDayOfWeek().getValue() <= 5;
            return validWeekDay;
        }, errorMessage).withValidator(startDateTime -> {
            LocalTime startTime = LocalTime.of(startDateTime.getHour(),
                    startDateTime.getMinute());
            boolean validTime = !(LocalTime.of(8, 0).isAfter(startTime)
                    || (LocalTime.of(12, 0).isBefore(startTime)
                            && LocalTime.of(13, 0).isAfter(startTime))
                    || LocalTime.of(16, 0).isBefore(startTime));
            return validTime;
        }, errorMessage).bind(Appointment::getStartDateTime,
                Appointment::setStartDateTime);
        // end::snippet[]
    }

    public static class Exporter extends // hidden-source-line
            DemoExporter<DateTimePickerCustomValidation> { // hidden-source-line
    } // hidden-source-line
}
