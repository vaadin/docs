package com.vaadin.demo.component.button;

import com.vaadin.flow.component.button.Button;
import com.vaadin.flow.component.button.ButtonVariant;
import com.vaadin.flow.component.formlayout.FormLayout;
import com.vaadin.flow.component.orderedlayout.HorizontalLayout;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.component.textfield.EmailField;
import com.vaadin.flow.component.textfield.TextField;
import com.vaadin.flow.router.Route;
import com.vaadin.demo.DemoExporter; // hidden-source-line

@Route("button-dialog")
public class ButtonDialog extends VerticalLayout {
    public ButtonDialog() {
        // tag::snippet[]
        TextField firstNameField = new TextField("First name", "John", "");
        TextField lastNameField = new TextField("Last name", "Smith", "");
        EmailField emailField = new EmailField("Email address");
        emailField.setValue("john.smith@example.com");
        FormLayout formLayout = new FormLayout(firstNameField, lastNameField, emailField);
        formLayout.setResponsiveSteps(new FormLayout.ResponsiveStep("0", 2));
        formLayout.setColspan(emailField, 2);

        Button delete = new Button("Delete");
        delete.addThemeVariants(ButtonVariant.LUMO_ERROR);
        delete.getStyle().set("margin-inline-end", "auto");

        Button cancel = new Button("Cancel");

        Button createAccount = new Button("Create account");
        createAccount.addThemeVariants(ButtonVariant.LUMO_PRIMARY);

        HorizontalLayout buttonLayout = new HorizontalLayout(delete, cancel, createAccount);
        buttonLayout.getStyle().set("flex-wrap", "wrap");
        buttonLayout.setJustifyContentMode(JustifyContentMode.END);
        // end::snippet[]

        setPadding(false);
        setAlignItems(Alignment.STRETCH);
        add(formLayout, buttonLayout);
    }

    public static class Exporter extends DemoExporter<ButtonDialog> { // hidden-source-line
    } // hidden-source-line
}
