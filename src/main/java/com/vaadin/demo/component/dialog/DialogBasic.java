package com.vaadin.demo.component.dialog;

import com.vaadin.flow.component.button.Button;
import com.vaadin.flow.component.button.ButtonVariant;
import com.vaadin.flow.component.dialog.Dialog;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.html.H2;
import com.vaadin.flow.component.orderedlayout.FlexComponent;
import com.vaadin.flow.component.orderedlayout.HorizontalLayout;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.component.textfield.TextField;
import com.vaadin.flow.router.Route;
import com.vaadin.demo.DemoExporter; // hidden-source-line

@Route("dialog-basic")
public class DialogBasic extends Div {

    public DialogBasic() {
        // tag::snippet[]
        Dialog dialog = new Dialog();

        VerticalLayout dialogLayout = createDialogLayout(dialog);
        dialog.add(dialogLayout);

        Button button = new Button("Show dialog", e -> dialog.open());

        add(dialog, button);
        // end::snippet[]

        dialog.open();

        // Center the button within the example
        getStyle().set("position", "fixed").set("top","0").set("right", "0")
                .set("bottom", "0").set("left", "0").set("display", "flex")
                .set("align-items", "center").set("justify-content", "center");
    }

    private static VerticalLayout createDialogLayout(Dialog dialog) {
        dialog.getElement().setAttribute("aria-label", "New employee");

        H2 headline = new H2("New employee");
        headline.getStyle().set("margin-top", "0");

        TextField firstNameField = new TextField("First name");
        TextField lastNameField = new TextField("Last name");

        Button cancelButton = new Button("Cancel", e -> dialog.close());
        Button saveButton = new Button("Add", e -> dialog.close());
        saveButton.addThemeVariants(ButtonVariant.LUMO_PRIMARY);
        HorizontalLayout buttonLayout = new HorizontalLayout(cancelButton,
                saveButton);
        buttonLayout
                .setJustifyContentMode(FlexComponent.JustifyContentMode.END);
        buttonLayout.getStyle().set("margin-top", "var(--lumo-space-m)");

        VerticalLayout dialogLayout = new VerticalLayout(headline, firstNameField,
                lastNameField,
                buttonLayout);
        dialogLayout.setPadding(false);
        dialogLayout.setSpacing(false);
        dialogLayout.setAlignItems(FlexComponent.Alignment.STRETCH);
        dialogLayout.getStyle().set("width", "18rem").set("max-width", "100%");

        return dialogLayout;
    }

    public static class Exporter extends DemoExporter<DialogBasic> {} // hidden-source-line
}
