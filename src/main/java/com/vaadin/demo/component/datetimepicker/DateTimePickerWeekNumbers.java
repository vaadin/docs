package com.vaadin.demo.component.datetimepicker;

import com.vaadin.flow.component.datepicker.DatePicker;
import com.vaadin.flow.component.datetimepicker.DateTimePicker;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.router.Route;

import java.util.Arrays;

import com.vaadin.demo.DemoExporter; // hidden-source-line

@Route("date-time-picker-week-numbers")
public class DateTimePickerWeekNumbers extends Div {

    public DateTimePickerWeekNumbers() {
        // tag::snippet[]
        DateTimePicker dateTimePicker = new DateTimePicker();
        dateTimePicker.setLabel("Meeting date and time");
        dateTimePicker.setWeekNumbersVisible(true);
        dateTimePicker.setDatePickerI18n(new DatePicker.DatePickerI18n()
            .setWeek("Week").setCalendar("Calendar").setClear("Clear")
            .setToday("Today").setCancel("cancel").setFirstDayOfWeek(1)
            .setMonthNames(Arrays.asList("January", "February", "March",
                    "April", "May", "June", "July", "August", "September",
                    "October", "November", "December"))
            .setWeekdays(Arrays.asList("Sunday", "Monday", "Tuesday",
                    "Wednesday", "Thursday", "Friday", "Saturday"))
            .setWeekdaysShort(Arrays.asList("Sun", "Mon", "Tue", "Wed",
                    "Thu", "Fri", "Sat")));
        add(dateTimePicker);
        // end::snippet[]
    }

    public static class Exporter extends DemoExporter<DateTimePickerWeekNumbers> { // hidden-source-line
    } // hidden-source-line
}
