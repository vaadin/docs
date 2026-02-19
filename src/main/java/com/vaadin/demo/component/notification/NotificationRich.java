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
        openNotification(this::createUploadSuccess);
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
        notification.addThemeVariants(NotificationVariant.LUMO_SUCCESS);

        Icon icon = VaadinIcon.CHECK_CIRCLE.create();

        Button viewBtn = new Button("View");
        viewBtn.getStyle().setMargin("0 0 0 var(--lumo-space-l)");

        var layout = new HorizontalLayout(icon,
                new Text("Application submitted!"), viewBtn, createCloseBtn());
        layout.setAlignItems(FlexComponent.Alignment.CENTER);

        notification.add(layout);

        return notification;
    }

    public Notification createReportError() {
        Notification notification = new Notification();
        notification.addThemeVariants(NotificationVariant.LUMO_ERROR);

        Icon icon = VaadinIcon.WARNING.create();
        Button retryBtn = new Button("Retry");
        retryBtn.getStyle().setMargin("0 0 0 var(--lumo-space-l)");

        var layout = new HorizontalLayout(icon,
                new Text("Failed to generate report!"), retryBtn,
                createCloseBtn());
        layout.setAlignItems(FlexComponent.Alignment.CENTER);

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

        HorizontalLayout layout = new HorizontalLayout(avatar, info,
                createCloseBtn());
        layout.setAlignItems(FlexComponent.Alignment.CENTER);

        notification.add(layout);

        return notification;
    }

    public Notification createUploadSuccess() {
        Notification notification = new Notification();

        Icon icon = VaadinIcon.CHECK_CIRCLE.create();
        icon.setColor("var(--lumo-success-color)");

        Div uploadSuccessful = new Div(new Text("Upload successful"));
        uploadSuccessful.getStyle().set("font-weight", "600")
                .setColor("var(--lumo-success-text-color)");

        Span fileName = new Span("Financials.xlsx");
        fileName.getStyle().set("font-size", "0.875rem").set("font-weight",
                "600");

        Div info = new Div(uploadSuccessful,
                new Div(fileName, new Text(" is now available in "),
                        new Anchor("#", "Documents")));

        info.getStyle().set("font-size", "0.875rem")
                .setColor("var(--lumo-secondary-text-color)");

        var layout = new HorizontalLayout(icon, info, createCloseBtn());
        layout.setAlignItems(FlexComponent.Alignment.CENTER);

        notification.add(layout);

        return notification;
    }

    public static Button createCloseBtn() {
        Button closeBtn = new Button(VaadinIcon.CLOSE_SMALL.create());
        closeBtn.addThemeVariants(LUMO_TERTIARY_INLINE);

        return closeBtn;
    }
    // end::snippet[]

    public static class Exporter extends DemoExporter<NotificationRich> { // hidden-source-line
    } // hidden-source-line
}
