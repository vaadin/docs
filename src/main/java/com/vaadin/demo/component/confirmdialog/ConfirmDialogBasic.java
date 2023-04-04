package com.vaadin.demo.component.confirmdialog;

import com.vaadin.flow.component.button.Button;
import com.vaadin.flow.component.confirmdialog.ConfirmDialog;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.html.Span;
import com.vaadin.flow.component.orderedlayout.FlexComponent;
import com.vaadin.flow.component.orderedlayout.HorizontalLayout;
import com.vaadin.flow.router.Route;
import com.vaadin.demo.DemoExporter; // hidden-source-line

@Route("confirm-dialog-basic")
public class ConfirmDialogBasic extends Div {

    private Span status;

    public ConfirmDialogBasic() {
        HorizontalLayout layout = new HorizontalLayout();
        layout.setAlignItems(FlexComponent.Alignment.CENTER);
        layout.setJustifyContentMode(FlexComponent.JustifyContentMode.CENTER);

        // tag::snippet[]
        status = new Span();
        status.setVisible(false);

        ConfirmDialog dialog = new ConfirmDialog();
        dialog.setHeader("Unsaved changes");
        dialog.setText(
                "There are unsaved changes. Do you want to discard or save them?");

        dialog.setCancelable(true);
        dialog.addCancelListener(event -> setStatus("Canceled"));

        dialog.setRejectable(true);
        dialog.setRejectText("Discard");
        dialog.addRejectListener(event -> setStatus("Discarded"));

        dialog.setConfirmText("Save");
        dialog.addConfirmListener(event -> setStatus("Saved"));

        Button button = new Button("Open confirm dialog");
        button.addClickListener(event -> {
            dialog.open();
            status.setVisible(false);
        });
        // end::snippet[]

        dialog.open();

        layout.add(button, status);
        add(layout);

        // Center the button within the example
        getStyle().set("position", "fixed").set("top", "0").set("right", "0")
                .set("bottom", "0").set("left", "0").set("display", "flex")
                .set("align-items", "center").set("justify-content", "center");
    }

    private void setStatus(String value) {
        status.setText("Status: " + value);
        status.setVisible(true);
    }

    public static class Exporter extends DemoExporter<ConfirmDialogBasic> { // hidden-source-line
    } // hidden-source-line
}
