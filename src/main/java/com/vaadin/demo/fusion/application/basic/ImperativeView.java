package com.vaadin.demo.flow.application.events;

import com.vaadin.demo.DemoExporter; // hidden-source-line
import com.vaadin.flow.component.button.Button;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.html.Span;
import com.vaadin.flow.router.Route;

// tag::snippet[]
@Route("imperative-view")
public class ImperativeView extends Div {
  int count = 0;

  public ImperativeView() {
    Span text = new Span("Never clicked before");

    Button button = new Button("Click me!", event -> {
        count++;
        text.setText("The button has been clicked " +
                     count + " times");
      });

    add(new Div(text), button);
  }
  public static class Exporter extends DemoExporter<ImperativeView> { // hidden-source-line
  } // hidden-source-line    
}
// end::snippet[]
