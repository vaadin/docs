package com.vaadin.demo.component.notification;

import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.notification.Notification;
import com.vaadin.flow.component.notification.NotificationVariant;
import com.vaadin.flow.router.Route;
import com.vaadin.demo.DemoExporter; // hidden-source-line

@Route("notification-warning")
public class NotificationWarning extends Div {

    public NotificationWarning() {
        // tag::snippet[]
        Notification notification = Notification
                .show("Your section is about to expire");
        notification.addThemeVariants(NotificationVariant.LUMO_WARNING);
        // end::snippet[]
        notification.setPosition(Notification.Position.MIDDLE);
        notification.setDuration(0);
    }

    public static class Exporter extends DemoExporter<NotificationWarning> { // hidden-source-line
    } // hidden-source-line
}
