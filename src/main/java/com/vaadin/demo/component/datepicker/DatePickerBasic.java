package com.vaadin.demo.component.datepicker;

import com.vaadin.flow.component.datepicker.DatePicker;
import com.vaadin.flow.component.html.Div;
import com.vaadin.demo.DemoExporter; // hidden-full-source-line

public class DatePickerBasic extends Div {

  public DatePickerBasic() {
    // tag::snippet[]
    DatePicker datePicker = new DatePicker("Birthday");

    add(datePicker);
    // end::snippet[]
  }

  public static class GridEditorExporter extends DemoExporter<DatePickerBasic> { // hidden-full-source-line
  } // hidden-full-source-line
}
