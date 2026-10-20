package com.vaadin.demo.component.notification;

import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.notification.Notification;
import com.vaadin.flow.component.notification.NotificationVariant;
import com.vaadin.flow.router.Route;

import com.vaadin.demo.DemoExporter; // hidden-source-line

@Route("notification-color-scheme")
public class NotificationColorScheme extends Div {

    public NotificationColorScheme() {
        // tag::snippet[]
        Notification defaultNotification = new Notification(
                "Default light color scheme");
        defaultNotification.addThemeVariants(NotificationVariant.INFO);
        defaultNotification.setPosition(Notification.Position.MIDDLE);
        defaultNotification.setDuration(0);

        Notification darkNotification = new Notification(
                "Forced dark color scheme");
        darkNotification.addThemeVariants(NotificationVariant.INFO);
        darkNotification.setPosition(Notification.Position.MIDDLE);
        darkNotification.setDuration(0);
        darkNotification.addClassName("dark");

        defaultNotification.open();
        darkNotification.open();
        // end::snippet[]
    }

    public static class Exporter extends DemoExporter<NotificationColorScheme> { // hidden-source-line
    } // hidden-source-line
}
