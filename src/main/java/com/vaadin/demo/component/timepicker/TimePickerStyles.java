package com.vaadin.demo.component.timepicker;

import com.vaadin.flow.component.orderedlayout.HorizontalLayout;
import com.vaadin.flow.component.timepicker.TimePicker;
import com.vaadin.flow.component.timepicker.TimePickerVariant;
import com.vaadin.flow.router.Route;

import java.time.LocalTime;

import com.vaadin.demo.DemoExporter; // hidden-source-line

@Route("time-picker-styles")
public class TimePickerStyles extends HorizontalLayout {

    public TimePickerStyles() {
        setPadding(false);

        // tag::snippet[]
        TimePicker field = new TimePicker();
        field.addThemeVariants(
            TimePickerVariant.LUMO_SMALL,
            TimePickerVariant.LUMO_ALIGN_RIGHT,
            TimePickerVariant.LUMO_HELPER_ABOVE_FIELD
        );
        field.getStyle().set("--vaadin-input-field-border-width", "1px");
        // end::snippet[]
        field.setLabel("Label");
        field.setHelperText("Helper text");
        field.setValue(LocalTime.of(7, 0));

        add(field);
    }

    public static class Exporter extends DemoExporter<TimePickerStyles> { // hidden-source-line
    } // hidden-source-line
}
