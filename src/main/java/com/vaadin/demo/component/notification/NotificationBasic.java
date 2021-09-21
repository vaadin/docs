package com.vaadin.demo.component.notification;

import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.button.Button;
import com.vaadin.flow.component.notification.Notification;
import com.vaadin.flow.router.Route;

import com.vaadin.demo.DemoExporter; // hidden-source-line

@Route("notification-basic")
public class NotificationBasic extends Div {

  public NotificationBasic() {
    Button button = new Button("Try it");
    button.addClickListener(clickEvent -> {
      button.setEnabled(false);

      // tag::snippet[]
      // When creating a notification using the `show` static method,
      // the duration is 5-sec by default.
      Notification notification = Notification.show("Financial report generated");
      // end::snippet[]
      notification.setPosition(Notification.Position.MIDDLE);

      notification.addDetachListener(detachEvent -> button.setEnabled(true));
    });

    add(button);
  }

  public static class Exporter extends DemoExporter<NotificationBasic> { // hidden-source-line
  } // hidden-source-line
}
