package com.vaadin.demo.component.customfield;

import com.vaadin.demo.DemoExporter; // hidden-source-line
import com.vaadin.flow.component.Html;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.html.Paragraph;
import com.vaadin.flow.component.html.Span;
import com.vaadin.flow.router.Route;

@Route("custom-field-native-input")
public class CustomFieldNativeInput extends Div {

  private Span value;

  public CustomFieldNativeInput() {
    // tag::snippet[]
    PaymentInformationField paymentInformationField = new PaymentInformationField("Payment information");
    paymentInformationField.addValueChangeListener(event -> {
      value.setText(
        event.getValue().getCardholderName() + " " +
        event.getValue().getCardNumber() + " " +
        event.getValue().getSecurityCode()
      );
    });

    value = new Span();
    Paragraph paragraph = new Paragraph(
      new Html("<span><b>Payment information:</b> </span>"),
      value
    );

    add(paymentInformationField, paragraph);
    // end::snippet[]
  }
  public static class Exporter extends DemoExporter<CustomFieldNativeInput> {} // hidden-source-line
}
