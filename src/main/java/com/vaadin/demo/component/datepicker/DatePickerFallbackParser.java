package com.vaadin.demo.component.datepicker;

import com.vaadin.demo.DemoExporter; // hidden-source-line
import com.vaadin.flow.component.datepicker.DatePicker;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.data.binder.Result;
import com.vaadin.flow.router.Route;

import java.time.LocalDate;

@Route("date-picker-fallback-parser")
public class DatePickerFallbackParser extends VerticalLayout {
    public DatePickerFallbackParser() {
        DatePicker datePicker = new DatePicker("Select a date:");
        // tag::snippet[]
        datePicker.setFallbackParser((s) -> {
            LocalDate now = LocalDate.now();
            if (s.matches("\\+\\d+")) {
                return Result
                        .ok(now.plusDays(Integer.parseInt(s.substring(1))));
            } else if (s.matches("-\\d+")) {
                return Result
                        .ok(now.minusDays(Integer.parseInt(s.substring(1))));
            } else {
                return Result.error("Invalid date format");
            }
        });
        // end::snippet[]
        datePicker.setHelperText("Format: +1, -2 for relative days");
        add(datePicker);
    }

    public static class Exporter
            extends DemoExporter<DatePickerFallbackParser> { // hidden-source-line
    } // hidden-source-line
}
