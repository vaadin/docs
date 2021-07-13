package com.vaadin.demo.component.datetimepicker;

import com.vaadin.flow.component.datepicker.DatePicker;
import com.vaadin.flow.component.datetimepicker.DateTimePicker;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.router.Route;
import com.vaadin.demo.DemoExporter; // hidden-source-line

import java.util.Arrays;

@Route("date-time-picker-week-numbers")
public class DateTimePickerWeekNumbers extends Div {

    public DateTimePickerWeekNumbers() {
        DateTimePicker dateTimePicker = new DateTimePicker();
        dateTimePicker.setLabel("Meeting date and time");
        // tag::snippet[]
        dateTimePicker.setWeekNumbersVisible(true);
        dateTimePicker.setDatePickerI18n(new DatePicker.DatePickerI18n().setFirstDayOfWeek(1));
        // end::snippet[]
        add(dateTimePicker);
    }
    public static class Exporter extends DemoExporter<DateTimePickerWeekNumbers> { // hidden-source-line
    } // hidden-source-line
}
