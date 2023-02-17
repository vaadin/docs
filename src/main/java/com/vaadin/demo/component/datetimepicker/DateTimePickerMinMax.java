package com.vaadin.demo.component.datetimepicker;

import com.vaadin.flow.component.datetimepicker.DateTimePicker;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.router.Route;

import java.time.LocalDateTime;

import com.vaadin.demo.DemoExporter; // hidden-source-line

@Route("date-time-picker-min-max")
public class DateTimePickerMinMax extends Div {

    public DateTimePickerMinMax() {
        // tag::snippet[]
        DateTimePicker dateTimePicker = new DateTimePicker();
        dateTimePicker.setLabel("Appointment date and time");
        dateTimePicker.setHelperText("Must be within 60 days from today");
        dateTimePicker.setAutoOpen(true);
        dateTimePicker.setMin(LocalDateTime.now());
        dateTimePicker.setMax(LocalDateTime.now().plusDays(60));
        dateTimePicker.setValue(LocalDateTime.now().plusDays(7));
        dateTimePicker.addValueChangeListener(event -> {
            LocalDateTime value = event.getValue();
            String errorMessage = null;
            if (value != null) {
                if (value.compareTo(dateTimePicker.getMin()) < 0) {
                    errorMessage = "Too early, choose another date and time";
                } else if (value.compareTo(dateTimePicker.getMax()) > 0) {
                    errorMessage = "Too late, choose another date and time";
                }
            }
            dateTimePicker.setErrorMessage(errorMessage);
        });
        add(dateTimePicker);
        // end::snippet[]
    }

    public static class Exporter extends DemoExporter<DateTimePickerMinMax> { // hidden-source-line
    } // hidden-source-line
}
