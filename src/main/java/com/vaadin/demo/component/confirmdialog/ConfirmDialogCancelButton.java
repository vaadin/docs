package com.vaadin.demo.component.confirmdialog;

import com.vaadin.demo.DemoExporter;
import com.vaadin.flow.component.button.Button;
import com.vaadin.flow.component.confirmdialog.ConfirmDialog;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.html.Span;
import com.vaadin.flow.component.orderedlayout.FlexComponent;
import com.vaadin.flow.component.orderedlayout.HorizontalLayout;
import com.vaadin.flow.router.Route;

@Route("confirm-dialog-cancel-button")
public class ConfirmDialogCancelButton extends Div {

  private Span status;

  public ConfirmDialogCancelButton() {
    HorizontalLayout layout = new HorizontalLayout();
    layout.setAlignItems(FlexComponent.Alignment.CENTER);
    layout.setJustifyContentMode(FlexComponent.JustifyContentMode.CENTER);

    // tag::snippet[]
    status = new Span();
    status.setVisible(false);

    ConfirmDialog dialog = new ConfirmDialog();
    dialog.setHeader("Delete \"Report Q4\"?");
    dialog.setText("Are you sure you want to permanently delete this item?");

    dialog.setCancelable(true);
    dialog.addCancelListener(event -> setStatus("Canceled"));

    dialog.setConfirmText("Delete");
    dialog.setConfirmButtonTheme("error primary");
    dialog.addConfirmListener(event -> setStatus("Deleted"));

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
  public static class Exporter extends DemoExporter<ConfirmDialogCancelButton> {} // hidden-source-line
}
