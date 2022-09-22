package com.vaadin.demo.sso;

import com.vaadin.flow.component.avatar.Avatar;
import com.vaadin.flow.component.html.Div;
import com.vaadin.sso.starter.AuthenticationContext;

// tag::profile-view[]
public class ProfileView extends Div {
  public ProfileView(AuthenticationContext context) {
    context.getAuthenticatedUser().ifPresent(user -> {
      Avatar userAvatar = new Avatar(user.getFullName());
      add(userAvatar);
    });
  }
}
// end::profile-view[]