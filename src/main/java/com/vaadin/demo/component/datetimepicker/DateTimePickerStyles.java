package com.vaadin.demo.component.datetimepicker;

import com.vaadin.flow.component.orderedlayout.HorizontalLayout;
import com.vaadin.flow.component.datetimepicker.DateTimePicker;
import com.vaadin.flow.component.datetimepicker.DateTimePickerVariant;
import com.vaadin.flow.router.Route;

import java.time.LocalDateTime;

import com.vaadin.demo.DemoExporter; // hidden-source-line

@Route("date-time-picker-styles")
public class DateTimePickerStyles extends HorizontalLayout {

    public DateTimePickerStyles() {
        setPadding(false);

        // tag::snippet[]
        DateTimePicker field = new DateTimePicker();
        field.addThemeVariants(
            DateTimePickerVariant.LUMO_SMALL,
            DateTimePickerVariant.LUMO_ALIGN_RIGHT,
            DateTimePickerVariant.LUMO_HELPER_ABOVE_FIELD
        );
        field.getStyle().set("--vaadin-input-field-border-width", "1px");
        // end::snippet[]
        field.setLabel("Label");
        field.setHelperText("Helper text");
        field.setValue(LocalDateTime.of(2020, 6, 12, 12, 30));

        add(field);
    }

    public static class Exporter extends DemoExporter<DateTimePickerStyles> { // hidden-source-line
    } // hidden-source-line
}
