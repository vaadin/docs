package com.vaadin.demo.component.datetimepicker;

import com.vaadin.flow.component.datetimepicker.DateTimePicker;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.router.Route;
import com.vaadin.demo.DemoExporter; // hidden-source-line

import java.time.LocalDate;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.time.temporal.TemporalAdjusters;

@Route("date-time-picker-initial-position")
public class DateTimePickerInitialPosition extends Div {

    public DateTimePickerInitialPosition() {
        DateTimePicker dateTimePicker = new DateTimePicker("Meeting date and time");
        // tag::snippet[]
        // https://github.com/vaadin/vaadin-date-time-picker/issues/57
        DateTimeFormatter formatter = DateTimeFormatter.ISO_DATE;
        LocalDate startOfNextMonth = LocalDate.now(ZoneId.systemDefault())
                .with(TemporalAdjusters.firstDayOfNextMonth());
        String startOfNextMonthIsoString = formatter.format(startOfNextMonth);

        dateTimePicker.getElement().executeJs(
                "this.initialPosition = $0",
                startOfNextMonthIsoString
        );
        // end::snippet[]
        add(dateTimePicker);
    }
    public static class Exporter extends DemoExporter<DateTimePickerInitialPosition> { // hidden-source-line
    } // hidden-source-line
}
