package com.vaadin.demo.collaboration;

import java.io.ByteArrayInputStream;

import com.vaadin.collaborationengine.CollaborationAvatarGroup;
import com.vaadin.collaborationengine.UserInfo;
import com.vaadin.demo.domain.User;
import com.vaadin.demo.domain.User.UserService;
import com.vaadin.flow.component.avatar.Avatar;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.server.streams.DownloadHandler;
import com.vaadin.flow.server.streams.DownloadResponse;

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
                userInfo, "ensuranceClaims");
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
        avatarGroup.setImageHandler(userInfo ->
            DownloadHandler.fromInputStream(
                    event -> {
                        User userEntity = userService
                                .findById(userInfo.getId());
                        byte[] imageBytes = userEntity.getImage();
                        return new DownloadResponse(new ByteArrayInputStream(imageBytes),
                                "avatar_" + userInfo.getId() + ".png",
                                "image/png", imageBytes.length);
                    })
        );
        // end::avatar-group-images[]
    }

    // tag::avatar-group-topic[]
    private void personSelected(long personId) {
        avatarGroup.setTopic("person/" + personId);
    }
    // end::avatar-group-topic[]
}
