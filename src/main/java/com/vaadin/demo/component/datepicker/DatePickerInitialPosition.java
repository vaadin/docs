package com.vaadin.demo.component.datepicker;

import com.vaadin.demo.DemoExporter; // hidden-source-line
import com.vaadin.flow.component.datepicker.DatePicker;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.router.Route;

import java.time.LocalDate;
import java.time.temporal.TemporalAdjusters;

@Route("date-picker-initial-position")
public class DatePickerInitialPosition extends Div {

  public DatePickerInitialPosition() {
    // tag::snippet[]
    DatePicker datePicker = new DatePicker("Q4 deadline");
    datePicker.setInitialPosition(getLastDayOfYear());
    // end::snippet[]
    add(datePicker);
  }

  private LocalDate getLastDayOfYear() {
    return LocalDate.now().with(TemporalAdjusters.lastDayOfYear());
  }
  public static class Exporter extends DemoExporter<DatePickerInitialPosition> {} // hidden-source-line
}
