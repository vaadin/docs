package com.vaadin.demo.component.datepicker;

import com.vaadin.demo.DemoExporter; // hidden-source-line
import com.vaadin.flow.component.datepicker.DatePicker;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.router.Route;

@Route("date-picker-basic")
public class DatePickerBasic extends Div {

  public DatePickerBasic() {
    // tag::snippet[]
    DatePicker datePicker = new DatePicker("Start date");
    add(datePicker);
    // end::snippet[]
  }
  public static class Exporter extends DemoExporter<DatePickerBasic> { // hidden-source-line
  } // hidden-source-line
}
