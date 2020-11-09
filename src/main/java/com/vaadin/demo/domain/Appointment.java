package com.vaadin.demo.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties; // hidden-full-source-line

@JsonIgnoreProperties(ignoreUnknown = true) // hidden-full-source-line
// tag::snippet[]
public class Appointment {



  private Integer id;

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
}
// end::snippet[]
