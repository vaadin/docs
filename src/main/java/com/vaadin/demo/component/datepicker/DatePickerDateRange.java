package com.vaadin.demo.component.datepicker;

import com.vaadin.demo.DemoExporter; // hidden-source-line
import com.vaadin.flow.component.datepicker.DatePicker;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.orderedlayout.HorizontalLayout;
import com.vaadin.flow.router.Route;

@Route("date-picker-date-range")
public class DatePickerDateRange extends Div {

  private DatePicker departureDate;
  private DatePicker returnDate;

  public DatePickerDateRange() {
    // tag::snippet[]
    departureDate = new DatePicker("Departure date");
    departureDate.addValueChangeListener(event -> {
      returnDate.setMin(departureDate.getValue());
    });

    returnDate = new DatePicker("Return date");
    returnDate.addValueChangeListener(event -> {
      departureDate.setMax(returnDate.getValue());
    });

    // end::snippet[]
    HorizontalLayout layout = new HorizontalLayout(departureDate, returnDate);
    add(layout);
  }
  public static class Exporter extends DemoExporter<DatePickerDateRange> {} // hidden-source-line
}
