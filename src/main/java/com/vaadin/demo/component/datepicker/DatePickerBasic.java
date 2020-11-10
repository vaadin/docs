package com.vaadin.demo.component.datepicker;

import com.vaadin.flow.component.datepicker.DatePicker;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.router.Route;
import com.vaadin.demo.DemoExporter; // hidden-full-source-line

@Route("date-picker-basic")
public class DatePickerBasic extends Div {

  public DatePickerBasic() {
    // tag::snippet[]
    DatePicker datePicker = new DatePicker("Birthday");

    add(datePicker);
    // end::snippet[]
  }

  public static class Exporter extends DemoExporter<DatePickerBasic> { // hidden-full-source-line
  } // hidden-full-source-line
}
