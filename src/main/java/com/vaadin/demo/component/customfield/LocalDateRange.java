package com.vaadin.demo.component.customfield;

import java.time.LocalDate;

// tag::snippet[]
public class LocalDateRange {

  private LocalDate startDate;
  private LocalDate endDate;

  public LocalDateRange(LocalDate startDate, LocalDate endDate) {
    this.startDate = startDate;
    this.endDate = endDate;
  }

  public LocalDate getStartDate() {
    return startDate;
  }

  public void setStartDate(LocalDate startDate) {
    this.startDate = startDate;
  }

  public LocalDate getEndDate() {
    return endDate;
  }

  public void setEndDate(LocalDate endDate) {
    this.endDate = endDate;
  }
}
// end::snippet[]
