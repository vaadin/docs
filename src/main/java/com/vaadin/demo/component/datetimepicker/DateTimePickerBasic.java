package com.vaadin.demo.component.datetimepicker;

import com.vaadin.flow.component.datetimepicker.DateTimePicker;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.router.Route;

import com.vaadin.demo.DemoExporter; // hidden-source-line

@Route("date-time-picker-basic")
public class DateTimePickerBasic extends Div {

    public DateTimePickerBasic() {
        // tag::snippet[]
        DateTimePicker dateTimePicker = new DateTimePicker();
        dateTimePicker.setLabel("Meeting date and time");
        add(dateTimePicker);
        // end::snippet[]
    }

    public static class Exporter extends DemoExporter<DateTimePickerBasic> { // hidden-source-line
    } // hidden-source-line
}
