package com.vaadin.demo.component.dialog;

import com.vaadin.demo.DemoExporter; // hidden-source-line
import com.vaadin.demo.domain.DataService;
import com.vaadin.demo.domain.Person;
import com.vaadin.flow.component.button.Button;
import com.vaadin.flow.component.button.ButtonVariant;
import com.vaadin.flow.component.dialog.Dialog;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.formlayout.FormLayout;
import com.vaadin.flow.component.icon.Icon;
import com.vaadin.flow.component.textfield.EmailField;
import com.vaadin.flow.component.textfield.TextField;
import com.vaadin.flow.router.Route;

@Route("dialog-header")
public class DialogHeader extends Div {

    final Person user = DataService.getPeople().get(0);

    public DialogHeader() {
        Dialog dialog = new Dialog();
        dialog.getElement().setAttribute("aria-label", "Add note");

        FormLayout dialogLayout = createDialogLayout();
        dialog.add(dialogLayout);
        // tag::snippet1[]
        dialog.setHeaderTitle("User details");

        Button closeButton = new Button(new Icon("lumo", "cross"),
                (e) -> dialog.close());
        closeButton.addThemeVariants(ButtonVariant.TERTIARY);
        dialog.getHeader().add(closeButton);
        // end::snippet1[]

        Button button = new Button("Show dialog", e -> dialog.open());
        add(dialog, button);
    }

    private FormLayout createDialogLayout() {
        TextField nameField = new TextField("Name", user.getFullName(),
                "Full name");
        nameField.setReadOnly(true);
        nameField.getStyle().set("padding-top", "0");

        EmailField emailField = new EmailField("Email", user.getEmail());
        emailField.setPlaceholder("email@company.com");
        emailField.setReadOnly(true);

        String addressValue = String.format("%s, %s, %s",
                user.getAddress().getStreet(), user.getAddress().getCity(),
                user.getAddress().getCountry());
        TextField addressField = new TextField("Address", addressValue,
                "Street XX, City, Country");
        addressField.setReadOnly(true);

        FormLayout fieldLayout = new FormLayout(nameField, emailField,
                addressField);
        fieldLayout.setAutoResponsive(true);
        fieldLayout.setColumnWidth("18rem");
        fieldLayout.setExpandFields(true);

        return fieldLayout;
    }

    public static class Exporter extends DemoExporter<DialogHeader> { // hidden-source-line
    } // hidden-source-line
}
