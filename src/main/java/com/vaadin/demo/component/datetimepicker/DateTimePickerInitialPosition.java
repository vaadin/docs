package com.vaadin.demo.component.datetimepicker;

import com.vaadin.flow.component.datetimepicker.DateTimePicker;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.router.Route;
import com.vaadin.demo.DemoExporter; // hidden-source-line

import java.time.LocalDate;

@Route("date-time-picker-initial-position")
public class DateTimePickerInitialPosition extends Div {

    public DateTimePickerInitialPosition() {
        DateTimePicker dateTimePicker = new DateTimePicker("Q4 deadline");
        // tag::snippet[]
        // https://github.com/vaadin/vaadin-date-time-picker/issues/57
        dateTimePicker.getElement().executeJs("this.initialPosition = '" + LocalDate.now().getYear() + "-12-31'");
        // end::snippet[]
        add(dateTimePicker);
    }
    public static class Exporter extends DemoExporter<DateTimePickerInitialPosition> { // hidden-source-line
    } // hidden-source-line
}
