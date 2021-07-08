package com.vaadin.demo.component.notification;

import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.Text;
import com.vaadin.flow.component.button.Button;
import com.vaadin.flow.component.button.ButtonVariant;
import com.vaadin.flow.component.icon.Icon;
import com.vaadin.flow.component.notification.Notification;
import com.vaadin.flow.component.notification.NotificationVariant;
import com.vaadin.flow.component.orderedlayout.HorizontalLayout;
import com.vaadin.flow.component.orderedlayout.FlexComponent.Alignment;
import com.vaadin.flow.router.Route;
import com.vaadin.demo.DemoExporter; // hidden-source-line

@Route("notification-success")
public class NotificationSuccess extends Div {

  public NotificationSuccess() {
    // tag::snippet[]
    Notification notification = new Notification();
    notification.addThemeVariants(NotificationVariant.LUMO_SUCCESS);
    // end::snippet[]
    notification.setPosition(Notification.Position.MIDDLE);
    notification.setDuration(5000);

    Div notificationText = new Div(new Text("Application submitted!"));

    Button closeButton = new Button(new Icon("lumo", "cross"));
    closeButton.addThemeVariants(ButtonVariant.LUMO_TERTIARY_INLINE, ButtonVariant.LUMO_ICON);
    closeButton.getElement().setAttribute("aria-label", "Close");
    closeButton.addClickListener(event -> {
      notification.setOpened(false);
    });

    HorizontalLayout notificationLayout = new HorizontalLayout(notificationText, closeButton);
    notificationLayout.setAlignItems(Alignment.CENTER);
    notification.add(notificationLayout);

    Button button = new Button("Try it");
    button.addClickListener(event -> {
      notification.setOpened(true);
    });

    notification.addOpenedChangeListener(event -> {
      button.setEnabled(!event.getSource().isOpened());
    });

    add(button, notification);
  }

  public static class Exporter extends DemoExporter<NotificationSuccess> { // hidden-source-line
  } // hidden-source-line
}
