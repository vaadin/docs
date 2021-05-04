package com.vaadin.demo.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties; // hidden-source-line

@JsonIgnoreProperties(ignoreUnknown = true) // hidden-source-line
// tag::snippet[]
public class Country {

  private String name;

  private String abbreviation;

  private Integer id;

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }

  public String getAbbreviation() {
    return abbreviation;
  }

  public void setAbbreviation(String abbreviation) {
    this.abbreviation = abbreviation;
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
    if (!(obj instanceof Country)) {
      return false;
    }
    Country other = (Country) obj;
    return id == other.id;
  }
}
// end::snippet[]
