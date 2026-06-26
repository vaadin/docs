package com.vaadin.demo.component.dialog;

import com.vaadin.flow.component.button.Button;
import com.vaadin.flow.component.button.ButtonVariant;
import com.vaadin.flow.component.dialog.Dialog;
import com.vaadin.flow.component.formlayout.FormLayout;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.textfield.TextField;
import com.vaadin.flow.router.Route;
import com.vaadin.demo.DemoExporter; // hidden-source-line

@Route("dialog-basic")
public class DialogBasic extends Div {

    public DialogBasic() {
        // tag::snippet[]
        Dialog dialog = new Dialog();

        dialog.setHeaderTitle("New employee");

        FormLayout dialogLayout = createDialogLayout();
        dialog.add(dialogLayout);

        Button saveButton = createSaveButton(dialog);
        Button cancelButton = new Button("Cancel", e -> dialog.close());
        dialog.getFooter().add(cancelButton);
        dialog.getFooter().add(saveButton);

        Button button = new Button("Show dialog", e -> dialog.open());

        add(dialog, button);
        // end::snippet[]

        dialog.open();

        // Center the button within the example
        getStyle().set("position", "fixed").set("top", "0").set("right", "0")
                .set("bottom", "0").set("left", "0").set("display", "flex")
                .set("align-items", "center").set("justify-content", "center");
    }

    private static FormLayout createDialogLayout() {

        TextField firstNameField = new TextField("First name");
        TextField lastNameField = new TextField("Last name");

        FormLayout dialogLayout = new FormLayout(firstNameField, lastNameField);
        dialogLayout.setAutoResponsive(true);
        dialogLayout.setColumnWidth("18rem");
        dialogLayout.setExpandFields(true);

        return dialogLayout;
    }

    private static Button createSaveButton(Dialog dialog) {
        Button saveButton = new Button("Add", e -> dialog.close());
        saveButton.addThemeVariants(ButtonVariant.PRIMARY);

        return saveButton;
    }

    public static class Exporter extends DemoExporter<DialogBasic> { // hidden-source-line
    } // hidden-source-line
}
