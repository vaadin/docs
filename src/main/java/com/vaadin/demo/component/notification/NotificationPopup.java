package com.vaadin.demo.component.notification;

import com.vaadin.flow.component.Text;
import com.vaadin.flow.component.button.Button;
import com.vaadin.flow.component.button.ButtonVariant;
import com.vaadin.flow.component.contextmenu.ContextMenu;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.html.Span;
import com.vaadin.flow.component.icon.VaadinIcon;
import com.vaadin.flow.router.Route;
import com.vaadin.demo.DemoExporter; // hidden-source-line

import java.util.Arrays;

@Route("notification-popup")
public class NotificationPopup extends Div {

    public NotificationPopup() {
        // tag::snippet[]
        Span numberOfNotifications = new Span("4");
        numberOfNotifications.getElement()
                .getThemeList()
                .addAll(Arrays.asList("badge", "error", "primary", "small", "pill"));
        numberOfNotifications.getStyle()
                .set("position", "absolute")
                .set("transform", "translate(-40%, -85%)");

        Button bellBtn = new Button(VaadinIcon.BELL_O.create());
        bellBtn.addThemeVariants(ButtonVariant.LUMO_TERTIARY);
        bellBtn.getElement().appendChild(numberOfNotifications.getElement());

        Div sampleNotification = new Div(new Text("Show notifications here"));
        sampleNotification.getStyle().set("padding", "var(--lumo-space-l)");

        ContextMenu menu = new ContextMenu();
        menu.setOpenOnClick(true);
        menu.setTarget(bellBtn);
        menu.add(sampleNotification);
        // end::snippet[]

        add(bellBtn);
    }


    public static class Exporter extends DemoExporter<NotificationPopup> { // hidden-source-line
    } // hidden-source-line
}