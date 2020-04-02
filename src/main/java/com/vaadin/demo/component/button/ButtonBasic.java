package com.vaadin.demo.component.button;

import com.vaadin.flow.component.Text;
import com.vaadin.flow.component.button.Button;
import com.vaadin.flow.component.html.Div;
import com.vaadin.demo.DemoExporter; // hidden-full-source-line

public class ButtonBasic extends Div {

  public ButtonBasic() {
    // tag::snippet[]
    Button button = new Button("Button");
    Text clickedText = new Text("");
    button.addClickListener(e -> clickedText.setText("The button was clicked"));

    add(button, clickedText);
    // end::snippet[]
  }

  public static class GridEditorExporter extends DemoExporter<ButtonBasic> { // hidden-full-source-line
  } // hidden-full-source-line
}
