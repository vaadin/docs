package com.vaadin.demo.fusion.forms.signup;

import java.util.Set;

import com.vaadin.flow.server.auth.AnonymousAllowed;
import com.vaadin.hilla.BrowserCallable;
import com.vaadin.hilla.exception.EndpointValidationException;
import com.vaadin.hilla.exception.EndpointValidationException.ValidationErrorData;

// tag::snippet[]
@BrowserCallable
@AnonymousAllowed
public class SignUpService {

    private final Set<String> usernames = Set.of("admin", "jane");

    public void signUp(SignUp signUp) {
        if (usernames.contains(signUp.username())) {
            throw new EndpointValidationException(new ValidationErrorData(
                    "The username is taken", "username"));
        }
        // Create the account
    }
}
// end::snippet[]
