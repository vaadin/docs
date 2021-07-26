package com.vaadin.demo.component.notification;

import com.vaadin.flow.component.ClickEvent;
import com.vaadin.flow.component.ComponentEventListener;
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
    public static ComponentEventListener<ClickEvent<Button>> createClickHandler(
            Supplier<Notification> notificationSupplier
    ) {
        return clickEvent -> {
            Button btn = clickEvent.getSource();
            btn.setEnabled(false);

            Notification notification = notificationSupplier.get();
            notification.setPosition(Notification.Position.MIDDLE);
            notification.setDuration(5000);
            notification.open();
            notification.addDetachListener(detachEvent -> btn.setEnabled(true));
        };
    }

    public NotificationRich() {
        Button successBtn = new Button(
                "Try it",
                createClickHandler(NotificationRich::createSubmitSuccess));
        successBtn.addThemeVariants(LUMO_SUCCESS, LUMO_PRIMARY);

        Button errorBtn = new Button(
                "Try it",
                createClickHandler(NotificationRich::createReportError));
        errorBtn.addThemeVariants(LUMO_ERROR, LUMO_PRIMARY);

        Button mentionBtn = new Button(
                "Try it",
                createClickHandler(NotificationRich::createMentionNotification));
        mentionBtn.addThemeVariants(LUMO_CONTRAST);

        Button uploadSuccessBtn = new Button(
                "Try it",
                createClickHandler(NotificationRich::createUploadSuccess));
        uploadSuccessBtn.addThemeVariants(LUMO_SUCCESS);

        setJustifyContentMode(JustifyContentMode.CENTER);
        add(successBtn, errorBtn, mentionBtn, uploadSuccessBtn);
    }

    // tag::snippet[]
    public static Notification createSubmitSuccess() {
        Notification notification = new Notification();
        notification.addThemeVariants(NotificationVariant.LUMO_SUCCESS);

        Icon icon = VaadinIcon.CHECK_CIRCLE.create();
        Div info = new Div(new Text("Application submitted!"));

        Button viewBtn = new Button(
                "View",
                clickEvent -> notification.close());
        viewBtn.getStyle().set("margin", "0 0 0 var(--lumo-space-l)");

        HorizontalLayout layout = new HorizontalLayout(
                icon, info, viewBtn,
                createCloseBtn(notification));
        layout.setAlignItems(FlexComponent.Alignment.CENTER);

        notification.add(layout);

        return notification;
    }

    public static Notification createReportError() {
        Notification notification = new Notification();
        notification.addThemeVariants(NotificationVariant.LUMO_ERROR);

        Icon icon = VaadinIcon.WARNING.create();
        Div info = new Div(new Text("Failed to generate report!"));

        Button retryBtn = new Button(
                "Retry",
                clickEvent -> notification.close());
        retryBtn.getStyle().set("margin", "0 0 0 var(--lumo-space-l)");

        HorizontalLayout layout = new HorizontalLayout(
                icon, info, retryBtn,
                createCloseBtn(notification));
        layout.setAlignItems(FlexComponent.Alignment.CENTER);

        notification.add(layout);

        return notification;
    }

    public static Notification createMentionNotification() {
        Notification notification = new Notification();

        Avatar avatar = new Avatar("Jason Bailey");

        Span name = new Span("Jason Bailey");
        name.getStyle().set("font-weight", "500");

        Div info = new Div(
                name,
                new Text(" mentioned you in "),
                new Anchor("#", "Project Q4")
        );

        HorizontalLayout layout = new HorizontalLayout(
                avatar, info,
                createCloseBtn(notification));
        layout.setAlignItems(FlexComponent.Alignment.CENTER);

        notification.add(layout);

        return notification;
    }

    public static Notification createUploadSuccess() {
        Notification notification = new Notification();

        Icon icon = VaadinIcon.CHECK_CIRCLE.create();
        icon.setColor("var(--lumo-success-color)");

        Div uploadSuccessful = new Div(new Text("Upload successful"));
        uploadSuccessful
                .getStyle()
                .set("font-weight", "600")
                .set("color", "var(--lumo-success-text-color)");

        Span fileName = new Span("Financials.xlsx");
        fileName.getStyle()
                .set("font-size", "var(--lumo-font-size-s)")
                .set("font-weight", "600");

        Div info = new Div(uploadSuccessful, new Div(
                fileName,
                new Text(" is now available in "),
                new Anchor("#", "Documents")
        ));
        info.getStyle()
                .set("font-size", "var(--lumo-font-size-s)")
                .set("color", "var(--lumo-secondary-text-color)");

        HorizontalLayout layout = new HorizontalLayout(
                icon, info,
                createCloseBtn(notification));
        layout.setAlignItems(FlexComponent.Alignment.CENTER);

        notification.add(layout);

        return notification;
    }

    public static Button createCloseBtn(Notification notification) {
        Button closeBtn = new Button(
                VaadinIcon.CLOSE_SMALL.create(),
                clickEvent -> notification.close());
        closeBtn.addThemeVariants(LUMO_TERTIARY_INLINE);

        return closeBtn;
    }
    // end::snippet[]

    public static class Exporter extends DemoExporter<NotificationRich> { // hidden-source-line
    } // hidden-source-line
}
