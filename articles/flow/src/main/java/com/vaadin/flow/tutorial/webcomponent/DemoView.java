package com.vaadin.flow.tutorial.webcomponent;

import com.vaadin.flow.component.button.Button;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.html.Span;
import com.vaadin.flow.component.icon.VaadinIcon;
import com.vaadin.flow.component.notification.Notification;
import com.vaadin.flow.component.notification.Notification.Position;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.router.Route;
import com.vaadin.flow.theme.Theme;
import com.vaadin.flow.theme.lumo.Lumo;
import com.vaadin.flow.tutorial.annotations.CodeFor;

@CodeFor("web-components/creating-java-api-for-a-web-component.asciidoc")
@Route("")
@Theme(Lumo.class)
public class DemoView extends VerticalLayout {

    public DemoView() {
        PaperSlider paperSlider = new PaperSlider();
        paperSlider.setPin(true);
        paperSlider.addValueChangeListener(e -> {
            String message = "The value is now " + e.getValue();
            if (e.isFromClient()) {
                message += " (set by the user)";
            }
            Notification.show(message, 3000, Position.MIDDLE);
        });
        add(paperSlider);

        Button incrementButton = new Button("Increment using setValue", e -> {
            paperSlider.setValue(paperSlider.getValue() + 5);
        });
        add(incrementButton);

        Button incrementJSButton = new Button("Increment using JS", e -> {
            paperSlider.increment();
        });
        add(incrementJSButton);

        paperSlider.addClickListener(e -> {
            Notification.show("Clicked at " + e.getX() + "," + e.getY(), 1000,
                    Position.BOTTOM_START);
        });

        Div root = new Div();
        root.add(new Span("Hello"));
        root.add(new Span("World"));
        add(root);

        // @formatter:off
        IconButton iconButton = new IconButton(VaadinIcon.CHECK);
        iconButton.addClickListener( e -> {
            int next = (iconButton.getIcon().ordinal() + 1) % VaadinIcon.values().length;
            iconButton.setIcon(VaadinIcon.values()[next]);
        });
        add(iconButton);
        // @formatter:on

    }
}
