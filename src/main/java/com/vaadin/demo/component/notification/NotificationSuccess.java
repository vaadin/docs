package com.vaadin.demo.component.notification;

import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.button.Button;
import com.vaadin.flow.component.notification.Notification;
import com.vaadin.flow.component.notification.NotificationVariant;
import com.vaadin.flow.router.Route;
import com.vaadin.demo.DemoExporter; // hidden-source-line

@Route("notification-success")
public class NotificationSuccess extends Div {

  public NotificationSuccess() {
    Button button = new Button("Try it");
    button.addClickListener(clickEvent -> {
      button.setEnabled(false);

      // tag::snippet[]
      Notification notification = Notification.show("Application submitted!");
      notification.addThemeVariants(NotificationVariant.LUMO_SUCCESS);
      // end::snippet[]
      notification.setPosition(Notification.Position.MIDDLE);

      notification.addDetachListener(detachEvent -> button.setEnabled(true));
    });

    add(button);
  }

  public static class Exporter extends DemoExporter<NotificationSuccess> { // hidden-source-line
  } // hidden-source-line
}
