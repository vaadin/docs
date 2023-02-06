package com.vaadin.demo.component.datepicker;

import java.util.List;

import com.vaadin.demo.DemoExporter; // hidden-source-line
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.datepicker.DatePicker;
import com.vaadin.flow.router.Route;

@Route("date-picker-internationalization")
public class DatePickerInternationalization extends Div {

    public DatePickerInternationalization() {
        DatePicker datePicker = new DatePicker("Sitzungsdatum");

        // tag::snippet[]
        DatePicker.DatePickerI18n germanI18n = new DatePicker.DatePickerI18n();
        germanI18n.setMonthNames(List.of("Januar", "Februar", "März", "April",
                "Mai", "Juni", "Juli", "August", "September", "Oktober",
                "November", "Dezember"));
        germanI18n.setWeekdays(List.of("Sonntag", "Montag", "Dienstag",
                "Mittwoch", "Donnerstag", "Freitag", "Samstag"));
        germanI18n.setWeekdaysShort(
                List.of("So", "Mo", "Di", "Mi", "Do", "Fr", "Sa"));
        germanI18n.setToday("Heute");
        germanI18n.setCancel("Abbrechen");

        datePicker.setI18n(germanI18n);
        // end::snippet[]

        add(datePicker);
    }

    public static class Exporter extends // hidden-source-line
            DemoExporter<DatePickerInternationalization> { // hidden-source-line
    } // hidden-source-line
}
