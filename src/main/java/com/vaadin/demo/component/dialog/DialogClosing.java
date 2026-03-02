package com.vaadin.demo.component.dialog;

import com.vaadin.demo.DemoExporter; // hidden-source-line
import com.vaadin.flow.component.button.Button;
import com.vaadin.flow.component.dialog.Dialog;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.html.Paragraph;
import com.vaadin.flow.router.Route;

@Route("dialog-closing")
public class DialogClosing extends Div {

    public DialogClosing() {
        Dialog dialog = new Dialog();

        dialog.setHeaderTitle("System maintenance");

        Paragraph text = new Paragraph(
                "System maintenance will begin at 3 PM. It is schedule to conclude at 5PM. We apologize for any inconvenience.");
        text.getStyle().set("max-width", "300px");
        dialog.add(text);

        // tag::snippet[]
        Button closeButton = new Button("Close");
        closeButton.addClickListener(e -> dialog.close());
        // end::snippet[]
        dialog.getFooter().add(closeButton);

        Button button = new Button("Show dialog", e -> dialog.open());
        add(dialog, button);
    }

    public static class Exporter extends DemoExporter<DialogClosing> { // hidden-source-line
    } // hidden-source-line
}
