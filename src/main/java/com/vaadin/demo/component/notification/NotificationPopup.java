package com.vaadin.demo.component.notification;

import com.vaadin.demo.DemoExporter; // hidden-source-line
import com.vaadin.flow.component.button.Button;
import com.vaadin.flow.component.button.ButtonVariant;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.icon.VaadinIcon;
import com.vaadin.flow.component.popover.Popover;
import com.vaadin.flow.theme.lumo.LumoIcon;
import com.vaadin.flow.dom.Element;
import com.vaadin.flow.dom.Style;
import com.vaadin.flow.router.Route;

import java.util.Arrays;

@Route("notification-popup")
public class NotificationPopup extends Div {

    public NotificationPopup() {
        // tag::snippet[]
        var bellBtn = new MessagesButton();
        bellBtn.setUnreadMessages(4);
        bellBtn.setAriaLabel("notifications");

        Popover popover = new Popover();
        popover.setTarget(bellBtn);
        Div content = new Div("Show notifications here");
        popover.add(content);
        // end::snippet[]

        add(bellBtn, popover);
    }

    // tag::messagesBtn[]

    public class MessagesButton extends Button {

        private final Element numberOfNotifications;

        public MessagesButton() {
            super(LumoIcon.BELL.create());
            addThemeVariants(ButtonVariant.TERTIARY);
            numberOfNotifications = new Element("span");
            numberOfNotifications.getStyle()
                    .setPosition(Style.Position.ABSOLUTE)
                    .setTransform("translate(-40%, -30%)");
            numberOfNotifications.getThemeList().addAll(Arrays.asList("badge",
                    "error", "primary", "small", "pill"));
        }

        public void setUnreadMessages(int unread) {
            numberOfNotifications.setText(unread + "");
            if (unread > 0 && numberOfNotifications.getParent() == null) {
                getElement().appendChild(numberOfNotifications);
            } else if (numberOfNotifications.getNode().isAttached()) {
                numberOfNotifications.removeFromParent();
            }
        }

    }
    // end::messagesBtn[]

    public static class Exporter extends DemoExporter<NotificationPopup> { // hidden-source-line
    } // hidden-source-line
}
