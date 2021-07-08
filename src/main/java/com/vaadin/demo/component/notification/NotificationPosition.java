package com.vaadin.demo.component.notification;

import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.icon.Icon;
import com.vaadin.flow.component.Text;
import com.vaadin.flow.component.button.Button;
import com.vaadin.flow.component.button.ButtonVariant;
import com.vaadin.flow.component.notification.Notification;
import com.vaadin.flow.component.notification.Notification.Position;
import com.vaadin.flow.component.orderedlayout.HorizontalLayout;
import com.vaadin.flow.component.orderedlayout.FlexComponent.Alignment;
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
    Notification notification = new Notification();
    notification.setPosition(position);
    // end::show[]
    notification.setDuration(5000);

    Div notificationText = new Div(new Text(position.getClientName()));

    Button closeButton = new Button(new Icon("lumo", "cross"));
    closeButton.addThemeVariants(ButtonVariant.LUMO_TERTIARY_INLINE, ButtonVariant.LUMO_ICON);
    closeButton.getElement().setAttribute("aria-label", "Close");
    closeButton.addClickListener(event -> {
      notification.close();
    });

    HorizontalLayout notificationLayout = new HorizontalLayout(notificationText, closeButton);
    notificationLayout.setAlignItems(Alignment.CENTER);
    notificationLayout.setFlexGrow(1, notificationText);
    notificationLayout.setSizeFull();
    notification.add(notificationLayout);

    add(notification);
    notification.open();

    // Remember to clean up the element from the DOM
    // if you are not reusing the same notification
    notification.addOpenedChangeListener(event -> {
      remove(notification);
    });
  }

  public static class Exporter extends DemoExporter<NotificationPosition> { // hidden-source-line
  } // hidden-source-line
}
