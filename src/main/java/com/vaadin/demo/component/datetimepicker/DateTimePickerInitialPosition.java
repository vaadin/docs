package com.vaadin.demo.component.datetimepicker;

import com.vaadin.flow.component.datepicker.DatePicker;
import com.vaadin.flow.component.datetimepicker.DateTimePicker;
import com.vaadin.flow.component.grid.Grid;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.router.Route;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Arrays;

import com.vaadin.demo.DemoExporter; // hidden-source-line

@Route("date-time-picker-initial-position")
public class DateTimePickerInitialPosition extends Div {

    public DateTimePickerInitialPosition() {
        // tag::snippet[]
        DateTimePicker dateTimePicker = new DateTimePicker();
        dateTimePicker.setLabel("Q4 deadline");
        // https://github.com/vaadin/vaadin-date-time-picker/issues/57
        dateTimePicker.getElement().executeJs("this.initialPosition = '" + LocalDate.now().getYear() + "-12-31'");
        add(dateTimePicker);
        // end::snippet[]
    }

    public static class Exporter extends DemoExporter<DateTimePickerInitialPosition> { // hidden-source-line
    } // hidden-source-line
}
