package com.vaadin.demo.fusion.forms.dialogs;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;

public class NewsletterSubscription {
    private boolean privacyAccepted;

    @NotBlank
    @Email
    private String email;

    public boolean isPrivacyAccepted() {
        return privacyAccepted;
    }

    public void setPrivacyAccepted(boolean privacyAccepted) {
        this.privacyAccepted = privacyAccepted;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }
}
