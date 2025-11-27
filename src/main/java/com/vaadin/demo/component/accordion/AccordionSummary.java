package com.vaadin.demo.component.accordion;

import com.vaadin.flow.component.accordion.Accordion;
import com.vaadin.flow.component.accordion.AccordionPanel;
import com.vaadin.flow.component.button.Button;
import com.vaadin.flow.component.button.ButtonVariant;
import com.vaadin.flow.component.combobox.ComboBox;
import com.vaadin.flow.component.formlayout.FormLayout;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.icon.Icon;
import com.vaadin.flow.component.icon.VaadinIcon;
import com.vaadin.flow.component.orderedlayout.FlexComponent;
import com.vaadin.flow.component.orderedlayout.HorizontalLayout;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.component.textfield.EmailField;
import com.vaadin.flow.component.textfield.TextField;
import com.vaadin.flow.router.Route;
import com.vaadin.demo.domain.Country;
import com.vaadin.demo.domain.DataService;
import com.vaadin.demo.DemoExporter; // hidden-source-line

@Route("accordion-summary")
public class AccordionSummary extends Div {

    private static final String PAYMENT = "Payment";
    private static final String BILLING_ADDRESS = "Billing address";
    private static final String CUSTOMER_DETAILS = "Customer details";

    public AccordionSummary() {
        Accordion accordion = new Accordion();

        FormLayout customerDetailsFormLayout = createFormLayout();
        VerticalLayout customerDetailsLayout = new VerticalLayout(customerDetailsFormLayout);
        customerDetailsLayout.setPadding(false);
        AccordionPanel customDetailsPanel = accordion.add(CUSTOMER_DETAILS,
                customerDetailsLayout);

        FormLayout billingAddressFormLayout = createFormLayout();
        VerticalLayout billingAddressLayout = new VerticalLayout(billingAddressFormLayout);
        billingAddressLayout.setPadding(false);
        AccordionPanel billingAddressPanel = accordion.add(BILLING_ADDRESS,
                billingAddressLayout);

        FormLayout paymentFormLayout = createFormLayout();
        VerticalLayout paymentLayout = new VerticalLayout(paymentFormLayout);
        paymentLayout.setPadding(false);
        AccordionPanel paymentPanel = accordion.add(PAYMENT, paymentLayout);

        // Customer details fields

        TextField firstName = new TextField("First name");
        TextField lastName = new TextField("Last name");
        EmailField email = new EmailField("Email address");
        TextField phone = new TextField("Phone number");

        customerDetailsFormLayout.add(firstName, lastName);
        customerDetailsFormLayout.add(email, 2);
        customerDetailsFormLayout.add(phone, 2);

        // tag::snippet[]
        Button customDetailsButton = new Button("Continue",
                (e) -> {
                    billingAddressPanel.setOpened(true);
                    customDetailsPanel.setSummary(createCompletedSummary(CUSTOMER_DETAILS));
                });
        // end::snippet[]
        customDetailsButton.addThemeVariants(ButtonVariant.LUMO_PRIMARY);
        customerDetailsLayout.add(customDetailsButton);

        // Billing address fields

        TextField address = new TextField("Address");
        TextField zipCode = new TextField("ZIP code");
        TextField city = new TextField("City");
        ComboBox<Country> countries = new ComboBox<>("Country");
        countries.setItems(DataService.getCountries());
        countries.setItemLabelGenerator(Country::getName);

        billingAddressFormLayout.add(address, 2);
        billingAddressFormLayout.add(zipCode, city, countries);

        Button billingAddressButton = new Button("Continue",
                (e) -> {
                    paymentPanel.setOpened(true);
                    billingAddressPanel.setSummary(createCompletedSummary(BILLING_ADDRESS));
                });
        billingAddressButton.addThemeVariants(ButtonVariant.LUMO_PRIMARY);
        billingAddressLayout.add(billingAddressButton);

        // Payment fields

        TextField accountNumber = new TextField("Card number");
        TextField expiryDate = new TextField("Expiry date");
        TextField cvv = new TextField("CVV");

        paymentFormLayout.add(accountNumber, 2);
        paymentFormLayout.add(expiryDate, cvv);

        Button paymentButton = new Button("Finish",
                (e) -> {
                    paymentPanel.setOpened(false);
                    paymentPanel.setSummary(createCompletedSummary(PAYMENT));
                });
        paymentButton.addThemeVariants(ButtonVariant.LUMO_PRIMARY);
        paymentLayout.add(paymentButton);

        add(accordion);
    }

    private FormLayout createFormLayout() {
        FormLayout billingAddressFormLayout = new FormLayout();
        billingAddressFormLayout.setResponsiveSteps(
                new FormLayout.ResponsiveStep("0", 1),
                new FormLayout.ResponsiveStep("20em", 2));
        return billingAddressFormLayout;
    }
    // tag::snippet[]

    private HorizontalLayout createCompletedSummary(String title) {
        HorizontalLayout layout = new HorizontalLayout();
        layout.setSpacing(true);
        layout.setAlignItems(FlexComponent.Alignment.CENTER);

        layout.add(title);
        
        Icon icon = VaadinIcon.CHECK.create();
        icon.getStyle().set("color", "var(--aura-green-text)");
        icon.getStyle().set("--vaadin-icon-size", "1rem");
        layout.add(icon);

        return layout;
    }
    // end::snippet[]

    public static class Exporter extends DemoExporter<AccordionSummary> { // hidden-source-line
    } // hidden-source-line
}
