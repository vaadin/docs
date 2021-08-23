package com.vaadin.demo.component.datepicker;

import com.vaadin.demo.DemoExporter; // hidden-source-line
import com.vaadin.flow.component.datepicker.DatePicker;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.router.Route;

import java.time.LocalDate;
import java.time.ZoneId;
import java.util.Locale;

@Route("date-picker-locale")
public class DatePickerLocale extends Div {
    public DatePickerLocale() {
        // tag::snippet[]
        Locale finnishLocale = new Locale("fi", "FI");

        DatePicker datePicker = new DatePicker("Select a date:");
        datePicker.setLocale(finnishLocale);
        // end::snippet[]
        datePicker.setValue(LocalDate.now(ZoneId.systemDefault()));
        datePicker.setHelperText("Date picker configured to use Finnish date format");

        add(datePicker);
    }

    public static class Exporter extends DemoExporter<DatePickerLocale> { // hidden-source-line
    } // hidden-source-line
}
