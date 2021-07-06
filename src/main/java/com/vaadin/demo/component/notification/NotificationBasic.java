package com.vaadin.demo.component.notification;

import com.vaadin.flow.component.Text;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.button.Button;
import com.vaadin.flow.component.notification.Notification;
import com.vaadin.flow.router.Route;
import com.vaadin.demo.DemoExporter; // hidden-source-line

@Route("notification-basic")
public class NotificationBasic extends Div {

  public NotificationBasic() {
    // tag::snippet[]
    Notification notification = new Notification();
    notification.setPosition(Notification.Position.MIDDLE);
    notification.add(
      new Div(new Text("Content")),
      new Button("Click me!")
    );

    Button button = new Button("Try it");
    button.addClickListener(event -> {
      notification.setOpened(true);
    });

    notification.addOpenedChangeListener(event -> {
      button.setEnabled(!event.getSource().isOpened());
    });

    add(button, notification);
    // end::snippet[]
  }

  public static class Exporter extends DemoExporter<NotificationBasic> { // hidden-source-line
  } // hidden-source-line
}
