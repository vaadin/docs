package com.vaadin.demo.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties; // hidden-full-source-line

@JsonIgnoreProperties(ignoreUnknown = true) // hidden-full-source-line
// tag::snippet[]
public class Person {

  private String firstName;

  private String lastName;

  private String email;

  private Integer id;

  private boolean subscriber;

  private String membership;

  private String pictureUrl;

  private String profession;

  private Address address;

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

  public String getProfession() {
    return profession;
  }

  public void setProfession(String profession) {
    this.profession = profession;
  }

  public Address getAddress() {
    return address;
  }

  public void setAddress(Address address) {
    this.address = address;
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
    if (!(obj instanceof Person)) {
      return false;
    }
    Person other = (Person) obj;
    return id == other.id;
  }
}
// end::snippet[]
