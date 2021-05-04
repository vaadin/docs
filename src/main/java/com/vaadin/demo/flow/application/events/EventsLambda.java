package com.vaadin.demo.flow.application.events;

import com.vaadin.demo.DemoExporter; // hidden-source-line
import com.vaadin.flow.component.button.Button;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.router.Route;

@Route("application-events-lambda")
public class EventsLambda extends Div {
  private static final long serialVersionUID = 1L;

  public EventsLambda() {
        // tag::snippet[]
        Button button = new Button("Click me!",
          event -> event.getSource().setText("Clicked!!!"));
        add(button);
        // end::snippet[]
      }
    
      public static class Exporter extends DemoExporter<EventsLambda> { // hidden-source-line
      } // hidden-source-line    
}
