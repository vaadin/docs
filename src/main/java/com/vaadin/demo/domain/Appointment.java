package com.vaadin.demo.domain;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties; // hidden-source-line

@JsonIgnoreProperties(ignoreUnknown = true) // hidden-source-line
// tag::snippet[]
public class Appointment {

  private LocalTime startTime;

  private LocalDateTime startDateTime;

  private LocalDate startDate;

  private String enrollmentPeriod;

  private Integer id;

  public LocalTime getStartTime() {
    return startTime;
  }

  public void setStartTime(LocalTime startTime) {
    this.startTime = startTime;
  }

  public LocalDateTime getStartDateTime() {
    return startDateTime;
  }

  public void setStartDateTime(LocalDateTime startDateTime) {
    this.startDateTime = startDateTime;
  }

  public Integer getId() {
    return id;
  }

  public void setId(Integer id) {
    this.id = id;
  }

  @Override
  public int hashCode() {
    return id;
  }

  @Override
  public boolean equals(Object obj) {
    if (this == obj) {
      return true;
    }
    if (!(obj instanceof Appointment)) {
      return false;
    }
    Appointment other = (Appointment) obj;
    return id == other.id;
  }

  public LocalDate getStartDate() {
    return startDate;
  }

  public void setStartDate(LocalDate startDate) {
    this.startDate = startDate;
  }

  public String getEnrollmentPeriod() {
    return enrollmentPeriod;
  }

  public void setEnrollmentPeriod(String enrollmentPeriod) {
    this.enrollmentPeriod = enrollmentPeriod;
  }
}
// end::snippet[]
