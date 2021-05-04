package com.vaadin.demo.component.timepicker;

import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.timepicker.TimePicker;
import com.vaadin.flow.router.Route;
import com.vaadin.demo.DemoExporter; // hidden-source-line

@Route("time-picker-parsing")
public class TimePickerParsing extends Div {

    public TimePickerParsing() {
        // tag::snippet[]
        TimePicker timePicker = new TimePicker();
        add(timePicker);
        // end::snippet[]
    }

    public static class Exporter extends DemoExporter<TimePickerParsing> { // hidden-source-line
    } // hidden-source-line
}
