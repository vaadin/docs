package com.vaadin.demo.component.notification;

import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.notification.Notification;
import com.vaadin.flow.component.notification.NotificationVariant;
import com.vaadin.flow.router.Route;
import com.vaadin.demo.DemoExporter; // hidden-source-line

@Route("notification-contrast")
public class NotificationContrast extends Div {

    public NotificationContrast() {
        // tag::snippet[]
        // When creating a notification using the `show` static method,
        // the duration is 5-sec by default.
        Notification notification = Notification
                .show("5 tasks deleted");
        notification.addThemeVariants(NotificationVariant.LUMO_CONTRAST);
        // end::snippet[]
        notification.setPosition(Notification.Position.MIDDLE);
        notification.setDuration(0);
    }

    public static class Exporter extends DemoExporter<NotificationContrast> { // hidden-source-line
    } // hidden-source-line
}
