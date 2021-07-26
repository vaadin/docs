package com.vaadin.demo.component.datepicker;

import com.vaadin.demo.DemoExporter; // hidden-source-line
import com.vaadin.flow.component.datepicker.DatePicker;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.orderedlayout.HorizontalLayout;
import com.vaadin.flow.router.Route;

@Route("date-picker-date-range")
public class DatePickerDateRange extends Div {

    public DatePickerDateRange() {
        // tag::snippet[]
        DatePicker departureDate = new DatePicker("Departure date");
        DatePicker returnDate = new DatePicker("Return date");
        departureDate.addValueChangeListener(e -> returnDate.setMin(e.getValue()));
        returnDate.addValueChangeListener(e -> departureDate.setMax(e.getValue()));
        // end::snippet[]

        add(new HorizontalLayout(departureDate, returnDate));
    }
    public static class Exporter extends DemoExporter<DatePickerDateRange> { // hidden-source-line
    } // hidden-source-line
}
