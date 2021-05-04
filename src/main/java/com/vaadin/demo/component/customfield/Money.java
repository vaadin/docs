package com.vaadin.demo.component.customfield;

// tag::snippet[]
public class Money {

  private String amount;
  private String currency;

  public Money(String amount, String currency) {
    this.amount = amount;
    this.currency = currency;
  }

  public String getAmount() {
    return amount;
  }

  public void setAmount(String amount) {
    this.amount = amount;
  }

  public String getCurrency() {
    return currency;
  }

  public void setCurrency(String currency) {
    this.currency = currency;
  }
}
// end::snippet[]
