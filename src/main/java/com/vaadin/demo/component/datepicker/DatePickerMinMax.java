package com.vaadin.demo.component.datepicker;

import com.vaadin.demo.DemoExporter; // hidden-source-line
import com.vaadin.flow.component.datepicker.DatePicker;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.router.Route;

import java.time.LocalDate;

@Route("date-picker-min-max")
public class DatePickerMinMax extends Div {

    public DatePickerMinMax() {
        DatePicker datePicker = new DatePicker("Appointment date");
        // tag::snippet[]
        datePicker.setMin(LocalDate.now());
        datePicker.setMax(LocalDate.now().plusDays(60));
        // end::snippet[]
        datePicker.setHelperText("Must be within 60 days from today");
        add(datePicker);
    }
    public static class Exporter extends DemoExporter<DatePickerMinMax> { // hidden-source-line
    } // hidden-source-line
}
