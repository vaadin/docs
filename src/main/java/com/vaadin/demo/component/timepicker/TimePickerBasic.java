package com.vaadin.demo.component.timepicker;

import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.timepicker.TimePicker;
import com.vaadin.flow.router.Route;

import java.time.LocalTime;

import com.vaadin.demo.DemoExporter; // hidden-source-line

@Route("time-picker-basic")
public class TimePickerBasic extends Div {

    public TimePickerBasic() {
        // tag::snippet[]
        TimePicker timePicker = new TimePicker();
        timePicker.setLabel("Alarm");
        timePicker.setValue(LocalTime.of(7, 0));
        add(timePicker);
        // end::snippet[]
    }

    public static class Exporter extends DemoExporter<TimePickerBasic> { // hidden-source-line
    } // hidden-source-line
}
