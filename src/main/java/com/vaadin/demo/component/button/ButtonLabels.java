package com.vaadin.demo.component.button;

import com.vaadin.flow.component.button.Button;
import com.vaadin.flow.component.orderedlayout.FlexComponent;
import com.vaadin.flow.component.orderedlayout.HorizontalLayout;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.component.textfield.EmailField;
import com.vaadin.flow.router.Route;
import com.vaadin.demo.DemoExporter; // hidden-source-line

@Route("button-labels")
public class ButtonLabels extends VerticalLayout {
    public ButtonLabels() {
        EmailField emailField = new EmailField("Primary email address");
        emailField.setValue("foo@example.com");

        EmailField secondaryEmailField = new EmailField("Secondary email address");
        secondaryEmailField.setValue("bar@example.com");

        // tag::snippet[]
        Button clearPrimaryEmail = new Button("Remove", event -> {
            emailField.setValue("");
        });
        clearPrimaryEmail.getElement().setAttribute("aria-label", "Remove primary email address");

        Button clearSecondaryEmail = new Button("Remove", event -> {
            secondaryEmailField.setValue("");
        });
        clearSecondaryEmail.getElement().setAttribute("aria-label", "Remove secondary email address");
        // end::snippet[]

        HorizontalLayout horizontalLayout1 = new HorizontalLayout(emailField, clearPrimaryEmail);
        HorizontalLayout horizontalLayout2 = new HorizontalLayout(secondaryEmailField, clearSecondaryEmail);
        horizontalLayout1.setAlignItems(FlexComponent.Alignment.BASELINE);
        horizontalLayout2.setAlignItems(FlexComponent.Alignment.BASELINE);
        horizontalLayout2.getStyle().set("margin-top", "0");
        setPadding(false);
        add(horizontalLayout1, horizontalLayout2);
    }

    public static class Exporter extends DemoExporter<ButtonLabels> { // hidden-source-line
    } // hidden-source-line
}