package com.vaadin.demo.component.customfield;

// tag::snippet[]
public class EnrollmentPeriod {

  private LocalDateRange period;

  public EnrollmentPeriod() {}

  public EnrollmentPeriod(LocalDateRange period) {
    this.period = period;
  }

  public LocalDateRange getPeriod() {
    return period;
  }

  public void setPeriod(LocalDateRange period) {
    this.period = period;
  }
}
// end::snippet[]
