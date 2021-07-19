package com.vaadin.demo.component.notification;

import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.button.Button;
import com.vaadin.flow.component.notification.Notification;
import com.vaadin.flow.component.notification.NotificationVariant;
import com.vaadin.flow.router.Route;
import com.vaadin.demo.DemoExporter; // hidden-source-line

@Route("notification-primary")
public class NotificationPrimary extends Div {

  public NotificationPrimary() {
    Button button = new Button("Try it");
    button.addClickListener(clickEvent -> {
      button.setEnabled(false);

      // tag::snippet[]
      Notification notification = Notification.show("New project plan available");
      notification.addThemeVariants(NotificationVariant.LUMO_PRIMARY);
      // end::snippet[]
      notification.setPosition(Notification.Position.MIDDLE);

      notification.addDetachListener(detachEvent -> button.setEnabled(true));
    });

    add(button);
  }

  public static class Exporter extends DemoExporter<NotificationPrimary> { // hidden-source-line
  } // hidden-source-line
}
