package com.vaadin.demo.component.datepicker;

import com.vaadin.flow.component.datepicker.DatePicker;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.router.Route;
import com.vaadin.demo.DemoExporter; // hidden-source-line

@Route("date-picker-initial-position")
public class DatePickerInitialPosition extends Div {

    public DatePickerInitialPosition() {
        // tag::snippet[]
        DatePicker datePicker = new DatePicker("Birthday");

        add(datePicker);
        // end::snippet[]
    }

    public static class Exporter extends DemoExporter<DatePickerInitialPosition> { // hidden-source-line
    } // hidden-source-line
}
