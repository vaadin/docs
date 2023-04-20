package com.vaadin.demo.component.datetimepicker;

import com.vaadin.flow.component.orderedlayout.HorizontalLayout;
import com.vaadin.flow.component.datetimepicker.DateTimePicker;
import com.vaadin.flow.router.Route;
import com.vaadin.demo.DemoExporter; // hidden-source-line

@Route("date-time-picker-basic-features")
public class DateTimePickerBasicFeatures extends HorizontalLayout {

    public DateTimePickerBasicFeatures() {
        setPadding(false);

        // tag::snippet[]
        DateTimePicker field = new DateTimePicker();
        field.setLabel("Label");
        field.setHelperText("Helper text");
        field.setDatePlaceholder("Date");
        field.setTimePlaceholder("Time");
        field.setTooltipText("Tooltip text");
        // end::snippet[]

        add(field);
    }

    public static class Exporter extends DemoExporter<DateTimePickerBasicFeatures> { // hidden-source-line
    } // hidden-source-line
}
