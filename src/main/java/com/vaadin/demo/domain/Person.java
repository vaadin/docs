package com.vaadin.demo.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties(ignoreUnknown = true)
public class Person {

  private String firstName;

  private String lastName;

  private String email;

  private Integer id;

  private boolean subscriber;

  private String membership;

  private String pictureUrl;

  public String getFirstName() {
    return firstName;
  }

  public void setFirstName(String firstName) {
    this.firstName = firstName;
  }

  public String getLastName() {
    return lastName;
  }

  public void setLastName(String lastName) {
    this.lastName = lastName;
  }

  public String getEmail() {
    return email;
  }

  public void setEmail(String email) {
    this.email = email;
  }

  public boolean isSubscriber() {
    return subscriber;
  }

  public void setSubscriber(boolean subscriber) {
    this.subscriber = subscriber;
  }

  public String getMembership() {
    return membership;
  }

  public void setMembership(String membership) {
    this.membership = membership;
  }

  public String getPictureUrl() {
    return pictureUrl;
  }

  public void setPictureUrl(String pictureUrl) {
    this.pictureUrl = pictureUrl;
  }

  public Integer getId() {
    return id;
  }

  public void setId(Integer id) {
    this.id = id;
  }
}
