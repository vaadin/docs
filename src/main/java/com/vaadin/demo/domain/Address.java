package com.vaadin.demo.domain;

import javax.annotation.Nonnull;

public class Address {

  @Nonnull
  private String street;

  @Nonnull
  private String city;

  @Nonnull
  private String state;

  @Nonnull
  private String zip;

  @Nonnull
  private String country;

  @Nonnull
  private String phone;

  public String getStreet() {
    return street;
  }

  public void setStreet(String street) {
    this.street = street;
  }

  public String getCity() {
    return city;
  }

  public void setCity(String city) {
    this.city = city;
  }

  public String getState() {
    return state;
  }

  public void setState(String state) {
    this.state = state;
  }

  public String getZip() {
    return zip;
  }

  public void setZip(String zip) {
    this.zip = zip;
  }

  public String getCountry() {
    return country;
  }

  public void setCountry(String country) {
    this.country = country;
  }

  public String getPhone() {
    return phone;
  }

  public void setPhone(String phone) {
    this.phone = phone;
  }

  
  
}
