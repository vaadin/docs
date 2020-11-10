package com.vaadin.demo.component.datetimepicker;

import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.timepicker.TimePicker;
import com.vaadin.flow.router.Route;
import com.vaadin.demo.DemoExporter; // hidden-full-source-line

@Route("date-time-picker-parsing")
public class DateTimePickerParsing extends Div {

    public DateTimePickerParsing() {
        // tag::snippet[]
        TimePicker timePicker = new TimePicker();
        add(timePicker);
        // end::snippet[]
    }

    public static class Exporter extends DemoExporter<DateTimePickerParsing> { // hidden-full-source-line
    } // hidden-full-source-line
}
