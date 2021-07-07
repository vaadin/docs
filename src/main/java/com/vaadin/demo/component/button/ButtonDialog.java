package com.vaadin.demo.component.button;

import com.vaadin.flow.component.button.Button;
import com.vaadin.flow.component.formlayout.FormLayout;
import com.vaadin.flow.component.orderedlayout.HorizontalLayout;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.component.textfield.TextField;
import com.vaadin.flow.router.Route;
import static com.vaadin.flow.component.button.ButtonVariant.*;
import com.vaadin.demo.DemoExporter; // hidden-source-line

@Route("button-dialog")
public class ButtonDialog extends VerticalLayout {
    public ButtonDialog() {
        // tag::snippet[]
        TextField firstNameField = new TextField("First name", "John", "");
        TextField lastNameField = new TextField("Last name", "Smith", "");
        TextField emailField = new TextField("Email address", "john.smith@example.com", "");
        FormLayout formLayout = new FormLayout(firstNameField, lastNameField, emailField);
        formLayout.setResponsiveSteps(new FormLayout.ResponsiveStep("0", 2));
        formLayout.setColspan(emailField, 2);

        Button delete = new Button("Delete");
        delete.addThemeVariants(LUMO_ERROR);
        delete.getStyle().set("margin-inline-end", "auto");

        Button cancel = new Button("Cancel");

        Button createAccount = new Button("Create account");
        createAccount.addThemeVariants(LUMO_PRIMARY);

        HorizontalLayout horizontalLayout = new HorizontalLayout(delete, cancel, createAccount);
        horizontalLayout.getStyle().set("flex-wrap", "wrap");
        horizontalLayout.setJustifyContentMode(JustifyContentMode.END);
        // end::snippet[]
        setPadding(false);
        setAlignItems(Alignment.STRETCH);
        add(formLayout, horizontalLayout);
    }

    public static class Exporter extends DemoExporter<ButtonDialog> { // hidden-source-line
    } // hidden-source-line
}
