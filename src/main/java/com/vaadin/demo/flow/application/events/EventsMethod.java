package com.vaadin.demo.flow.application.events;

import com.vaadin.demo.DemoExporter; // hidden-source-line
import com.vaadin.flow.component.ClickEvent;
import com.vaadin.flow.component.button.Button;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.orderedlayout.HorizontalLayout;
import com.vaadin.flow.router.Route;

@Route("application-events-method")
public class EventsMethod extends Div {
  private static final long serialVersionUID = 1L;

  public EventsMethod() {
        // tag::snippet[]
        class ButtonBar extends HorizontalLayout {
            public ButtonBar() {
              add(new Button("OK", this::ok));
              add(new Button("Cancel", this::cancel));
            }
            public void ok(ClickEvent<Button> event) {
              event.getSource().setText("OKed!");
            }
            public void cancel(ClickEvent<Button> event) {
              event.getSource().setText("Canceled!");
            }
        }

        add(new ButtonBar());
        // end::snippet[]
      }
    
      public static class Exporter extends DemoExporter<EventsMethod> { // hidden-source-line
      } // hidden-source-line    
}
