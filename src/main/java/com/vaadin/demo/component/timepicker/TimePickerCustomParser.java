package com.vaadin.demo.component.timepicker;

import com.vaadin.demo.DemoExporter; // hidden-source-line
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.timepicker.TimePicker;
import com.vaadin.flow.router.Route;

@Route("time-picker-custom-parser")
public class TimePickerCustomParser extends Div {

    public TimePickerCustomParser() {
        // tag::snippet[]
        TimePicker timePicker = new TimePicker();
        add(timePicker);
        // end::snippet[]
    }

    public static class Exporter extends DemoExporter<TimePickerCustomParser> { // hidden-source-line
    } // hidden-source-line
}
