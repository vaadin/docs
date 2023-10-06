package com.vaadin.demo.component.notification;

import com.vaadin.demo.DemoExporter;
import com.vaadin.flow.component.button.Button;
import com.vaadin.flow.component.contextmenu.ContextMenu;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.html.Span;
import com.vaadin.flow.component.icon.VaadinIcon;
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

        ContextMenu menu = new ContextMenu();
        menu.setOpenOnClick(true);
        menu.setTarget(bellBtn);
        menu.addItem("This is ContextMenu");
        menu.addItem("Consider Using");
        menu.addItem("ContextMenu");
        menu.addItem("Instead of Notifications");
        // end::snippet[]

        add(bellBtn);
    }

    // tag::messagesBtn[]

    public class MessagesButton extends Button {

        private final Element numberOfNotifications;

        public MessagesButton() {
            super(VaadinIcon.BELL_O.create());
            numberOfNotifications = new Element("span");
            numberOfNotifications.getStyle()
                    .setPosition(Style.Position.ABSOLUTE)
                    .setTransform("translate(-40%, -85%)");
            numberOfNotifications.getThemeList().addAll(
                    Arrays.asList("badge", "error", "primary", "small", "pill"));
        }

        public void setUnreadMessages(int unread) {
            numberOfNotifications.setText(unread + "");
            if(unread > 0 && numberOfNotifications.getParent() == null) {
                getElement().appendChild(numberOfNotifications);
            } else if(numberOfNotifications.getNode().isAttached()) {
                numberOfNotifications.removeFromParent();
            }
        }

    }
    // end::messagesBtn[]

    public static class Exporter extends DemoExporter<NotificationPopup> { // hidden-source-line
    } // hidden-source-line
}
