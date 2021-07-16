package com.vaadin.demo.component.notification;

import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.html.Anchor;
import com.vaadin.flow.component.Text;
import com.vaadin.flow.component.button.Button;
import com.vaadin.flow.component.button.ButtonVariant;
import com.vaadin.flow.component.icon.Icon;
import com.vaadin.flow.component.notification.Notification;
import com.vaadin.flow.component.orderedlayout.HorizontalLayout;
import com.vaadin.flow.component.orderedlayout.FlexComponent.Alignment;
import com.vaadin.flow.router.Route;
import com.vaadin.demo.DemoExporter; // hidden-source-line

@Route("notification-link")
public class NotificationLink extends Div {

  public NotificationLink() {
    Button button = new Button("Try it");
    button.addClickListener(clickEvent -> {
      button.setEnabled(false);

      Notification notification = show();
      notification.addDetachListener(detachEvent -> button.setEnabled(true));
    });

    add(button);
  }

  public Notification show() {
    // tag::snippet[]
    // When creating a notification using the constructor,
    // the duration is 0-sec by default which means that
    // the notification does not close automatically.
    Notification notification = new Notification();

    Div text = new Div(
      new Text("Jason Bailey mentioned you in "),
      new Anchor("#", "Project Q4")
    );

    Button closeButton = new Button(new Icon("lumo", "cross"));
    closeButton.addThemeVariants(ButtonVariant.LUMO_TERTIARY_INLINE);
    closeButton.getElement().setAttribute("aria-label", "Close");
    closeButton.addClickListener(event -> {
      notification.close();
    });

    HorizontalLayout layout = new HorizontalLayout(text, closeButton);
    layout.setAlignItems(Alignment.CENTER);

    notification.add(layout);
    notification.open();
    // end::snippet[]

    notification.setPosition(Notification.Position.MIDDLE);

    return notification;
  }

  public static class Exporter extends DemoExporter<NotificationLink> { // hidden-source-line
  } // hidden-source-line
}
