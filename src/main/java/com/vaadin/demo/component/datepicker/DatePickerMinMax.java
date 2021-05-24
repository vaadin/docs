package com.vaadin.demo.component.datepicker;

import com.vaadin.flow.component.datepicker.DatePicker;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.router.Route;
import com.vaadin.demo.DemoExporter; // hidden-source-line

@Route("date-picker-min-max")
public class DatePickerMinMax extends Div {

    public DatePickerMinMax() {
        // tag::snippet[]
        DatePicker datePicker = new DatePicker("Birthday");

        add(datePicker);
        // end::snippet[]
    }

    public static class Exporter extends DemoExporter<DatePickerMinMax> { // hidden-source-line
    } // hidden-source-line
}
