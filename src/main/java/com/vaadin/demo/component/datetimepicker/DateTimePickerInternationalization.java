package com.vaadin.demo.component.datetimepicker;

import java.util.List;

import com.vaadin.demo.DemoExporter;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.datepicker.DatePicker;
import com.vaadin.flow.component.datetimepicker.DateTimePicker;
import com.vaadin.flow.router.Route;

@Route("date-time-picker-internationalization")
public class DateTimePickerInternationalization extends Div {

    public DateTimePickerInternationalization() {
        DateTimePicker dateTimePicker = new DateTimePicker("Meeting date and time");

        // tag::snippet[]
        DatePicker.DatePickerI18n customI18n = new DatePicker.DatePickerI18n();
        customI18n.setMonthNames(List.of("Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"));
        customI18n.setWeekdays(List.of("Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"));
        customI18n.setWeekdaysShort(List.of("Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"));
        customI18n.setFirstDayOfWeek(0);
        customI18n.setWeek("Week");
        customI18n.setToday("Today");
        customI18n.setCancel("Abort");

        dateTimePicker.setDatePickerI18n(customI18n);
        // end::snippet[]

        add(dateTimePicker);
    }

    public static class Exporter extends DemoExporter<DateTimePickerInternationalization> { // hidden-source-line
    } // hidden-source-line
}
