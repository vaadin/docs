package com.vaadin.demo.fusion.forms.dialogs;

import com.vaadin.flow.server.auth.AnonymousAllowed;
import com.vaadin.hilla.Endpoint;
import org.jspecify.annotations.NonNull;

@Endpoint
@AnonymousAllowed
public class NewsletterEndpoint {
    // tag::snippet[]
    @NonNull
    public String subscribe(@NonNull NewsletterSubscription subscription) {
        return subscription.getEmail() + " is now subscribed";
    }
    // end::snippet[]
}
