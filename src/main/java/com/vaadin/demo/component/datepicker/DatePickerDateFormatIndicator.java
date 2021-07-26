package com.vaadin.demo.component.datepicker;

import com.vaadin.demo.DemoExporter; // hidden-source-line
import com.vaadin.flow.component.datepicker.DatePicker;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.router.Route;

import java.util.Locale;

@Route("date-picker-date-format-indicator")
public class DatePickerDateFormatIndicator extends Div {

    public DatePickerDateFormatIndicator() {
        DatePicker datePicker = new DatePicker("Start date");
        datePicker.setLocale(new Locale("fi", "FI"));
        // tag::snippet[]
        datePicker.setPlaceholder("DD.MM.YYYY");
        datePicker.setHelperText("Format: DD.MM.YYYY");
        // end::snippet[]

        add(datePicker);
    }
    public static class Exporter extends DemoExporter<DatePickerDateFormatIndicator> { // hidden-source-line
    } // hidden-source-line
}
