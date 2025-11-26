package com.vaadin.demo.component.popover;

import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneOffset;
import java.util.Arrays;
import java.util.List;

import com.vaadin.demo.DemoExporter; // hidden-source-line
import com.vaadin.demo.domain.DataService;
import com.vaadin.demo.domain.Person;
import com.vaadin.flow.component.button.Button;
import com.vaadin.flow.component.button.ButtonVariant;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.html.H4;
import com.vaadin.flow.component.messages.MessageList;
import com.vaadin.flow.component.messages.MessageListItem;
import com.vaadin.flow.component.orderedlayout.FlexComponent;
import com.vaadin.flow.component.orderedlayout.HorizontalLayout;
import com.vaadin.flow.component.popover.Popover;
import com.vaadin.flow.component.popover.PopoverPosition;
import com.vaadin.flow.component.popover.PopoverVariant;
import com.vaadin.flow.component.tabs.TabSheet;
import com.vaadin.flow.component.tabs.TabSheetVariant;
import com.vaadin.flow.theme.lumo.LumoIcon;
import com.vaadin.flow.router.Route;

@Route("popover-notification-panel")
public class PopoverNotificationPanel extends Div {

    public PopoverNotificationPanel() {
        Button button = new Button(LumoIcon.BELL.create());
        button.addThemeVariants(ButtonVariant.LUMO_ICON);
        button.setAriaLabel("Notifications");

        // tag::snippet[]
        Popover popover = new Popover();
        popover.setTarget(button);
        popover.setWidth("300px");
        popover.addThemeVariants(PopoverVariant.ARROW,
                PopoverVariant.LUMO_NO_PADDING);
        popover.setPosition(PopoverPosition.BOTTOM);
        popover.setModal(true);
        popover.setAriaLabelledBy("notifications-heading");
        // end::snippet[]

        List<Person> people = DataService.getPeople(5);

        MessageList unreadList = new MessageList();

        MessageList allList = new MessageList();

        MessageListItem message1 = new MessageListItem(
                "Could you send me the latest TPS report from the ACME project?",
                minutesAgo(20), people.get(0).getFullName(),
                people.get(0).getPictureUrl());

        MessageListItem message2 = new MessageListItem(
                "Hey, are we on track for the trade show next month?",
                minutesAgo(30), people.get(1).getFullName(),
                people.get(1).getPictureUrl());

        MessageListItem message3 = new MessageListItem(
                "TPS reports look good! I'm going to pass it on to Alliyah next.",
                minutesAgo(35), people.get(2).getFullName(),
                people.get(2).getPictureUrl());

        MessageListItem message4 = new MessageListItem(
                "Hi, are you going to attend the brainstorming session tomorrow?",
                minutesAgo(55), people.get(3).getFullName(),
                people.get(3).getPictureUrl());

        unreadList.setItems(Arrays.asList(message1, message2, message3));
        allList.setItems(Arrays.asList(message1, message2, message3, message4));

        TabSheet tabSheet = new TabSheet();
        tabSheet.addThemeVariants(TabSheetVariant.LUMO_TABS_SMALL,
                TabSheetVariant.LUMO_NO_PADDING);
        tabSheet.addClassName("notifications");

        Div unreadContent = new Div();
        unreadContent.add(unreadList);

        tabSheet.add("Unread", unreadContent);
        tabSheet.add("All", new Div(allList));

        H4 heading = new H4("Notifications");
        heading.setId("notifications-heading");
        heading.getStyle().set("margin", "0");

        Button markRead = new Button("Mark all read", (e) -> {
            unreadContent.removeAll();
            unreadContent.add(new Div("No new notifications") {
                {
                    this.addClassName("no-notifications-msg");
                }
            });
        });
        markRead.getStyle().set("margin", "0 0 0 auto");
        markRead.addThemeVariants(ButtonVariant.LUMO_SMALL);

        HorizontalLayout layout = new HorizontalLayout(heading, markRead);
        layout.setSpacing(false);
        layout.setAlignItems(FlexComponent.Alignment.CENTER);
        layout.getStyle().set("padding",
                "1rem 1rem 0.25rem");

        popover.add(layout, tabSheet);

        add(button, popover);
    }

    private Instant minutesAgo(int minutes) {
        return LocalDateTime.now(ZoneOffset.UTC).minusMinutes(minutes)
                .toInstant(ZoneOffset.UTC);
    }

    public static class Exporter
            extends DemoExporter<PopoverNotificationPanel> { // hidden-source-line
    } // hidden-source-line
}
