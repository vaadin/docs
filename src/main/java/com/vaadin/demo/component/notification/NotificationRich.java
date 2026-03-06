package com.vaadin.demo.component.notification;

import com.vaadin.flow.component.Text;
import com.vaadin.flow.component.avatar.Avatar;
import com.vaadin.flow.component.html.Anchor;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.button.Button;
import com.vaadin.flow.component.html.Span;
import com.vaadin.flow.component.icon.Icon;
import com.vaadin.flow.component.icon.VaadinIcon;
import com.vaadin.flow.component.notification.Notification;
import com.vaadin.flow.component.notification.NotificationVariant;
import com.vaadin.flow.component.orderedlayout.FlexComponent;
import com.vaadin.flow.component.orderedlayout.HorizontalLayout;
import com.vaadin.flow.router.Route;
import com.vaadin.demo.DemoExporter; // hidden-source-line

import java.util.function.Supplier;

import static com.vaadin.flow.component.button.ButtonVariant.*;

@Route("notification-rich")
public class NotificationRich extends HorizontalLayout {
    public NotificationRich() {
        openNotification(this::createSubmitSuccess);
        openNotification(this::createReportError);
        openNotification(this::createMentionNotification);
    }

    private void openNotification(Supplier<Notification> notificationSupplier) {
        Notification notification = notificationSupplier.get();
        notification.setPosition(Notification.Position.MIDDLE);
        notification.setDuration(0);
        notification.open();
    };

    // tag::snippet[]
    public Notification createSubmitSuccess() {
        Notification notification = new Notification();
        notification.addThemeVariants(NotificationVariant.SUCCESS);

        Icon icon = VaadinIcon.CHECK_CIRCLE.create();

        Button viewBtn = new Button("View");

        HorizontalLayout layout = new HorizontalLayout(icon,
                new Text("Application submitted!"));
        layout.addToEnd(viewBtn, createCloseBtn());
        layout.setAlignItems(FlexComponent.Alignment.CENTER);
        layout.setMinWidth("350px");

        notification.add(layout);

        return notification;
    }

    public Notification createReportError() {
        Notification notification = new Notification();
        notification.addThemeVariants(NotificationVariant.ERROR);

        Icon icon = VaadinIcon.WARNING.create();
        Button retryBtn = new Button("Retry");

        HorizontalLayout layout = new HorizontalLayout(icon,
                new Text("Failed to generate report!"));
        layout.addToEnd(retryBtn, createCloseBtn());
        layout.setAlignItems(FlexComponent.Alignment.CENTER);
        layout.setMinWidth("350px");

        notification.add(layout);

        return notification;
    }

    public Notification createMentionNotification() {
        Notification notification = new Notification();

        Avatar avatar = new Avatar("Jason Bailey");

        Span name = new Span("Jason Bailey");
        name.getStyle().set("font-weight", "500");

        Div info = new Div(name, new Text(" mentioned you in "),
                new Anchor("#", "Project Q4"));

        HorizontalLayout layout = new HorizontalLayout(avatar, info);
        layout.addToEnd(createCloseBtn());
        layout.setAlignItems(FlexComponent.Alignment.CENTER);
        layout.setMinWidth("350px");

        notification.add(layout);

        return notification;
    }

    public static Button createCloseBtn() {
        Button closeBtn = new Button(VaadinIcon.CLOSE_SMALL.create());

        return closeBtn;
    }
    // end::snippet[]

    public static class Exporter extends DemoExporter<NotificationRich> { // hidden-source-line
    } // hidden-source-line
}
