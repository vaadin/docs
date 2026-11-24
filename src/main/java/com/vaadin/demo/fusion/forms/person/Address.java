package com.vaadin.demo.fusion.forms.person;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;

// tag::snippet[]
public record Address(@NotBlank String street,
        @Pattern(regexp = "\\d{5}", message = "Enter five digits") String postalCode,
        @NotBlank String city) {
}
// end::snippet[]
