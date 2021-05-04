package com.vaadin.demo.component.customfield;

import com.vaadin.demo.DemoExporter; // hidden-source-line
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

    Binder<EnrollmentPeriod> binder = new Binder();
    EnrollmentPeriod enrollmentPeriod = new EnrollmentPeriod();
    binder.forField(dateRangePicker)
      .asRequired("Enter a start and end date")
      .withValidator(localDateRange ->
        ChronoUnit.DAYS.between(localDateRange.getStart(), localDateRange.getEnd()) > 30,
        "Dates cannot be more than 30 days apart"
      )
      .withValidator(localDateRange ->
        localDateRange.getStart().isBefore(localDateRange.getEnd()),
        "Start date must be earlier than end date"
      )
      .bind(EnrollmentPeriod::getPeriod, EnrollmentPeriod::setPeriod);
    // end::snippet[]
  }
  public static class Exporter extends DemoExporter<CustomFieldBasic> {} // hidden-source-line
}
