package com.vaadin.demo.component.notification;

import com.vaadin.flow.component.*;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.button.Button;
import com.vaadin.flow.component.button.ButtonVariant;
import com.vaadin.flow.component.notification.Notification;
import com.vaadin.flow.component.notification.NotificationVariant;
import com.vaadin.flow.component.orderedlayout.HorizontalLayout;
import com.vaadin.flow.component.orderedlayout.FlexComponent.Alignment;
import com.vaadin.flow.router.Route;

import com.vaadin.demo.DemoExporter; // hidden-source-line

@Route("notification-keyboard-a11y")
public class NotificationKeyboardA11y extends Div {

    public NotificationKeyboardA11y() {
        Button button = new Button("Show notification");
        button.addClickListener(clickEvent -> {
            button.setEnabled(false);

            Notification notification = show();
            notification
                    .addDetachListener(detachEvent -> button.setEnabled(true));
            setupUndoShortcut(notification);
        });

        add(button);
        show();
    }

    // tag::snippet[]
    public Notification show() {
        Notification notification = new Notification();
        notification.setDuration(10000);
        notification.addThemeVariants(NotificationVariant.LUMO_CONTRAST);

        Div statusText = new Div(new Text("5 tasks deleted"));

        var layout = new HorizontalLayout(statusText, new CloseButtonWithShortcutHint());
        layout.setAlignItems(Alignment.CENTER);

        notification.add(layout);
        notification.open();
        // end::snippet[]

        notification.setPosition(Notification.Position.MIDDLE);
        // tag::snippet[]

        return notification;
    }
    // end::snippet[]

    // tag::closeBtn[]
    public class CloseButtonWithShortcutHint extends Button {

        public CloseButtonWithShortcutHint() {
            addThemeVariants(ButtonVariant.LUMO_PRIMARY);
            getStyle().set("margin-left","var(--lumo-space-xl)");
            getElement().executeJs("""
                const isMac = /Macintosh|MacIntel|MacPPC|Mac68K/.test(window.navigator.platform);
                this.textContent = `Undo ${isMac ? '⌘' : 'Ctrl-'}Z`;
                            """);
            addClickListener(event -> findAncestor(Notification.class).close());
        }
    }

    // end::closeBtn[]


    // tag::setupUndoShortcut[]
    public void setupUndoShortcut(Notification notification) {
        Shortcuts.addShortcutListener(notification, notification::close,
                Key.of("z"), KeyModifier.META);
        Shortcuts.addShortcutListener(notification, notification::close,
                Key.of("z"), KeyModifier.CONTROL);
    }
    // end::setupUndoShortcut[]

    public static class Exporter extends // hidden-source-line
            DemoExporter<NotificationKeyboardA11y> { // hidden-source-line
    } // hidden-source-line
}
