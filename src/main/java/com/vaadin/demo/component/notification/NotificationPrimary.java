package com.vaadin.demo.component.notification;

import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.notification.Notification;
import com.vaadin.flow.component.notification.NotificationVariant;
import com.vaadin.flow.router.Route;
import com.vaadin.demo.DemoExporter; // hidden-source-line

@Route("notification-primary")
public class NotificationPrimary extends Div {

    public NotificationPrimary() {
        // tag::snippet[]
        // When creating a notification using the `show` static method,
        // the duration is 5-sec by default.
        Notification notification = Notification
                .show("New project plan available");
                notification.addThemeVariants(NotificationVariant.LUMO_PRIMARY);
        // end::snippet[]
        notification.setPosition(Notification.Position.MIDDLE);
        notification.setDuration(0);
    }

    public static class Exporter extends DemoExporter<NotificationPrimary> { // hidden-source-line
    } // hidden-source-line
}
