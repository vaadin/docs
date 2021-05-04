package com.vaadin.demo.component.confirmdialog;

import com.vaadin.demo.DemoExporter;
import com.vaadin.flow.component.button.Button;
import com.vaadin.flow.component.confirmdialog.ConfirmDialog;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.html.Span;
import com.vaadin.flow.component.orderedlayout.FlexComponent;
import com.vaadin.flow.component.orderedlayout.HorizontalLayout;
import com.vaadin.flow.router.Route;

@Route("confirm-dialog-reject-button")
public class ConfirmDialogRejectButton extends Div {

  private Span status;

  public ConfirmDialogRejectButton() {
    HorizontalLayout layout = new HorizontalLayout();
    layout.setAlignItems(FlexComponent.Alignment.CENTER);
    layout.setJustifyContentMode(FlexComponent.JustifyContentMode.CENTER);

    // tag::snippet[]
    status = new Span();
    status.setVisible(false);

    ConfirmDialog dialog = new ConfirmDialog();
    dialog.setHeader("Unsaved changes");
    dialog.setText("Do you want to discard or save your changes before navigating away?");

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

    layout.add(button, status);
    add(layout);
  }

  private void setStatus(String value) {
    status.setText("Status: " + value);
    status.setVisible(true);
  }
  public static class Exporter extends DemoExporter<ConfirmDialogRejectButton> {} // hidden-source-line
}
