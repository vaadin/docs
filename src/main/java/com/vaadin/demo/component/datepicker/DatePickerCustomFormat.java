package com.vaadin.demo.component.datepicker;

import com.vaadin.demo.DemoExporter; // hidden-source-line
import com.vaadin.flow.component.datepicker.DatePicker;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.router.Route;

import java.time.LocalDate;
import java.time.ZoneId;

@Route("date-picker-custom-format")
public class DatePickerCustomFormat extends Div {
    public DatePickerCustomFormat() {
        // tag::snippet[]
        // Setup date picker with a primary format and additional parsing
        // formats
        // Date is always displayed using the primary format `yyyy-MM-dd`.
        // When parsing user input, the date picker first attempts to match the
        // input with the primary format `yyyy-MM-dd`, then `MM/dd/yyyy`, and
        // finally `dd.MM.yyyy`.
        // You can also use DatePickerI18n#setDateFormat() if you need to
        // support only a single format.
        DatePicker.DatePickerI18n datePickerI18n = new DatePicker.DatePickerI18n();
        datePickerI18n.setDateFormats("yyyy-MM-dd", "MM/dd/yyyy", "dd.MM.yyyy");

        DatePicker datePicker = new DatePicker("Select a date:");
        datePicker.setI18n(datePickerI18n);
        // end::snippet[]
        datePicker.setValue(LocalDate.now(ZoneId.systemDefault()));
        add(datePicker);
    }

    public static class Exporter extends DemoExporter<DatePickerCustomFormat> { // hidden-source-line
    } // hidden-source-line
}
