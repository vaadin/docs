package com.vaadin.demo.component.accordion;

import com.vaadin.flow.component.accordion.Accordion;
import com.vaadin.flow.component.accordion.AccordionPanel;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.html.Span;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.component.textfield.TextField;
import com.vaadin.flow.router.Route;
import com.vaadin.demo.DemoExporter; // hidden-full-source-line

@Route("accordion-reverse-panels")
public class AccordionReversePanels extends Div {

    public AccordionReversePanels() {
        // tag::snippet[]
        Accordion accordion = new Accordion();

        VerticalLayout personalInformationLayout = new VerticalLayout();
        personalInformationLayout.add(new TextField("Name"), new TextField("Phone"), new TextField("Email"));
        accordion.add("Personal Information", personalInformationLayout);

        VerticalLayout billingAddressLayout = new VerticalLayout();
        billingAddressLayout.add(new TextField("Address"), new TextField("City"), new TextField("State"),
                new TextField("Zip Code"));
        accordion.add("Billing Address", billingAddressLayout);

        VerticalLayout paymentLayout = new VerticalLayout();
        paymentLayout.add(new Span("Not yet implemented"));
        AccordionPanel billingAddressPanel = accordion.add("Payment", paymentLayout);
        billingAddressPanel.setEnabled(false);

        add(accordion);
        // end::snippet[]
    }

    public static class Exporter extends DemoExporter<AccordionReversePanels> { // hidden-full-source-line
    } // hidden-full-source-line
}
