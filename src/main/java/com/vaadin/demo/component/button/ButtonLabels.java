package com.vaadin.demo.component.button;

import com.vaadin.flow.component.button.Button;
import com.vaadin.flow.component.orderedlayout.FlexComponent;
import com.vaadin.flow.component.orderedlayout.HorizontalLayout;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.component.textfield.TextField;
import com.vaadin.flow.router.Route;
import com.vaadin.demo.DemoExporter; // hidden-source-line

@Route("button-labels")
public class ButtonLabels extends VerticalLayout {
    private String primaryEmail = "foo@example.com";
    private String secondaryEmail = "bar@example.com";

    public ButtonLabels() {
        // tag::snippet[]
        TextField emailField = new TextField("Primary email address", primaryEmail, changeEvent -> {
            primaryEmail = changeEvent.getValue();
        });
        emailField.setId("primary-email");
        Button clearPrimaryEmail = new Button("Remove", clickEvent -> {
            primaryEmail = "";
            emailField.setValue(primaryEmail);
        });
        clearPrimaryEmail.getElement().setAttribute("aria-label", "Remove primary email address");

        TextField secondaryEmailField = new TextField("Secondary email address", secondaryEmail, changeEvent -> {
            secondaryEmail = changeEvent.getValue();
        });
        secondaryEmailField.setId("secondary-email");
        Button clearSecondaryEmail = new Button("Remove", clickEvent -> {
            secondaryEmail = "";
            secondaryEmailField.setValue(secondaryEmail);
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