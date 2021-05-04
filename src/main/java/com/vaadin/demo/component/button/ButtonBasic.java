package com.vaadin.demo.component.button;

import com.vaadin.flow.component.Text;
import com.vaadin.flow.component.button.Button;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.router.Route;
import com.vaadin.demo.DemoExporter; // hidden-source-line

@Route("button-basic")
public class ButtonBasic extends Div {

  public ButtonBasic() {
    // tag::snippet[]
    Button button = new Button("Button");
    Text clickedText = new Text("");
    button.addClickListener(e -> clickedText.setText("The button was clicked"));

    add(button, clickedText);
    // end::snippet[]
  }

  public static class Exporter extends DemoExporter<ButtonBasic> { // hidden-source-line
  } // hidden-source-line
}
