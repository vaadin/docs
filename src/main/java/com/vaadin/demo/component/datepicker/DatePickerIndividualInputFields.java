package com.vaadin.demo.component.datepicker;

import com.vaadin.flow.component.datepicker.DatePicker;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.router.Route;
import com.vaadin.demo.DemoExporter; // hidden-source-line

@Route("date-picker-individual-input-fields")
public class DatePickerIndividualInputFields extends Div {

    public DatePickerIndividualInputFields() {
        // tag::snippet[]
        DatePicker datePicker = new DatePicker("Birthday");

        add(datePicker);
        // end::snippet[]
    }

    public static class Exporter extends DemoExporter<DatePickerIndividualInputFields> { // hidden-source-line
    } // hidden-source-line
}
