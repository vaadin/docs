package com.vaadin.demo.component.customfield;

import com.vaadin.flow.component.customfield.CustomField;
import com.vaadin.flow.component.html.Input;
import com.vaadin.flow.component.orderedlayout.HorizontalLayout;

// tag::snippet[]
public class PaymentInformationField extends CustomField<PaymentInformation> {

  private Input cardholderName;
  private Input cardNumber;
  private Input securityCode;

  public PaymentInformationField(String label) {
    this();
    setLabel(label);
  }

  public PaymentInformationField() {
    cardholderName = createInput("Cardholder name", "[\\p{L} \\-]+");
    cardNumber = createInput("Card number", "[\\d ]{12,23}");
    securityCode = createInput("Security code", "[0-9]{3,4}");

    HorizontalLayout layout = new HorizontalLayout(cardholderName, cardNumber, securityCode);
    // Removes default spacing
    layout.setSpacing(false);
    // Adds small amount of space between the components
    layout.getThemeList().add("spacing-s");

    add(layout);
  }

  private Input createInput(String label, String pattern) {
    Input input = new Input();
    input.getElement().setAttribute("aria-label", label);
    input.getElement().setAttribute("pattern", pattern);
    input.getElement().setAttribute("required", true);
    input.setPlaceholder(label);
    input.setType("text");
    return input;
  }

  @Override
  protected PaymentInformation generateModelValue() {
    return new PaymentInformation(
      cardholderName.getValue(),
      cardNumber.getValue(),
      securityCode.getValue()
    );
  }

  @Override
  protected void setPresentationValue(PaymentInformation paymentInformation) {
    cardholderName.setValue(paymentInformation.getCardholderName());
    cardNumber.setValue(paymentInformation.getCardNumber());
    securityCode.setValue(paymentInformation.getSecurityCode());
  }
}
// end::snippet[]
