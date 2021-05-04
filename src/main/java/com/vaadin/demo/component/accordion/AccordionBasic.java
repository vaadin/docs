package com.vaadin.demo.component.accordion;

import com.vaadin.flow.component.accordion.Accordion;
import com.vaadin.flow.component.accordion.AccordionPanel;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.html.Span;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.router.Route;
import com.vaadin.demo.DemoExporter; // hidden-source-line

@Route("accordion-basic")
public class AccordionBasic extends Div {

  public AccordionBasic() {
    // tag::snippet[]
    Accordion accordion = new Accordion();

    Span name = new Span("Sophia Williams");
    Span email = new Span("sophia.williams@company.com");
    Span phone = new Span("(501) 555-9128");
    
    VerticalLayout personalInformationLayout = new VerticalLayout(name, email, phone);
    personalInformationLayout.setSpacing(false);
    personalInformationLayout.setPadding(false);

    accordion.add("Personal information", personalInformationLayout);
    // end::snippet[]

    Span street = new Span("4027 Amber Lake Canyon");
    Span zipCode = new Span("72333-5884 Cozy Nook");
    Span city = new Span("Arkansas");

    VerticalLayout billingAddressLayout = new VerticalLayout();
    billingAddressLayout.setSpacing(false);
    billingAddressLayout.setPadding(false);
    billingAddressLayout.add(street, zipCode, city);
    accordion.add("Billing address", billingAddressLayout);

    Span cardBrand = new Span("Mastercard");
    Span cardNumber = new Span("1234 5678 9012 3456");
    Span expiryDate = new Span("Expires 06/21");

    VerticalLayout paymentLayout = new VerticalLayout();
    paymentLayout.setSpacing(false);
    paymentLayout.setPadding(false);
    paymentLayout.add(cardBrand, cardNumber, expiryDate);
    accordion.add("Payment", paymentLayout);

    add(accordion);
  }

  public static class Exporter extends DemoExporter<AccordionBasic> { // hidden-source-line
  } // hidden-source-line
}
