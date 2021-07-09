package com.vaadin.demo.component.button;

import com.vaadin.flow.component.button.Button;
import com.vaadin.flow.component.button.ButtonVariant;
import com.vaadin.flow.component.formlayout.FormLayout;
import com.vaadin.flow.component.formlayout.FormLayout.ResponsiveStep;
import com.vaadin.flow.component.orderedlayout.HorizontalLayout;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.component.textfield.EmailField;
import com.vaadin.flow.component.textfield.TextField;
import com.vaadin.flow.router.Route;
import com.vaadin.demo.DemoExporter; // hidden-source-line

@Route("button-form")
public class ButtonForm extends VerticalLayout {
    public ButtonForm() {
        // tag::snippet[]
        TextField firstNameField = new TextField("First name", "John", "");
        TextField lastNameField = new TextField("Last name", "Smith", "");
        EmailField emailField = new EmailField("Email address");
        emailField.setValue("john.smith@example.com");
        FormLayout formLayout = new FormLayout(firstNameField, lastNameField, emailField);
        formLayout.setResponsiveSteps(new ResponsiveStep("0", 2));
        formLayout.setColspan(emailField, 2);

        Button createAccount = new Button("Create account");
        createAccount.addThemeVariants(ButtonVariant.LUMO_PRIMARY);
        Button cancel = new Button("Cancel");

        HorizontalLayout buttonLayout = new HorizontalLayout(createAccount, cancel);
        // end::snippet[]

        setPadding(false);
        add(formLayout, buttonLayout);
    }

    public static class Exporter extends DemoExporter<ButtonForm> { // hidden-source-line
    } // hidden-source-line
}