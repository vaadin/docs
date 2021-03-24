package com.vaadin.demo.component.datepicker;

import com.vaadin.flow.component.datepicker.DatePicker;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.router.Route;
import com.vaadin.demo.DemoExporter; // hidden-full-source-line

@Route("date-picker-week-numbers")
public class DatePickerWeekNumbers extends Div {

    public DatePickerWeekNumbers() {
        // tag::snippet[]
        DatePicker datePicker = new DatePicker("Birthday");

        add(datePicker);
        // end::snippet[]
    }

    public static class Exporter extends DemoExporter<DatePickerWeekNumbers> { // hidden-full-source-line
    } // hidden-full-source-line
}
