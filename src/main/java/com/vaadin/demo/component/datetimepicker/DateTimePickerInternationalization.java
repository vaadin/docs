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
        DateTimePicker dateTimePicker = new DateTimePicker("Sitzungsdatum");

        // tag::snippet[]
        DatePicker.DatePickerI18n customI18n = new DatePicker.DatePickerI18n();
        customI18n.setMonthNames(List.of("Januar", "Februar", "März", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember"));
        customI18n.setWeekdays(List.of("Sonntag", "Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag"));
        customI18n.setWeekdaysShort(List.of("So", "Mo", "Di", "Mi", "Do", "Fr", "Sa"));        
        customI18n.setWeek("Woche");
        customI18n.setToday("Heute");
        customI18n.setCancel("Abbrechen");
        
        dateTimePicker.setDatePickerI18n(customI18n);
        // end::snippet[]

        add(dateTimePicker);
    }

    public static class Exporter extends DemoExporter<DateTimePickerInternationalization> { // hidden-source-line
    } // hidden-source-line
}
