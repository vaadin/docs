package com.vaadin.demo.ce;

import com.vaadin.collaborationengine.PresenceManager;
import com.vaadin.collaborationengine.UserInfo;
import com.vaadin.flow.component.Component;
import com.vaadin.flow.component.avatar.Avatar;
import com.vaadin.flow.component.button.Button;
import com.vaadin.flow.component.notification.Notification;
import com.vaadin.flow.component.orderedlayout.HorizontalLayout;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;

/**
 * Code snippets used in PresenceManager's reference documentation.
 */
public class PresenceManagerDocumentation extends VerticalLayout {

    public PresenceManagerDocumentation() {
        // tag::snippet[]
        VerticalLayout users = new VerticalLayout();

        UserInfo localUser = new UserInfo("john");

        PresenceManager manager = new PresenceManager(users, localUser,
                "my-topic"); // <1>

        manager.setAutoPresence(true); // <2>

        manager.setNewUserHandler(newUserInfo -> { // <3>
            Component card = createUserCard(newUserInfo);
            users.add(card);
            return () -> users.remove(card); // <4>
        });

        add(new Button("Show active users", event -> {
            Notification.show("Active users: " + manager.getUsers().count()); // <5>
        }));
        // tag::snippet[]
    }

    Component createUserCard(UserInfo user) {
        return new HorizontalLayout(new Avatar(user.getName()));
    }
}
