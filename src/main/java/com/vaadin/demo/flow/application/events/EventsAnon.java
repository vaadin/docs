package com.vaadin.demo.flow.application.events;

import com.vaadin.demo.DemoExporter; // hidden-source-line
import com.vaadin.flow.component.ClickEvent;
import com.vaadin.flow.component.ComponentEventListener;
import com.vaadin.flow.component.button.Button;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.router.Route;

@Route("application-events-anon")
public class EventsAnon extends Div {
  private static final long serialVersionUID = 1L;

  public EventsAnon() {
        // tag::snippet[]
        Button button = new Button("Click me!",
            new ComponentEventListener<ClickEvent<Button>> () {
            int count = 0;
            @Override
              public void onComponentEvent(ClickEvent<Button> event) {
                event.getSource().setText("You have clicked the button " +
                                          (++count) + " times");
              }
        });

        add(button);
        // end::snippet[]
      }
    
      public static class Exporter extends DemoExporter<EventsAnon> { // hidden-source-line
      } // hidden-source-line    
}
