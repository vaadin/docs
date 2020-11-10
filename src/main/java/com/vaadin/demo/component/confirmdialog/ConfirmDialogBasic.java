package com.vaadin.demo.component.confirmdialog;

import com.vaadin.flow.component.Text;
import com.vaadin.flow.component.button.Button;
import com.vaadin.flow.component.confirmdialog.ConfirmDialog;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.router.Route;
import com.vaadin.demo.DemoExporter; // hidden-full-source-line

@Route("confirm-dialog-basic")
public class ConfirmDialogBasic extends Div {

  public ConfirmDialogBasic() {
    // tag::snippet[]
    Text status = new Text("");
    ConfirmDialog dialog = new ConfirmDialog("Meeting starting", "Your next meeting starts in 5 minutes", "OK",
        e -> status.setText("Confirmed"));

    Button button = new Button("Open dialog");
    button.addClickListener(event -> {
      dialog.open();
      status.setText("");
    });

    add(dialog, button, status);
    // end::snippet[]
  }

  public static class Exporter extends DemoExporter<ConfirmDialogBasic> { // hidden-full-source-line
  } // hidden-full-source-line
}
