package com.vaadin.demo.component.datetimepicker;

import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.timepicker.TimePicker;
import com.vaadin.flow.router.Route;
import com.vaadin.demo.DemoExporter; // hidden-source-line

@Route("date-time-picker-custom-parser")
public class DateTimePickerCustomParser extends Div {

    public DateTimePickerCustomParser() {
        // tag::snippet[]
        TimePicker timePicker = new TimePicker();
        add(timePicker);
        // end::snippet[]
    }

    public static class Exporter extends DemoExporter<DateTimePickerCustomParser> { // hidden-source-line
    } // hidden-source-line
}
