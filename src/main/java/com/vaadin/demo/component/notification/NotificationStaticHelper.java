package com.vaadin.demo.component.notification;

import com.vaadin.demo.DemoExporter;
import com.vaadin.flow.component.button.Button;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.notification.Notification;
import com.vaadin.flow.router.Route;

@Route("notification-static-helper")
public class NotificationStaticHelper extends Div {

  public NotificationStaticHelper() {
    Button button = new Button("Show text notification");
    button.addClickListener(clickEvent -> {
      // tag::snippet[]
      // Show a simple text-based notification
      Notification notification = Notification.show("Financial report generated");
      notification.setPosition(Notification.Position.MIDDLE);
      // end::snippet[]
    });

    add(button);
  }

  public static class Exporter extends DemoExporter<NotificationStaticHelper> { // hidden-source-line
  } // hidden-source-line
}
