package com.vaadin.demo.component.customfield;

import com.vaadin.demo.DemoExporter; // hidden-source-line
import com.vaadin.demo.domain.Appointment;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.data.binder.Binder;
import com.vaadin.flow.router.Route;

import java.time.temporal.ChronoUnit;

@Route("custom-field-basic")
public class CustomFieldBasic extends Div {

  public CustomFieldBasic() {
    // tag::snippet[]
    DateRangePicker dateRangePicker = new DateRangePicker();
    dateRangePicker.setLabel("Enrollment period");
    dateRangePicker.setHelperText("Cannot be longer than 30 days");
    add(dateRangePicker);

    Binder<Appointment> binder = new Binder();
    binder.forField(dateRangePicker)
      .asRequired("Enter a start and end date")
      .withValidator(localDateRange ->
        ChronoUnit.DAYS.between(localDateRange.getStartDate(), localDateRange.getEndDate()) > 30,
        "Dates cannot be more than 30 days apart"
      )
      .withValidator(localDateRange ->
        localDateRange.getStartDate().isBefore(localDateRange.getEndDate()),
        "Start date must be earlier than end date"
      )
      .bind(
        appointment ->
          new LocalDateRange(appointment.getStartDate(), appointment.getEndDate()),
        (appointment, localDateRange) -> {
          appointment.setStartDate(localDateRange.getStartDate());
          appointment.setEndDate(localDateRange.getEndDate());
        }
      );
    // end::snippet[]
  }
  public static class Exporter extends DemoExporter<CustomFieldBasic> {} // hidden-source-line
}
