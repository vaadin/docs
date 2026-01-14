package com.vaadin.demo.collaboration;

import java.io.IOException;
import java.io.InputStream;
import java.net.URL;

import com.vaadin.collaborationengine.CollaborationAvatarGroup;
import com.vaadin.collaborationengine.UserInfo;
import com.vaadin.demo.domain.User;
import com.vaadin.demo.domain.User.UserService;
import com.vaadin.flow.component.avatar.Avatar;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;

/**
 * Code snippets used in CollaborationAvatarGroup's reference documentation.
 */
public class AvatarGroupDocumentation extends VerticalLayout {

    private CollaborationAvatarGroup avatarGroup;
    private UserService userService;

    public AvatarGroupDocumentation() {
        // tag::avatar-group-new[]
        User userEntity = userService.getCurrentUser();
        UserInfo userInfo = new UserInfo(userEntity.getId());

        CollaborationAvatarGroup avatarGroup = new CollaborationAvatarGroup(
                userInfo, "insuranceClaims");
        add(avatarGroup);
        // end::avatar-group-new[]

        // tag::avatar-group-own[]
        // Exclude own avatar from the group:
        avatarGroup.setOwnAvatarVisible(false);

        // Create another component for own avatar:
        Avatar ownAvatar = new Avatar();
        ownAvatar.setName(userEntity.getName());
        ownAvatar.setImage(userEntity.getImageUrl());

        add(ownAvatar);
        // end::avatar-group-own[]
    }

    private void imageHandler() {
        // tag::avatar-group-images[]
        avatarGroup.setImageHandler(userInfo -> {
            return event -> {
                try {
                    String url = "https://i.pravatar.cc/40?u="
                            + userInfo.getId();
                    event.setFileName("avatar_" + userInfo.getId() + ".jpg");
                    event.setContentType("image/jpeg");
                    try (InputStream in = new URL(url).openStream()) {
                        in.transferTo(event.getOutputStream());
                    }
                } catch (IOException e) {
                    event.getResponse().setStatus(500);
                }
            };
        });
        // end::avatar-group-images[]
    }

    // tag::avatar-group-topic[]
    private void personSelected(long personId) {
        avatarGroup.setTopic("person/" + personId);
    }
    // end::avatar-group-topic[]
}
