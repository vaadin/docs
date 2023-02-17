package com.vaadin.demo.component.datepicker;

import com.vaadin.demo.DemoExporter; // hidden-source-line
import com.vaadin.flow.component.datepicker.DatePicker;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.router.Route;

import java.time.LocalDate;
import java.time.ZoneId;

@Route("date-picker-min-max")
public class DatePickerMinMax extends Div {

    public DatePickerMinMax() {
        DatePicker datePicker = new DatePicker("Appointment date");
        // tag::snippet[]
        LocalDate now = LocalDate.now(ZoneId.systemDefault());

        datePicker.setMin(now);
        datePicker.setMax(now.plusDays(60));
        datePicker.setHelperText("Must be within 60 days from today");
        datePicker.addValueChangeListener(event -> {
            LocalDate value = datePicker.getValue();
            if (value.compareTo(datePicker.getMin()) < 0) {
                datePicker.setErrorMessage("Too early, choose another date");
            } else if (value.compareTo(datePicker.getMax()) > 0) {
                datePicker.setErrorMessage("Too late, choose another date");
            } else {
                datePicker.setErrorMessage(null);
            }
        });
        // end::snippet[]

        add(datePicker);
    }

    public static class Exporter extends DemoExporter<DatePickerMinMax> { // hidden-source-line
    } // hidden-source-line
}
