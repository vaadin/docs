package com.vaadin.demo.component.customfield;

// tag::snippet[]
public class PaymentInformation {

  private String cardholderName;
  private String cardNumber;
  private String securityCode;

  public PaymentInformation(String cardholderName, String cardNumber, String securityCode) {
    this.cardholderName = cardholderName;
    this.cardNumber = cardNumber;
    this.securityCode = securityCode;
  }

  public String getCardholderName() {
    return cardholderName;
  }

  public void setCardholderName(String cardholderName) {
    this.cardholderName = cardholderName;
  }

  public String getCardNumber() {
    return cardNumber;
  }

  public void setCardNumber(String cardNumber) {
    this.cardNumber = cardNumber;
  }

  public String getSecurityCode() {
    return securityCode;
  }

  public void setSecurityCode(String securityCode) {
    this.securityCode = securityCode;
  }
}
// end::snippet[]
