package com.vaadin.demo.ce;

import com.vaadin.collaborationengine.CollaborationAvatarGroup;
import com.vaadin.collaborationengine.CollaborationEngine;
import com.vaadin.collaborationengine.UserInfo;
import com.vaadin.demo.domain.Role;
import com.vaadin.demo.domain.User;
import com.vaadin.demo.domain.User.UserService;
import com.vaadin.flow.component.Component;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;

/**
 * Code snippets used in licensing/production documentation.
 */
public class ProductionDocumentation extends VerticalLayout {

    private UserService userService;

    public ProductionDocumentation() {
        definitionOfEndUser();
        requestAccess();
        checkUserPermissions();
    }

    private void definitionOfEndUser() {
        // tag::user-def[]
        String userId = "steve@example.com";
        String name = "Steve";
        UserInfo userInfo = new UserInfo(userId, name);
        CollaborationAvatarGroup avatarGroup = new CollaborationAvatarGroup(
                userInfo, "app");
        add(avatarGroup);
        // end::user-def[]
    }

    private void requestAccess() {
        Component component = new Div();
        // tag::request-access[]
        UserInfo userInfo = new UserInfo("steve@example.com", "Steve");
        CollaborationEngine.getInstance().requestAccess(userInfo, response -> {
            component.setVisible(response.hasAccess());
        });
        // end::request-access[]
    }

    private void checkUserPermissions() {
        // tag::restrict-usage[]
        User userEntity = userService.getCurrentUser();
        if (userEntity.getRoles().contains(Role.ADMIN)) {
            UserInfo userInfo = new UserInfo(userEntity.getId(),
                    userEntity.getName(), userEntity.getImageUrl());

            CollaborationAvatarGroup avatarGroup = new CollaborationAvatarGroup(
                    userInfo, "avatars");

            add(avatarGroup);
        }
        // end::restrict-usage[]
    }
}
