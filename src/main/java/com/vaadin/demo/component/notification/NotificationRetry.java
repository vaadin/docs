package com.vaadin.demo.component.notification;

import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.Text;
import com.vaadin.flow.component.button.Button;
import com.vaadin.flow.component.icon.Icon;
import com.vaadin.flow.component.notification.Notification;
import com.vaadin.flow.component.notification.NotificationVariant;
import com.vaadin.flow.component.orderedlayout.FlexComponent;
import com.vaadin.flow.component.orderedlayout.HorizontalLayout;
import com.vaadin.flow.router.Route;

import com.vaadin.demo.DemoExporter; // hidden-source-line

@Route("notification-retry")
public class NotificationRetry extends Div {

    public NotificationRetry() {
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

    private Notification show() {
        // tag::snippet[]
        Notification notification = new Notification();
        notification.addThemeVariants(NotificationVariant.ERROR);

        // this is the default, 0 or negative means the Notification
        // is not closed automatically
        notification.setDuration(0);

        // Now we can compose the content from components
        Button retryButton = new RetryButton();
        Button closeButton = new CloseButton();

        HorizontalLayout layout = new HorizontalLayout(
                new Text("Failed to generate report"));
        layout.addToEnd(retryButton, closeButton);
        layout.setAlignItems(FlexComponent.Alignment.CENTER);
        layout.setMinWidth("350px");
        notification.add(layout);

        notification.open();
        // end::snippet[]

        notification.setPosition(Notification.Position.MIDDLE);

        return notification;
    }

    public class RetryButton extends Button {
        public RetryButton() {
            super("Retry");
            addClickListener(e -> findAncestor(Notification.class).close());
        }
    }

    public class CloseButton extends Button {
        public CloseButton() {
            super(new Icon("lumo", "cross"));
            setAriaLabel("Close");
            addClickListener(e -> findAncestor(Notification.class).close());
        }
    }

    public static class Exporter extends DemoExporter<NotificationRetry> { // hidden-source-line
    } // hidden-source-line
}
