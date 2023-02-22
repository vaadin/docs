package com.vaadin.demo.sso;

import javax.annotation.security.PermitAll;

import com.vaadin.demo.flow.routing.Route;
import com.vaadin.flow.component.avatar.Avatar;
import com.vaadin.flow.component.button.Button;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.spring.security.AuthenticationContext;

import org.springframework.security.oauth2.core.oidc.user.OidcUser;

// tag::full-class[]
@PermitAll
@Route(value = "private")
// tag::profile-view[]
public class ProfileView extends VerticalLayout {
    // tag::class-content[]
    public ProfileView(AuthenticationContext authContext) {
        // tag::authenticated-user[]
        authContext.getAuthenticatedUser(OidcUser.class).ifPresent(user -> {
            Avatar userAvatar = new Avatar(user.getFullName());
            add(userAvatar);
        });
        // end::authenticated-user[]
        // tag::logout[]
        add(new Button("Logout", e -> authContext.logout()));
        // end::logout[]
    }
    // end::class-content[]
    // ...
}
// end::profile-view[]
// end::full-class[]
