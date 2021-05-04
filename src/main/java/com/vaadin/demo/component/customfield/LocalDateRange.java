package com.vaadin.demo.component.customfield;

import java.time.LocalDate;

// tag::snippet[]
public class LocalDateRange {

  private LocalDate start;
  private LocalDate end;

  public LocalDateRange(LocalDate start, LocalDate end) {
    this.start = start;
    this.end = end;
  }

  public LocalDate getStart() {
    return start;
  }

  public void setStart(LocalDate start) {
    this.start = start;
  }

  public LocalDate getEnd() {
    return end;
  }

  public void setEnd(LocalDate end) {
    this.end = end;
  }
}
// end::snippet[]
