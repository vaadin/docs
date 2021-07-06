package com.vaadin.demo.component.notification;

import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.Text;
import com.vaadin.flow.component.button.Button;
import com.vaadin.flow.component.button.ButtonVariant;
import com.vaadin.flow.component.icon.Icon;
import com.vaadin.flow.component.notification.Notification;
import com.vaadin.flow.component.orderedlayout.HorizontalLayout;
import com.vaadin.flow.router.Route;

import com.vaadin.demo.DemoExporter; // hidden-source-line

@Route("notification-basic")
public class NotificationBasic extends Div {

  public NotificationBasic() {
    // tag::snippet[]
    Notification notification = new Notification();
    notification.setDuration(5000);
    notification.setPosition(Notification.Position.MIDDLE);

    Div notificationText = new Div(new Text("Financial report generated"));

    Button notificationButton = new Button(new Icon("lumo", "cross"));
    notificationButton.addThemeVariants(ButtonVariant.LUMO_TERTIARY_INLINE, ButtonVariant.LUMO_ICON);
    notificationButton.getElement().setAttribute("aria-label", "Close");
    notificationButton.addClickListener(event -> {
      notification.setOpened(false);
    });

    HorizontalLayout notificationLayout = new HorizontalLayout(notificationText, notificationButton);
    notification.add(notificationLayout);
    // end::snippet[]

    Button button = new Button("Try it");
    button.addClickListener(event -> {
      notification.setOpened(true);
    });

    notification.addOpenedChangeListener(event -> {
      button.setEnabled(!event.getSource().isOpened());
    });

    add(button, notification);
  }

  public static class Exporter extends DemoExporter<NotificationBasic> { // hidden-source-line
  } // hidden-source-line
}
