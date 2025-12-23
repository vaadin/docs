package com.vaadin.demo.component.notification;

import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.notification.Notification;
import com.vaadin.flow.component.notification.NotificationVariant;
import com.vaadin.flow.router.Route;
import com.vaadin.demo.DemoExporter; // hidden-source-line

@Route("notification-error")
public class NotificationError extends Div {

    public NotificationError() {
        // tag::snippet[]
        Notification notification = Notification
                .show("Failed to generate report");
        notification.addThemeVariants(NotificationVariant.LUMO_ERROR);
        // end::snippet[]
        notification.setPosition(Notification.Position.MIDDLE);
        notification.setDuration(0);
    }

    public static class Exporter extends DemoExporter<NotificationError> { // hidden-source-line
    } // hidden-source-line
}
