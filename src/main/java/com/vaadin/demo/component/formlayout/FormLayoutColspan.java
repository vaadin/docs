package com.vaadin.demo.component.formlayout;

import com.vaadin.demo.DemoExporter; // hidden-source-line
import com.vaadin.flow.component.datepicker.DatePicker;
import com.vaadin.flow.component.formlayout.FormLayout;
import com.vaadin.flow.component.formlayout.FormLayout.ResponsiveStep;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.textfield.TextField;
import com.vaadin.flow.component.timepicker.TimePicker;
import com.vaadin.flow.router.Route;

@Route("form-layout-colspan")
public class FormLayoutColspan extends Div {

  public FormLayoutColspan() {
    TextField title = new TextField("Title");
    DatePicker date = new DatePicker("Date");
    TimePicker from = new TimePicker("From");
    TimePicker to = new TimePicker("To");

    FormLayout formLayout = new FormLayout();
    formLayout.add(title, date, from, to);
    // tag::snippet[]
    formLayout.setColspan(title, 3);
    // end::snippet[]
    formLayout.setResponsiveSteps(
            new ResponsiveStep("0", 1),
            new ResponsiveStep("500px", 3)
    );
    add(formLayout);
  }
  public static class Exporter extends DemoExporter<FormLayoutColspan> { // hidden-source-line
  } // hidden-source-line
}
