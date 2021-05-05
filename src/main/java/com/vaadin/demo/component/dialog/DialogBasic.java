package com.vaadin.demo.component.dialog;

import com.vaadin.flow.component.Text;
import com.vaadin.flow.component.button.Button;
import com.vaadin.flow.component.dialog.Dialog;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.router.Route;
import com.vaadin.demo.DemoExporter; // hidden-source-line

@Route("dialog-basic")
public class DialogBasic extends Div {

  public DialogBasic() {
    // tag::snippet[]
    Dialog dialog = new Dialog();
    dialog.add(new Text("This simple dialog will close by pressing the Esc key, or by a mouse click anywhere outside the dialog area"));

    Button button = new Button("Show dialog", e -> dialog.open());
    add(dialog, button);
    // end::snippet[]
  }

  public static class Exporter extends DemoExporter<DialogBasic> { // hidden-source-line
  } // hidden-source-line
}
