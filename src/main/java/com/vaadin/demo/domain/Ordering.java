package com.vaadin.demo.domain;

public class Ordering {
  private int id;
  private String name;

  public Ordering(int id, String name) {
    this.id = id;
    this.name = name;
  }

  public int getId() {
    return id;
  }

  public String getName() {
    return name;
  }
}
