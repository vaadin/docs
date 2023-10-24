package com.vaadin.demo.component.notification;

import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.Text;
import com.vaadin.flow.component.button.Button;
import com.vaadin.flow.component.button.ButtonVariant;
import com.vaadin.flow.component.icon.Icon;
import com.vaadin.flow.component.notification.Notification;
import com.vaadin.flow.component.notification.NotificationVariant;
import com.vaadin.flow.component.orderedlayout.HorizontalLayout;
import com.vaadin.flow.component.orderedlayout.FlexComponent.Alignment;
import com.vaadin.flow.router.Route;

import com.vaadin.demo.DemoExporter; // hidden-source-line

@Route("notification-undo")
public class NotificationUndo extends Div {

    public NotificationUndo() {
        Button button = new Button("Show notification");
        button.addClickListener(clickEvent -> {
            button.setEnabled(false);

            Notification notification = show();
            notification
                    .addDetachListener(detachEvent -> button.setEnabled(true));
        });

        add(button);
        show();
    }

    public Notification show() {
        // tag::snippet[]
        Notification notification = new Notification();
        notification.setDuration(10000);
        notification.addThemeVariants(NotificationVariant.LUMO_CONTRAST);

        Button undoButton = new UndoButton();
        undoButton.addClickListener(event -> {
            // In this example we just close the Notification
            notification.close();
        });

        var layout = new HorizontalLayout(new Text("5 tasks deleted"), undoButton,
                new CloseButton());
        layout.setAlignItems(Alignment.CENTER);
        notification.add(layout);

        notification.open();
        // end::snippet[]

        notification.setPosition(Notification.Position.MIDDLE);

        return notification;
    }

    public class UndoButton extends Button {
        public UndoButton() {
            super("Undo");
            addThemeVariants(ButtonVariant.LUMO_TERTIARY_INLINE);
            getElement().getStyle().set("margin-left",
                    "var(--lumo-space-xl)");
        }
    }

    public class CloseButton extends Button {
        public CloseButton() {
            super(new Icon("lumo", "cross"));
            addThemeVariants(ButtonVariant.LUMO_TERTIARY_INLINE);
            setAriaLabel("Close");
            addClickListener(e -> findAncestor(Notification.class).close());
        }
    }

    public static class Exporter extends DemoExporter<NotificationUndo> { // hidden-source-line
    } // hidden-source-line
}
