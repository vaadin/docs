package com.vaadin.demo.fusion.forms.dialogs;

import com.vaadin.flow.server.auth.AnonymousAllowed;

import dev.hilla.BrowserCallable;
import dev.hilla.Nonnull;

@BrowserCallable
@AnonymousAllowed
public class NewsletterService {
    // tag::snippet[]
    @Nonnull
    public String subscribe(@Nonnull NewsletterSubscription subscription) {
        return subscription.getEmail() + " is now subscribed";
    }
    // end::snippet[]
}
