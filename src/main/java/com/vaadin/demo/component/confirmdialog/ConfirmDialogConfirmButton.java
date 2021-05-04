package com.vaadin.demo.component.confirmdialog;

import com.vaadin.flow.component.Html;
import com.vaadin.flow.component.button.Button;
import com.vaadin.flow.component.confirmdialog.ConfirmDialog;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.html.Span;
import com.vaadin.flow.component.orderedlayout.FlexComponent;
import com.vaadin.flow.component.orderedlayout.HorizontalLayout;
import com.vaadin.flow.router.Route;
import com.vaadin.demo.DemoExporter; // hidden-source-line

@Route("confirm-dialog-confirm-button")
public class ConfirmDialogConfirmButton extends Div {

  private Span status;

  public ConfirmDialogConfirmButton() {
    HorizontalLayout layout = new HorizontalLayout();
    layout.setAlignItems(FlexComponent.Alignment.CENTER);
    layout.setJustifyContentMode(FlexComponent.JustifyContentMode.CENTER);

    // tag::snippet[]
    status = new Span();
    status.setVisible(false);

    ConfirmDialog dialog = new ConfirmDialog();
    dialog.setHeader("Export failed");
    dialog.setText(
      new Html("<p>An error occurred while exporting <b>Report Q4</b>. Please try again. If the problem persists, please contact <a href=\"mailto:support@company.com\">support@company.com</a>.</p>")
    );

    dialog.setConfirmText("OK");
    dialog.addConfirmListener(event -> setStatus("Acknowledged"));

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
  public static class Exporter extends DemoExporter<ConfirmDialogConfirmButton> {} // hidden-source-line
}
