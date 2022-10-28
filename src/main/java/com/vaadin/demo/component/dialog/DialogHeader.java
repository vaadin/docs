package com.vaadin.demo.component.dialog;

import com.vaadin.demo.DemoExporter; // hidden-source-line
import com.vaadin.demo.domain.DataService;
import com.vaadin.demo.domain.Person;
import com.vaadin.flow.component.button.Button;
import com.vaadin.flow.component.button.ButtonVariant;
import com.vaadin.flow.component.dialog.Dialog;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.icon.Icon;
import com.vaadin.flow.component.orderedlayout.FlexComponent;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.component.textfield.EmailField;
import com.vaadin.flow.component.textfield.TextField;
import com.vaadin.flow.router.Route;

@Route("dialog-header")
public class DialogHeader extends Div {

    final Person user = DataService.getPeople().get(0);

    public DialogHeader() {
        Dialog dialog = new Dialog();
        dialog.getElement().setAttribute("aria-label", "Add note");

        VerticalLayout dialogLayout = createDialogLayout(dialog);
        dialog.add(dialogLayout);
        // tag::snippet1[]
        dialog.setHeaderTitle("User details");

        Button closeButton = new Button(new Icon("lumo", "cross"),
                (e) -> dialog.close());
        closeButton.addThemeVariants(ButtonVariant.LUMO_TERTIARY);
        dialog.getHeader().add(closeButton);
        // end::snippet1[]

        Button button = new Button("Show dialog", e -> dialog.open());
        add(dialog, button);
    }

    private VerticalLayout createDialogLayout(Dialog dialog) {
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

        VerticalLayout fieldLayout = new VerticalLayout(nameField, emailField,
                addressField);
        fieldLayout.setSpacing(false);
        fieldLayout.setPadding(false);
        fieldLayout.setAlignItems(FlexComponent.Alignment.STRETCH);
        fieldLayout.getStyle().set("width", "300px").set("max-width", "100%");

        return fieldLayout;
    }

    public static class Exporter extends DemoExporter<DialogHeader> { // hidden-source-line
    } // hidden-source-line
}
