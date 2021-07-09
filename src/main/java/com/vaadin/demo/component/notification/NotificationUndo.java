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

@Route("notification-undo")
public class NotificationUndo extends Div {

  public NotificationUndo() {
    // tag::snippet[]
    Notification notification = new Notification();
    notification.setDuration(10000);
    notification.setPosition(Notification.Position.MIDDLE);
    notification.addThemeVariants(NotificationVariant.LUMO_CONTRAST);

    Div statusText = new Div(new Text("5 tasks deleted"));

    Button undoButton = new Button("Undo");
    undoButton.addThemeVariants(ButtonVariant.LUMO_TERTIARY_INLINE);
    undoButton.getElement().getStyle().set("margin-left", "var(--lumo-space-xl)");
    undoButton.addClickListener(event -> {
      notification.close();
    });

    Button closeButton = new Button(new Icon("lumo", "cross"));
    closeButton.addThemeVariants(ButtonVariant.LUMO_TERTIARY_INLINE);
    closeButton.getElement().setAttribute("aria-label", "Close");
    closeButton.addClickListener(event -> {
      notification.close();
    });

    HorizontalLayout notificationLayout = new HorizontalLayout(statusText, undoButton, closeButton);
    notificationLayout.setAlignItems(Alignment.CENTER);
    notification.add(notificationLayout);
    // end::snippet[]

    Button button = new Button("Try it");
    button.addClickListener(event -> {
      notification.open();
    });

    notification.addOpenedChangeListener(event -> {
      button.setEnabled(!event.getSource().isOpened());
    });

    add(button, notification);
  }

  public static class Exporter extends DemoExporter<NotificationUndo> { // hidden-source-line
  } // hidden-source-line
}
