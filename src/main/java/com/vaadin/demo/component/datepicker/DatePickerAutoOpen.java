package com.vaadin.demo.component.datepicker;

import com.vaadin.demo.DemoExporter; // hidden-source-line
import com.vaadin.flow.component.datepicker.DatePicker;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.router.Route;

@Route("date-picker-auto-open")
public class DatePickerAutoOpen extends Div {

    public DatePickerAutoOpen() {
        DatePicker datePicker = new DatePicker("Start date");
        // tag::snippet[]
        datePicker.setAutoOpen(false);
        // end::snippet[]

        add(datePicker);
    }

    public static class Exporter extends DemoExporter<DatePickerAutoOpen> { // hidden-source-line
    } // hidden-source-line
}
