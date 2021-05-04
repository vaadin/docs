package com.vaadin.demo.component.datepicker;

import com.vaadin.flow.component.datepicker.DatePicker;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.router.Route;
import com.vaadin.demo.DemoExporter; // hidden-source-line

@Route("date-picker-custom-validation")
public class DatePickerCustomValidation extends Div {

    public DatePickerCustomValidation() {
        // tag::snippet[]
        DatePicker datePicker = new DatePicker("Date");

        add(datePicker);
        // end::snippet[]
    }

    public static class Exporter extends DemoExporter<DatePickerCustomValidation> { // hidden-source-line
    } // hidden-source-line
}
