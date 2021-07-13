package com.vaadin.demo.component.notification;

import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.button.Button;
import com.vaadin.flow.component.notification.Notification;
import com.vaadin.flow.component.notification.Notification.Position;
import com.vaadin.flow.router.Route;

import com.vaadin.demo.DemoExporter; // hidden-source-line

@Route("notification-position")
public class NotificationPosition extends Div {

  public NotificationPosition() {
    setClassName("notification-position-example");

    // tag::snippet[]
    add(
      createButton(Position.TOP_STRETCH),
      createButton(Position.TOP_START),
      createButton(Position.TOP_CENTER),
      createButton(Position.TOP_END),
      createButton(Position.MIDDLE),
      createButton(Position.BOTTOM_START),
      createButton(Position.BOTTOM_CENTER),
      createButton(Position.BOTTOM_END),
      createButton(Position.BOTTOM_STRETCH)
    );
    // end::snippet[]
  }

  // tag::createButton[]
  private Button createButton(Notification.Position position) {
    Button button = new Button(position.getClientName());
    button.addClickListener(event -> show(position));
    return button;
  }
  // end::createButton[]

  // tag::show[]
  private void show(Notification.Position position) {
    Notification.show(position.getClientName(), 5000, position);
  }
  // end::show[]

  public static class Exporter extends DemoExporter<NotificationPosition> { // hidden-source-line
  } // hidden-source-line
}
