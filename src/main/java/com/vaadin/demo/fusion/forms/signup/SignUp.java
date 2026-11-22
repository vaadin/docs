package com.vaadin.demo.fusion.forms.signup;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

// tag::snippet[]
public record SignUp(@NotBlank @Size(min = 3, max = 20) String username,
        @NotBlank @Size(min = 12) String password,
        @NotBlank String passwordConfirmation) {
}
// end::snippet[]
