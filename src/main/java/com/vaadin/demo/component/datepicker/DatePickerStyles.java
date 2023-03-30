package com.vaadin.demo.component.datepicker;

import com.vaadin.flow.component.datepicker.DatePickerVariant;
import com.vaadin.flow.component.orderedlayout.HorizontalLayout;
import com.vaadin.flow.component.datepicker.DatePicker;
import com.vaadin.flow.router.Route;

import java.time.LocalDate;
import java.time.ZoneId;

import com.vaadin.demo.DemoExporter; // hidden-source-line

@Route("date-picker-styles")
public class DatePickerStyles extends HorizontalLayout {

    public DatePickerStyles() {
        setPadding(false);

        // tag::snippet[]
        DatePicker field = new DatePicker();
        field.addThemeVariants(
            DatePickerVariant.LUMO_SMALL,
            DatePickerVariant.LUMO_ALIGN_RIGHT,
            DatePickerVariant.LUMO_HELPER_ABOVE_FIELD
        );
        // end::snippet[]
        field.setLabel("Label");
        field.setHelperText("Helper text");
        field.setValue(LocalDate.now(ZoneId.systemDefault()));

        add(field);
    }

    public static class Exporter extends DemoExporter<DatePickerStyles> { // hidden-source-line
    } // hidden-source-line
}
