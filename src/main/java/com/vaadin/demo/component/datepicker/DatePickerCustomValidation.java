package com.vaadin.demo.component.datepicker;

import com.vaadin.demo.DemoExporter; // hidden-source-line
import com.vaadin.demo.domain.Appointment;
import com.vaadin.flow.component.datepicker.DatePicker;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.data.binder.Binder;
import com.vaadin.flow.router.Route;

import java.time.DayOfWeek;

@Route("date-picker-custom-validation")
public class DatePickerCustomValidation extends Div {

  public DatePickerCustomValidation() {
    DatePicker datePicker = new DatePicker("Meeting date");
    datePicker.setHelperText("Mondays-Fridays only");

    Binder<Appointment> binder = new Binder();
    Appointment appointment = new Appointment();
    // tag::snippet[]
    binder.forField(datePicker)
      .asRequired("Pick a meeting date")
      .withValidator(localDate ->
        localDate.getDayOfWeek().equals(DayOfWeek.SATURDAY) ||
        localDate.getDayOfWeek().equals(DayOfWeek.SUNDAY),
        "Please select a weekday"
      )
      .bind(Appointment::getStartDate, Appointment::setStartDate);
    // end::snippet[]
    add(datePicker);
  }
  public static class Exporter extends DemoExporter<DatePickerCustomValidation> {} // hidden-source-line
}
