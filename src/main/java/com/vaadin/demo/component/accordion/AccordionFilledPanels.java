package com.vaadin.demo.component.accordion;

import com.vaadin.flow.component.accordion.Accordion;
import com.vaadin.flow.component.accordion.AccordionPanel;
import com.vaadin.flow.component.details.DetailsVariant;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.html.Span;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.router.Route;
import com.vaadin.demo.DemoExporter; // hidden-source-line

@Route("accordion-filled-panels")
public class AccordionFilledPanels extends Div {

    public AccordionFilledPanels() {
        // tag::snippet[]
        Accordion accordion = new Accordion();
        // end::snippet[]

        Span name = new Span("Sophia Williams");
        Span email = new Span("sophia.williams@company.com");
        Span phone = new Span("(501) 555-9128");

        VerticalLayout personalInformationLayout = new VerticalLayout(name, email, phone);
        personalInformationLayout.setSpacing(false);
        personalInformationLayout.setPadding(false);

        // tag::snippet[]
        AccordionPanel personalInfoPanel = accordion.add("Personal information", personalInformationLayout);
        personalInfoPanel.addThemeVariants(DetailsVariant.FILLED);
        // end::snippet[]

        Span street = new Span("4027 Amber Lake Canyon");
        Span zipCode = new Span("72333-5884 Cozy Nook");
        Span city = new Span("Arkansas");

        VerticalLayout billingAddressLayout = new VerticalLayout();
        billingAddressLayout.setSpacing(false);
        billingAddressLayout.setPadding(false);
        billingAddressLayout.add(street, zipCode, city);
        
        AccordionPanel billingAddressPanel = accordion.add("Billing address", billingAddressLayout);
        billingAddressPanel.addThemeVariants(DetailsVariant.FILLED);

        Span cardBrand = new Span("Mastercard");
        Span cardNumber = new Span("1234 5678 9012 3456");
        Span expiryDate = new Span("Expires 06/21");

        VerticalLayout paymentLayout = new VerticalLayout();
        paymentLayout.setSpacing(false);
        paymentLayout.setPadding(false);
        paymentLayout.add(cardBrand, cardNumber, expiryDate);
        
        AccordionPanel paymentPanel = accordion.add("Payment", paymentLayout);
        paymentPanel.addThemeVariants(DetailsVariant.FILLED);

        add(accordion);
    }

    public static class Exporter extends DemoExporter<AccordionFilledPanels> { // hidden-source-line
    } // hidden-source-line
}
