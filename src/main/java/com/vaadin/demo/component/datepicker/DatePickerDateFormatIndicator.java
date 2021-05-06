package com.vaadin.demo.component.datepicker;

import com.vaadin.demo.DemoExporter; // hidden-source-line
import com.vaadin.flow.component.datepicker.DatePicker;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.router.Route;

import java.util.Locale;

@Route("date-picker-date-format-indicator")
public class DatePickerDateFormatIndicator extends Div {

  public DatePickerDateFormatIndicator() {
    // tag::snippet[]
    DatePicker datePicker = new DatePicker("Start date");
    datePicker.setPlaceholder("DD/MM/YYYY");
    datePicker.setHelperText("Format: DD/MM/YYYY");
    datePicker.setLocale(Locale.UK);
    // end::snippet[]
    add(datePicker);
  }
  public static class Exporter extends DemoExporter<DatePickerDateFormatIndicator> {} // hidden-source-line
}
