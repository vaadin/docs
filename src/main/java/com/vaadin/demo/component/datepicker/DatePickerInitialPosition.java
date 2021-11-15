package com.vaadin.demo.component.datepicker;

import com.vaadin.demo.DemoExporter; // hidden-source-line
import com.vaadin.flow.component.datepicker.DatePicker;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.router.Route;

import java.time.LocalDate;
import java.time.ZoneId;
import java.time.temporal.TemporalAdjusters;

@Route("date-picker-initial-position")
public class DatePickerInitialPosition extends Div {

    public DatePickerInitialPosition() {
        DatePicker datePicker = new DatePicker("Q4 deadline");
        // tag::snippet[]
        LocalDate lastDayOfYear = LocalDate.now(ZoneId.systemDefault())
                .with(TemporalAdjusters.lastDayOfYear());

        datePicker.setInitialPosition(lastDayOfYear);
        // end::snippet[]

        add(datePicker);
    }
    public static class Exporter extends DemoExporter<DatePickerInitialPosition> { // hidden-source-line
    } // hidden-source-line
}
