package com.vaadin.demo.component.datepicker;

import com.vaadin.demo.DemoExporter; // hidden-source-line
import com.vaadin.flow.component.datepicker.DateMetadata;
import com.vaadin.flow.component.datepicker.DateMetadataProvider;
import com.vaadin.flow.component.datepicker.DatePicker;
import com.vaadin.flow.component.datepicker.DatePicker.DatePickerI18n;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.router.Route;

import java.time.LocalDate;

@Route("date-picker-date-metadata")
public class DatePickerDateMetadata extends Div {

    public DatePickerDateMetadata() {
        DatePicker datePicker = new DatePicker("Appointment date");
        // tag::snippet[]
        datePicker.setHelperText("Highlighted dates are almost full");

        DateMetadataProvider provider = DateMetadataProvider.perDate(date -> {
            if (isFullyBooked(date)) {
                return new DateMetadata(date, true);
            }
            if (isAlmostFull(date)) {
                return new DateMetadata(date, "limited");
            }
            return null;
        });
        datePicker.setDateMetadataProvider(provider);

        datePicker.setI18n(new DatePickerI18n()
                .setDisabledDateErrorMessage("That date is fully booked"));
        // end::snippet[]

        add(datePicker);
    }

    // tag::snippet[]

    // In a real application, these would query a booking service.
    private static boolean isFullyBooked(LocalDate date) {
        return date.getDayOfMonth() % 7 == 3;
    }

    private static boolean isAlmostFull(LocalDate date) {
        return date.getDayOfMonth() % 5 == 0;
    }
    // end::snippet[]

    public static class Exporter extends DemoExporter<DatePickerDateMetadata> { // hidden-source-line
    } // hidden-source-line
}
