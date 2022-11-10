package com.vaadin.demo.collaboration;

import com.vaadin.collaborationengine.PresenceManager;
import com.vaadin.collaborationengine.UserInfo;
import com.vaadin.flow.component.Component;
import com.vaadin.flow.component.avatar.Avatar;
import com.vaadin.flow.component.orderedlayout.HorizontalLayout;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;

/**
 * Code snippets used in PresenceManager's reference documentation.
 */
public class PresenceManagerExample extends VerticalLayout {

    public PresenceManagerExample() {
        // tag::snippet[]
        VerticalLayout users = new VerticalLayout();

        UserInfo localUser = new UserInfo("john");

        PresenceManager manager = new PresenceManager(users, localUser,
                "my-topic"); // <1>

        manager.markAsPresent(true); // <2>

        manager.setPresenceHandler(context -> { // <3>
            Component card = createUserCard(context.getUser());
            users.add(card);
            return () -> users.remove(card); // <4>
        });
        // end::snippet[]
    }

    Component createUserCard(UserInfo user) {
        return new HorizontalLayout(new Avatar(user.getName()));
    }
}
