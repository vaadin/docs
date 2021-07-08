package com.vaadin.demo.component.dialog;

import com.vaadin.demo.DemoExporter; // hidden-source-line
import com.vaadin.flow.component.button.Button;
import com.vaadin.flow.component.button.ButtonVariant;
import com.vaadin.flow.component.dialog.Dialog;
import com.vaadin.flow.component.dialog.DialogVariant;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.html.H2;
import com.vaadin.flow.component.orderedlayout.FlexComponent;
import com.vaadin.flow.component.orderedlayout.HorizontalLayout;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.component.textfield.TextField;
import com.vaadin.flow.router.Route;

@Route("dialog-draggable")
public class DialogDraggable extends Div {

    public DialogDraggable() {
        Dialog dialog = new Dialog();

        Div dialogContent = createDialogContent(dialog::close);
        dialog.add(dialogContent);
        // tag::snippet1[]
        dialog.setModal(false);
        dialog.setDraggable(true);
        // end::snippet1[]
        dialog.addThemeVariants(DialogVariant.LUMO_NO_PADDING);

        Button button = new Button("Show dialog", e -> dialog.open());
        add(dialog, button);
    }

    private static Div createDialogContent(Runnable closeHandler) {
        H2 headline = new H2("New employee");
        headline.getStyle().set("margin", "0").set("font-size", "1.5em")
                .set("font-weight", "bold");
        // tag::snippet2[]
        HorizontalLayout header = new HorizontalLayout(headline);
        header.getElement().getClassList().add("draggable");
        // end::snippet2[]
        header.setPadding(true);
        header.setSpacing(false);
        header.getStyle()
                .set("border-bottom", "1px solid var(--lumo-contrast-20pct)")
                .set("cursor", "move");

        TextField firstNameField = new TextField("First name");
        TextField lastNameField = new TextField("Last name");
        VerticalLayout fieldLayout = new VerticalLayout(firstNameField,
                lastNameField);
        fieldLayout.setSpacing(false);
        fieldLayout.setPadding(false);
        fieldLayout.setAlignItems(FlexComponent.Alignment.STRETCH);

        Button cancelButton = new Button("Cancel", e -> closeHandler.run());
        Button saveButton = new Button("Save", e -> closeHandler.run());
        saveButton.addThemeVariants(ButtonVariant.LUMO_PRIMARY);
        HorizontalLayout buttonLayout = new HorizontalLayout(cancelButton,
                saveButton);
        buttonLayout
                .setJustifyContentMode(FlexComponent.JustifyContentMode.END);

        VerticalLayout contentLayout = new VerticalLayout(header, fieldLayout,
                buttonLayout);
        contentLayout.setAlignItems(FlexComponent.Alignment.STRETCH);
        contentLayout.getStyle().set("width", "300px").set("max-width", "100%");

        return new Div(header, contentLayout);
    }

    public static class Exporter // hidden-source-line
            extends DemoExporter<DialogDraggable> { // hidden-source-line
    } // hidden-source-line
}
