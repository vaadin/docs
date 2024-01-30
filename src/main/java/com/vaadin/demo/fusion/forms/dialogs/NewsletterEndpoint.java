package com.vaadin.demo.fusion.forms.dialogs;

import com.vaadin.flow.server.auth.AnonymousAllowed;
import com.vaadin.hilla.Endpoint;
import com.vaadin.hilla.Nonnull;

@Endpoint
@AnonymousAllowed
public class NewsletterEndpoint {
    // tag::snippet[]
    @Nonnull
    public String subscribe(@Nonnull NewsletterSubscription subscription) {
        return subscription.getEmail() + " is now subscribed";
    }
    // end::snippet[]
}
