package com.vaadin.demo.component.dialog;

import com.vaadin.demo.DemoExporter; // hidden-source-line
import com.vaadin.demo.domain.DataService;
import com.vaadin.demo.domain.Person;
import com.vaadin.flow.component.button.Button;
import com.vaadin.flow.component.button.ButtonVariant;
import com.vaadin.flow.component.dialog.Dialog;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.router.Route;

@Route("dialog-footer")
public class DialogFooter extends Div {

    final Person user = DataService.getPeople().get(0);

    public DialogFooter() {
        Dialog dialog = new Dialog();

        dialog.setHeaderTitle(
                String.format("Delete user \"%s\"?", user.getFullName()));
        dialog.add("Are you sure you want to delete this user permanently?");

        // tag::snippet1[]
        Button deleteButton = new Button("Delete", (e) -> dialog.close());
        deleteButton.addThemeVariants(ButtonVariant.LUMO_PRIMARY,
                ButtonVariant.LUMO_ERROR);
        deleteButton.getStyle().set("margin-right", "auto");
        dialog.getFooter().add(deleteButton);

        Button cancelButton = new Button("Cancel", (e) -> dialog.close());
        cancelButton.addThemeVariants(ButtonVariant.LUMO_TERTIARY);
        dialog.getFooter().add(cancelButton);
        // end::snippet1[]

        Button button = new Button("Show dialog", e -> dialog.open());
        add(dialog, button);
    }

    public static class Exporter extends DemoExporter<DialogFooter> { // hidden-source-line
    } // hidden-source-line
}
