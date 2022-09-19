package com.vaadin.demo.fusion.forms.dialogs;

import com.vaadin.flow.server.auth.AnonymousAllowed;

import dev.hilla.Endpoint;
import dev.hilla.Nonnull;

@Endpoint
@AnonymousAllowed
public class NewsletterEndpoint {
    @Nonnull
    public String subscribe(@Nonnull NewsletterSubscription subscription) {
        return subscription.getEmail() + " is now subscribed";
    }
}
