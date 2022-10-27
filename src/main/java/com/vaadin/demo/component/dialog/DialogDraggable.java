package com.vaadin.demo.component.dialog;

import com.vaadin.demo.DemoExporter; // hidden-source-line
import com.vaadin.flow.component.button.Button;
import com.vaadin.flow.component.button.ButtonVariant;
import com.vaadin.flow.component.dialog.Dialog;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.html.H2;
import com.vaadin.flow.component.orderedlayout.FlexComponent;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.component.textfield.TextArea;
import com.vaadin.flow.component.textfield.TextField;
import com.vaadin.flow.router.Route;

@Route("dialog-draggable")
public class DialogDraggable extends Div {

    public DialogDraggable() {
        Dialog dialog = new Dialog();
        dialog.getElement().setAttribute("aria-label", "Add note");

        dialog.getHeader().add(createHeaderLayout());
        createFooter(dialog);

        VerticalLayout dialogLayout = createDialogLayout();
        dialog.add(dialogLayout);
        // tag::snippet1[]
        dialog.setModal(false);
        dialog.setDraggable(true);
        // end::snippet1[]

        Button button = new Button("Show dialog", e -> dialog.open());
        add(dialog, button);
    }

    private static H2 createHeaderLayout() {
        // tag::snippet2[]
        H2 headline = new H2("Add note");
        headline.addClassName("draggable");
        // end::snippet2[]
        headline.getStyle().set("margin", "0").set("font-size", "1.5em")
                .set("font-weight", "bold").set("cursor", "move")
                .set("padding", "var(--lumo-space-m) 0").set("flex", "1");

        return headline;
    }

    private static VerticalLayout createDialogLayout() {

        TextField titleField = new TextField("Title");
        TextArea descriptionArea = new TextArea("Description");
        VerticalLayout fieldLayout = new VerticalLayout(titleField,
                descriptionArea);
        fieldLayout.setSpacing(false);
        fieldLayout.setPadding(false);
        fieldLayout.setAlignItems(FlexComponent.Alignment.STRETCH);
        fieldLayout.getStyle().set("width", "300px").set("max-width", "100%");

        return fieldLayout;
    }

    private static void createFooter(Dialog dialog) {
        Button cancelButton = new Button("Cancel", e -> dialog.close());
        Button saveButton = new Button("Add note", e -> dialog.close());
        saveButton.addThemeVariants(ButtonVariant.LUMO_PRIMARY);

        dialog.getFooter().add(cancelButton);
        dialog.getFooter().add(saveButton);
    }

    public static class Exporter extends DemoExporter<DialogDraggable> { // hidden-source-line
    } // hidden-source-line
}
